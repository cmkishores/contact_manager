import React, { Component } from 'react';
import ContactManager from './ContactManager';
import axios from 'axios';

const contactManager = new ContactManager();
const ENRICH_API_URL = "https://api.fullcontact.com/v3/person.enrich";
const API_KEY='HeSeSPNdpnhSLrTWBSc056zeFvOjOr54'



class contactCreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
          enrichData : {} //State to store enriched data if recieved.
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCreate = this.handleCreate.bind(this);

      }

      componentDidMount(){ // Sets the values of the fields in create and update contacts to values already existing in the database. 
        const { match: { params } } = this.props;
        console.log(this.props)
        if(params && params.pk)
        {
            contactManager.getContact(params.pk).then((c)=>{
            this.refs.firstName.value = c.first_name;
            this.refs.lastName.value = c.last_name;
            this.refs.email.value = c.email;
            this.refs.phone_number.value = c.phone_number;
            this.refs.organization.value = c.organization;
            this.refs.title.value = c.title;







          })
        }
      }

      handleCreate(){
        const header = {
          Authorization: `Bearer ${API_KEY}` // API Key for Enrich API
        };
        let searchQuery = {
          email: this.refs.email.value
        }
        axios.post(ENRICH_API_URL, searchQuery, { headers: header})
        .then(({ data }) => {
          this.setState({
            enrichData: data, //Stores the response of the API in enrichData
          });
        contactManager.createContact(
          {
            "first_name": this.refs.firstName.value,
            "last_name": this.refs.lastName.value,
            "email": this.refs.email.value,
            "phone_number": this.refs.phone_number.value,           

            // Organization and title values, automatically updated from the API response
            "organization": this.state.enrichData.organization,
            "title": this.state.enrichData.title
        }          
        ).then((result)=>{
          
          
          alert("Contact created!");
          
          
        }).catch(()=>{
         
          alert('There was an error creating the contact. ! Please re-check your form.');
        });
      })
  }

      handleUpdate(pk){ // Updates the contact with the given details 
        contactManager.updateContact(
          {
            "pk": pk,
            "first_name": this.refs.firstName.value,
            "last_name": this.refs.lastName.value,
            "email": this.refs.email.value,
            "phone_number": this.refs.phone_number.value,
            "organization": this.refs.organization.value,

            "title": this.refs.title.value
        }          
        ).then((result)=>{
          console.log(this.state);
          alert("Contact updated!");

        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleSubmit(event) {
        const { match: { params } } = this.props;
        console.log(`${this.props} handleSubmit`)

        if(params && params.pk){
          this.handleUpdate(params.pk);
        }
        else
        { 
          console.log("reached handle submit")
          this.handleCreate();
        }

        event.preventDefault();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              First Name:</label>
              <input className="form-control" type="text" ref='firstName' />

            <label>
              Last Name:</label>
              <input className="form-control" type="text" ref='lastName'/>

            <label>
              Phone:</label>
              <input className="form-control" type="text" ref='phone_number' />

            <label>
              Email:</label>
              <input className="form-control" type="text" ref='email' />

            <label> 
              Organization :</label>
              <input className="form-control" type="text" ref='organization' />
            
            <label> 
              Title:</label>
              <input className="form-control" type="text" ref='title' />

            


            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
      }  
}

export default contactCreateUpdate;