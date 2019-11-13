import axios from 'axios';
const LOCAL_API_URL = 'http://localhost:8000';

export default class ContactManager{

    constructor(){}


    getContacts() {
        const url = `${LOCAL_API_URL}/api/contacts/`;
        return axios.get(url).then(response => response.data);
    }  
    getContactsByURL(link){
        const url = `${LOCAL_API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getCContact(pk) {
        const url = `${LOCAL_API_URL}/api/contacts/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    deleteContact(contact){
        const url = `${LOCAL_API_URL}/api/contacts/${contact.pk}`;
        return axios.delete(url);
    }
    createContact(contact){
        const url = `${LOCAL_API_URL}/api/contacts/`;
        return axios.post(url,customer);
    }
    updateCContact(contact){
        const url = `${LOCAL_API_URL}/api/contacts/${contact.pk}`;
        return axios.put(url,contact);
    }
}
