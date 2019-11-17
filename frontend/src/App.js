import  React, { Component } from  'react';
import { BrowserRouter } from  'react-router-dom'
import { Route, Link } from  'react-router-dom'
import  ContactList  from  './ContactList'
import  ContactCreateUpdate  from  './ContactCreateUpdate'
import  './App.css';


const  BaseLayout  = () => ( //Creates a component BaseLayout with navbar and navigations.  
  <div  className="container-fluid">
      <nav  className="navbar navbar-expand-lg navbar-light bg-light">
          <a  className="navbar-brand"  href="#">Contact Manager</a>
          <button  className="navbar-toggler"  type="button"  data-toggle="collapse"  data-target="#navbarNavAltMarkup"  aria-controls="navbarNavAltMarkup"  aria-expanded="false"  aria-label="Toggle navigation">
          <span  className="navbar-toggler-icon"></span>
      </button>
      <div  className="collapse navbar-collapse"  id="navbarNavAltMarkup">
          <div  className="navbar-nav">
              <a  className="nav-item nav-link"  href="/">CONTACTS</a>
              <a  className="nav-item nav-link"  href="/contacts">Create Contact</a>
              
             

          </div>
      </div>
      </nav>
      <div  className="content">
          <Route  path="/"  exact  component={ContactList}  />
          <Route  path="/contacts/:pk"  component={ContactCreateUpdate}  />
          <Route  path="/contacts/"  exact  component={ContactCreateUpdate}  />
      </div>
  </div>
  )
  

  class  App  extends  Component {

    render() {
        return (
        <BrowserRouter>
            <BaseLayout/>
        </BrowserRouter>
        );
    }
    }
    export  default  App;