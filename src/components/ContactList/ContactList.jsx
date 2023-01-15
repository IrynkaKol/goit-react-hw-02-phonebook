import React from 'react';

const ContactList = ({ contacts, onDeleteContacts }) => (
  <ul>
    {contacts.map(({ id, name, number }) => (
      <li key={id}>
        {name}: {number}
        <button
          onClick={() => {
            onDeleteContacts(id);
          }}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

export default ContactList;
