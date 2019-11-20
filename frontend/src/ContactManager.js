import axios from "axios";
const LOCAL_API_URL = "http://localhost:8000";

export default class ContactManager {
  constructor() {}

  getContacts() {
    // Fetches contqacts
    console.log("get contacts");
    const url = `${LOCAL_API_URL}/api/contacts/`;
    return axios.get(url).then(response => response.data);
  }
  getContactsByURL(link) {
    //Fetches Contacts bu url in case of multiple pages.

    const url = `${LOCAL_API_URL}${link}`;
    return axios.get(url).then(response => response.data);
  }

  getContact(pk) {
    //Fetches a specific contact with matching primary key
    const url = `${LOCAL_API_URL}/api/contacts/${pk}`;
    return axios.get(url).then(response => response.data);
  }

  deleteContact(contact) {
    //Deletes the particular contact
    const url = `${LOCAL_API_URL}/api/contacts/${contact.pk}`;
    return axios.delete(url);
  }

  createContact(contact) {
    //Creats a new contact
    const url = `${LOCAL_API_URL}/api/contacts/`;
    console.log(contact);

    return axios.post(url, contact);
  }

  updateContact(contact) {
    //Update existing contact
    const url = `${LOCAL_API_URL}/api/contacts/${contact.pk}`;
    return axios.put(url, contact);
  }
}