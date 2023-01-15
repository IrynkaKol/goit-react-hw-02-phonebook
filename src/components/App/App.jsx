import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Container } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import Section from '../Section/Section';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHendler = data => {
    const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };
    if (
      !this.state.contacts.find(
        ({ name }) => name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts],
      }));
    } else {
      alert(`${data.name} is already in contacts.`);
    }
    //console.log(data);
    //console.log(contact);
  };

  deleteContacts = e => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== e),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    return (
      <Container>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.formSubmitHendler} />
        </Section>
        <Section title="Contacts">
          <Filter value={this.state.filter} onChange={this.changeFilter} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContacts={this.deleteContacts}
          />
        </Section>
      </Container>
    );
  }
}

/*
<form onSubmit={this.hendleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.hendleChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <label>
            Number
            <input
              type="tel"
              name="number"
              value={this.state.number}
              onChange={this.hendleChange}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <button type="submit">Add contact</button>
        </form>*/
