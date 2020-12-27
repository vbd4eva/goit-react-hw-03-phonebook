import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';

import ContactAddingForm from './components/ContactAddingForm/ContactAddingForm';
import ContactsBook from './components/ContactsBook/ContactsBook';
import ContactFilter from './components/ContactFilter/ContactFilter';
import ContactList from './components/ContactList/ContactList';

export class App extends Component {
  state = {
    filter: '',
    contacts: [],    
  }

  componentDidMount() {
      console.log('App componentDidMount');

      const contacts = localStorage.getItem('contacts');
      const parsedContacts = JSON.parse(contacts);

      if (parsedContacts) {
        this.setState({ contacts: parsedContacts });
      }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate');

    const newContactList = this.state.contacts;
    const prevContactList = prevState.contacts;

    if (newContactList !== prevContactList) {
      console.log('Обновилось поле contacts, записываю contacts в хранилище');
      localStorage.setItem('contacts', JSON.stringify(newContactList));
    }
  }

  findInContacts = (newContactName) => this.state.contacts.find(({ name }) => name === newContactName);
  
  addNewContact(newContactCart){
    const newContact = {id:uuidv4(),...newContactCart};
    this.setState(
      ({ contacts }) => 
      ({contacts: [newContact,...contacts], })
    );
  }

  onDoubleAddingReaction(doubleContact) { 
    const { name } = doubleContact;      
    alert(name + ' is already in contacts.');

    this.setState({ filter: name });
  }

  handleContactCart = (newContactCart) =>{   
    const doubleContact = this.findInContacts(newContactCart.name);  
    if (doubleContact) { 
      this.onDoubleAddingReaction(doubleContact);
      return
    }
    this.addNewContact(newContactCart)
  }


  changeStateFilter = (e) => { 
    const {name, value } = e.currentTarget;
    this.setState({ [name]: value });    
  }

  deleteContact = (contactId) => { 
    console.log('deleteContact ' + contactId);
    const newContactList = this.state.contacts.filter(
      ({id}) =>(id !== contactId)
    );
    this.setState({
      contacts: newContactList
    });
  }

  render() {
    const { filter, contacts } = this.state;
    const filterNormalized = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(
      ({name}) => name.toLocaleLowerCase().includes(filterNormalized)
    );

    return (
      <>
        <h1>Phonebook</h1>  
        <ContactAddingForm onSubmit={this.handleContactCart} />

        <ContactsBook totalNumber={contacts.length}>
              <ContactFilter value={filter} onChange={this.changeStateFilter} />
                <ContactList contacts={filteredContacts} deleteContact={this.deleteContact}/>
        </ContactsBook>
        
        
      </>
    )
  }
}

export default App



