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
        user_id: auth.user.id,
        apartment_id: apartment.id
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Pārveidojam datuma formātu uz MySQL datuma formātu
        const formattedStartDate = new Date(data.start_date).toISOString().split('T')[0];
        const formattedEndDate = new Date(data.end_date).toISOString().split('T')[0];
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
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Vārds" value={data.name} onChange={e => setData('name', e.target.value)} required />
            {errors.name && <div className="text-red-600">{errors.name}</div>}
            <input type="email" placeholder="E-pasts" value={data.email} onChange={(e) => setData('email', e.target.value)} required />
            {errors.email && <div className="text-red-600">{errors.email}</div>}
            <input type="number" placeholder="Tālruņa numurs" value={data.phone} onChange={(e) => setData('phone', e.target.value)} required />
            {errors.phone && <div className="text-red-600">{errors.phone}</div>}
            <input type="date" name="start_date" min={today} value={data.start_date} onChange={(e) => setData('start_date', e.target.value)} required />
            {errors.start_date && <div className="text-red-600">{errors.start_date}</div>}
            <input type="date" name="end_date" min={today} value={data.end_date} onChange={(e) => setData('end_date', e.target.value)} required />
            {errors.end_date && <div className="text-red-600">{errors.end_date}</div>}
            <button type="submit">Iesniegt rezervāciju</button>
        </form>
    );
};

export default ReservationForm;
