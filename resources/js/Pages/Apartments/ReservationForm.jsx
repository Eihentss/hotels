import React from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { useForm } from '@inertiajs/react';

const ReservationForm = ({ apartment, auth }) => {
    const today = new Date().toISOString().split('T')[0]; // Šodienas datums formātā YYYY-MM-DD

    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        start_date: '', // Iestatītā sākuma datuma vērtība uz šodienas datumu
        end_date: '', // Iestatītā beigu datuma vērtība uz šodienas datumu
        user_id: auth.user ? auth.user.id : null,
        apartment_id: apartment.id
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!auth.user) {
            toast.error("Jums jābūt ielogotam, lai iesniegtu rezervāciju.");
            return;
        }

        // Pārveidojam datuma formātu uz MySQL datuma formātu
        const formattedStartDate = new Date(data.start_date).toISOString().split('T')[0];
        const formattedEndDate = new Date(data.end_date).toISOString().split('T')[0];

        // Validācija: pārbaudīt vai start_date nav vecāks par end_date
        if (new Date(formattedStartDate) > new Date(formattedEndDate)) {
            toast.error("Sākuma datums nedrīkst būt vecāks par beigu datumu!");
            return;
        }

        const requestData = { ...data, start_date: formattedStartDate, end_date: formattedEndDate };

        try {
            await axios.post(route('reservations.store'), requestData);
            toast.success("Rezervācija iesniegta veiksmīgi, jāgaida apstiprinājums!");
        } catch (error) {
            console.error("Kļūda rezervācijas iesniegšanā:", error);
            toast.error("Kļūda rezervācijas iesniegšanā!");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
            <div className="mb-4">
                <input 
                    type="text" 
                    placeholder="Vārds" 
                    value={data.name} 
                    onChange={e => setData('name', e.target.value)} 
                    required 
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <div className="text-red-600 mt-2">{errors.name}</div>}
            </div>
            <div className="mb-4">
                <input 
                    type="email" 
                    placeholder="E-pasts" 
                    value={data.email} 
                    onChange={(e) => setData('email', e.target.value)} 
                    required 
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && <div className="text-red-600 mt-2">{errors.email}</div>}
            </div>
            <div className="mb-4">
                <input 
                    type="number" 
                    placeholder="Tālruņa numurs" 
                    value={data.phone} 
                    onChange={(e) => setData('phone', e.target.value)} 
                    required 
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.phone && <div className="text-red-600 mt-2">{errors.phone}</div>}
            </div>
            <div className="mb-4">
                <input 
                    type="date" 
                    name="start_date" 
                    min={today} 
                    value={data.start_date} 
                    onChange={(e) => setData('start_date', e.target.value)} 
                    required 
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.start_date && <div className="text-red-600 mt-2">{errors.start_date}</div>}
            </div>
            <div className="mb-4">
                <input 
                    type="date" 
                    name="end_date" 
                    min={data.start_date} 
                    value={data.end_date} 
                    onChange={(e) => setData('end_date', e.target.value)} 
                    required 
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.end_date && <div className="text-red-600 mt-2">{errors.end_date}</div>}
            </div>
            <button 
                type="submit" 
                className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-transform transform hover:scale-105"
            >
                Iesniegt rezervāciju
            </button>
        </form>
    );
};

export default ReservationForm;
