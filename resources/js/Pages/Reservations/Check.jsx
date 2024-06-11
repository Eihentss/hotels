import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import toast from "react-hot-toast";

const CheckReservation = ({ auth, apartment }) => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchReservations();
    }, []);

    const updateReservationStatus = async (id, status) => {
        try {
            await axios.post(`/reservations/${id}/${status}`);
            fetchReservations(); // Atjauno rezervāciju sarakstu pēc statusa atjaunināšanas
        } catch (error) {
            console.error(`Neizdevās mainīt rezervācijas statusu uz ${status}:`, error);
            toast.error("Error");
        }
    };

    const fetchReservations = async () => {
        try {
            const response = await axios.get(route('reservations.checkAll'));
            setReservations(response.data);
        } catch (error) {
            console.error('Neizdevās iegūt rezervāciju datus:', error);
        }
    };

    const handleAccept = async (id) => {
        await updateReservationStatus(id, 'accept');
        toast.success("Accept!");
    };
    
    const handleDecline = async (id) => {
        await updateReservationStatus(id, 'decline');
        toast.error("Decline");
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="reservation" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Reservation Check</h1>
                <h2 className="text-xl font-semibold mb-2">All Reservations</h2>
                <div className="flex flex-col space-y-4">
                    {reservations.map(reservation => (
                        <div key={reservation.id} className="border border-gray-900 rounded-md p-4 flex flex-col md:flex-row md:items-start">
                            <div className="flex-grow">
                                <p className="font-semibold">Apartment Name: {reservation.apartment.name}</p>
                                <p className="font-semibold">Description: {reservation.apartment.description}</p>
                                <p className="font-semibold">Price: {reservation.apartment.price}</p>
                                <p className="font-semibold">Start Date: {reservation.start_date}</p>
                                <p className="font-semibold">End Date: {reservation.end_date}</p>
                                <p className="font-semibold">Status: {reservation.status}</p>
                                <p className="mb-2 font-semibold">Address: <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(reservation.apartment.address)}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{reservation.apartment.address}</a></p>
                                {reservation.status !== 'accepted' && reservation.status !== 'declined' && (
                                    <div className="mt-4">
                                        <button onClick={() => handleAccept(reservation.id)} className="px-4 py-2 bg-green-500 text-white rounded-md mr-2">Accept</button>
                                        <button onClick={() => handleDecline(reservation.id)} className="px-4 py-2 bg-red-500 text-white rounded-md">Decline</button>
                                    </div>
                                )}
                            </div>
                            <div className="mt-4 md:mt-0 md:ml-4 flex justify-center">
                                {reservation.apartment.image && (
                                    <img src={`/storage/image/${reservation.apartment.image}`} alt={reservation.apartment.name} className="w-64 h-48 object-cover rounded-md" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CheckReservation;
