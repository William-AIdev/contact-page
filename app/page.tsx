'use client';

import React, { useEffect, useState } from 'react';
import ContactCard from '../components/ContactCard';

interface Contact {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Contact | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
        const data = await response.json();
        setContacts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Contact List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onClick={() => setSelected(contact)}
            />
          ))}
        </div>
      </div>
      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selected.name}</h2>
            <div className="space-y-2 text-gray-700 text-sm">
              <p><span className="font-semibold">Username:</span> {selected.username}</p>
              <p><span className="font-semibold">Email:</span> <a href={`mailto:${selected.email}`} className="text-blue-500 hover:underline">{selected.email}</a></p>
              <p><span className="font-semibold">Phone:</span> <a href={`tel:${selected.phone}`} className="text-blue-500 hover:underline">{selected.phone}</a></p>
              <p><span className="font-semibold">Website:</span> <a href={`https://${selected.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{selected.website}</a></p>
              <p><span className="font-semibold">Company:</span> {selected.company.name}</p>
              <p><span className="font-semibold">CatchPhrase:</span> {selected.company.catchPhrase}</p>
              <p><span className="font-semibold">Business:</span> {selected.company.bs}</p>
              <p><span className="font-semibold">Address:</span> {`${selected.address.street} ${selected.address.suite}, ${selected.address.city}, ${selected.address.zipcode}`}</p>
              <p><span className="font-semibold">Geo:</span> lat {selected.address.geo.lat}, lng {selected.address.geo.lng}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 