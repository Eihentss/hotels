import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useForm} from '@inertiajs/react';

const ReservationForm = ({ apartment, auth }) => {
    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        start_date: "",
        end_date: "",
        user_id: auth.user.id,
        apartment_id: apartment.id
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('reservations.store'));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Vārds"  onChange={e => setData('name', e.target.value)} required />
            {errors.name && <div className="text-red-600">{errors.name}</div>}
            <input type="email" placeholder="E-pasts" onChange={(e) => setData('email', e.target.value)} required />
            {errors.email && <div className="text-red-600">{errors.email}</div>}
            <input type="tel" placeholder="Tālruņa numurs" onChange={(e) => setData('phone', e.target.value)} required />
            {errors.phone && <div className="text-red-600">{errors.phone}</div>}
            <input type="date" name="startdate" onChange={(e) => setData('start_date', e.target.value)} required />
            {errors.startDate && <div className="text-red-600">{errors.startDate}</div>}
            <input type="date" name="enddate" onChange={(e) => setData('end_date', e.target.value)} required />
            <button type="submit">Iesniegt rezervāciju</button>
        </form>
    );
};

export default ReservationForm;
