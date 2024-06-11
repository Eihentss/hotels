import React from 'react';
import { Head, Link, usePage } from "@inertiajs/react";

import { InertiaLink } from '@inertiajs/inertia-react';

const Index = ({ reservations }) => {
  return (
    <div>
      <h1>Reservations</h1>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>{reservation.name}</li>
        ))}
      </ul>
      <Link href={`/apartments`} className="text-blue-500 mt-2 block">Atpakaļ uz sarakstu</Link>

 
    </div>
  );
};

export default Index;
