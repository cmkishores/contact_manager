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
        contactManager.getContacts().then(function (result) {
            self.setState({ contacts:  result.data, nextPageURL:  result.nextlink, search: result.data })
        });
    }
    handleInputChange = () => {
        
        
        let result = this.filterArray(this.search.value.toLocaleLowerCase());
        let finalResult = []
        
        result.map( (item) => {
            if (item !== undefined) {
                finalResult.push(item)
                // console.log(item)
                 }
        this.setState(
            {
                search:finalResult
            }
        )
        }
         )
         if (this.search.value == '' ){
            this.setState({search:this.state.contacts})
        }
        

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
    filterArray = (searchValue) => {
            let result = this.state.contacts.map( (item) => {
                if (item.first_name.toLowerCase().includes(searchValue) || item.last_name.toLowerCase().includes(searchValue)){    
                return item;
                }
            }
            
            )
            return result
    }
    
    render() {
        console.log(typeof(this.state.search))
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
    