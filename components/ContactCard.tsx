'use client';

import React from 'react';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: {
    name: string;
  };
}

interface ContactCardProps {
  contact: Contact;
  onClick: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onClick }) => (
  <div
    className="bg-white rounded-lg shadow-md p-5 cursor-pointer hover:shadow-xl transition-shadow duration-300 border border-gray-100"
    onClick={onClick}
  >
    <h2 className="text-xl font-bold text-gray-800 mb-1">{contact.name}</h2>
    <p className="text-gray-600 text-sm mb-1">
      <span className="font-semibold">Email:</span> {contact.email}
    </p>
    <p className="text-gray-600 text-sm mb-1">
      <span className="font-semibold">Phone:</span> {contact.phone}
    </p>
    <p className="text-gray-600 text-sm">
      <span className="font-semibold">Company:</span> {contact.company.name}
    </p>
  </div>
);

export default ContactCard; 