// /resources/js/Pages/Reservations/Index.jsx

import React from 'react';

const Index = ({ reservations }) => {
  return (
    <div>
      <h1>Reservations</h1>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>{reservation.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
