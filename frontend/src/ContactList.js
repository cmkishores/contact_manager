import  React, { Component } from  'react';
import  ContactManager  from  './ContactManager';

const  contactManager  =  new  ContactManager();

class  ContactList  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            contacts: [],
            nextPageURL:  ''
        };
        this.nextPage  =  this.nextPage.bind(this);
        this.handleDelete  =  this.handleDelete.bind(this);
    }
    
    componentDidMount() {
        var  self  =  this;
        contactManager.getContacts().then(function (result) {
            console.log(result);
            self.setState({ contacts:  result.data, nextPageURL:  result.nextlink})
        });
    }
    handleChange(e){

    }
    handleDelete(e,pk){
        var  self  =  this;
        contactManager.deleteContact({pk :  pk}).then(()=>{
            var  newArr  =  self.state.contacts.filter(function(obj) {
                return  obj.pk  !==  pk;
            });
    
            self.setState({contacts:  newArr})
        });
    }
    
    nextPage(){
        var  self  =  this;
        console.log(this.state.nextPageURL);        
        contactManager.getContactsByURL(this.state.nextPageURL).then((result) => {
            self.setState({ contacts:  result.data, nextPageURL:  result.nextlink})
        });
    }
    render() {
    
        return (
            <div  className="contacts--list">
                <table  className="table">
                <thead  key="thead">
                <tr >

                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Description</th>
                    <th>Organization</th>
                    <th>Title</th>
                    <th>Created</th>


                </tr>
                </thead>
                <tbody>
                {this.state.contacts.map( (contact,i)  =>
                    <tr  key={i}>
                    <td>{contact.id}  </td>
                    <td>{contact.first_name}</td>
                    <td>{contact.last_name}</td>
                    <td>{contact.phone_number}</td>
                    <td>{contact.email}</td>
                    <td>{contact.description}</td>
                    <td>{contact.organization}</td>
                    <td>{contact.title}</td>
                    <td>{contact.createdAt}</td>



                    <td>
                    <button  className="btn btn-danger" onClick={(e)=>  this.handleDelete(e,contact.pk) }> Delete</button>
                    <a  href={"/contacts/" + contact.id}> Update</a>
                    </td>
                </tr>)}
                </tbody>
                </table>
                <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
            </div>
            );
      }
    }
    export  default  ContactList;
    