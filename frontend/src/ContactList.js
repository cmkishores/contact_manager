import  React, { Component } from  'react';
import  ContactManager  from  './ContactManager';

const  contactManager  =  new  ContactManager();

class  ContactList  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            contacts: [],
            nextPageURL:  '',
            search: []
        };
        this.nextPage  =  this.nextPage.bind(this);
        this.handleDelete  =  this.handleDelete.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    componentDidMount() {
        var  self  =  this;
        contactManager.getContacts().then(function (result) { //Retrieves the contacts and stores to the state
            self.setState({ contacts:  result.data, nextPageURL:  result.nextlink, search: result.data })
        });
    }
    handleInputChange = () => { // This function changes according to the input given in search field and dynamically changes the contact list        
        
        let result = this.filterArray(this.search.value.toLocaleLowerCase()); //search query
        let finalResult = [] // Variable to store search query result
        
        result.map( (item) => {
            if (item !== undefined) {
                finalResult.push(item)
                // console.log(item)
                 }
        this.setState(
            {
                search:finalResult //result of search in state. 
            }
        )
        }
         )
         if (this.search.value == '' ){ // If search query is empty, revert back to display the original contact list
            this.setState({search:this.state.contacts})
        }
        

    }
    handleDelete(e,id){ //Finds the contact with matching pk, creates a new array excluding that contact, and sets that new array as the present state. 
        var  self  =  this;
        contactManager.deleteContact({pk :  id}).then(()=>{ 
            var  newArr  =  self.state.search.filter(function(obj) {
                return  obj.id  !==  id;
            });
            console.log(this.state.search)
            console.log("Setting state")
            self.setState({search:  newArr})
            console.log(this.state.search)
        });
    }
    
    nextPage(){
        var  self  =  this;
        console.log(this.state.nextPageURL);        
        contactManager.getContactsByURL(this.state.nextPageURL).then((result) => {
            self.setState({ contacts:  result.data, nextPageURL:  result.nextlink})
        });
    }
    filterArray = (searchValue) => { // Returns items that includes the search query
            let result = this.state.contacts.map( (item) => {
                if (item.first_name.toLowerCase().includes(searchValue) || item.last_name.toLowerCase().includes(searchValue)){    
                return item;
                }
            }
            
            )
            return result
    }
    
    render() {
        return (
            <div  className="contacts--list">
                
                <div className="searchForm">
                <form>
                    <input type="text" id="filter" placeholder="Search for..." ref={input => this.search = input} onChange={this.handleInputChange}/>
                </form>
                
                </div>
                <table  className="table">
                <thead  key="thead">
                <tr >

                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Organization</th>
                    <th>Title</th>
                    <th>Created</th>


                </tr>
                </thead>
                <tbody>
                {
                
                this.state.search.map( (contact,i)  =>
                    <tr  key={i}>
                    <td>{contact.id}  </td>
                    <td>{contact.first_name}</td>
                    <td>{contact.last_name}</td>
                    <td>{contact.phone_number}</td>
                    <td>{contact.email}</td>
                    <td>{contact.organization}</td>
                    <td>{contact.title}</td>
                    <td>{contact.createdAt}</td>



                    <td>
                    <button  className="btn btn-danger" onClick={(e)=>  this.handleDelete(e,contact.id) }> Delete</button>
                    <a  href={"/contacts/" + contact.id}> Update</a>
                    </td>
                </tr>)
                }
                
                </tbody>
                </table>
                <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
                    
            </div>
            );
      }
    }
    export  default  ContactList;
    