import React, { Component } from 'react';
import ContactManager from './ContactManager';

const contactManager = new ContactManager();

class contactCreateUpdate extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        const { match: { params } } = this.props;
        console.log(this.props)
        if(params && params.pk)
        {
            contactManager.getContact(params.pk).then((c)=>{
            this.refs.firstName.value = c.first_name;
            this.refs.lastName.value = c.last_name;
            this.refs.email.value = c.email;
            this.refs.phone_number.value = c.phone_number;
            this.refs.description.value = c.description;
            this.refs.title.value = c.title;





          })
        }
      }

      handleCreate(){
        contactManager.createContact(
          {
            "first_name": this.refs.firstName.value,
            "last_name": this.refs.lastName.value,
            "email": this.refs.email.value,
            "phone_number": this.refs.phone_number.value,           
            "description": this.refs.description.value,
            "title": this.refs.title.value
        }          
        ).then((result)=>{
          alert("Contact created!");
        }).catch(()=>{
         
          alert('There was an error creating the contact. ! Please re-check your form.');
        });
      }
      handleUpdate(pk){
        contactManager.updateContact(
          {
            "pk": pk,
            "first_name": this.refs.firstName.value,
            "last_name": this.refs.lastName.value,
            "email": this.refs.email.value,
            "phone_number": this.refs.phone_number.value,
            "description": this.refs.description.value,
            "title": this.refs.title.value
        }          
        ).then((result)=>{
          console.log(result);
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
              Description:</label>
              <input className="form-control" type="text" ref='description' />
            
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