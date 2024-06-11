import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faUtensils, faTv } from '@fortawesome/free-solid-svg-icons';
import toast from "react-hot-toast";

const Create = ({ auth }) => {
    const { data, setData, post, errors } = useForm({
        name: '',
        description: '',
        price: '',
        image: null,
        bedroom: 0, // Mainīts, lai atbilstu back-end prasībām
        bathroom: 0, // Mainīts, lai atbilstu back-end prasībām
        kitchen: 0, // Mainīts, lai atbilstu back-end prasībām
        tv: 0, // Mainīts, lai atbilstu back-end prasībām
        address: '', // Jaunais adrešu lauks
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Apartaments tika pievienots!");

        post('/apartments');
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Apartment" />
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-bold mb-4">Create Apartment</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full border rounded p-2"
                        />
                        {errors.name && <div className="text-red-600">{errors.name}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 block w-full border rounded p-2"
                        />
                        {errors.description && <div className="text-red-600">{errors.description}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            className="mt-1 block w-full border rounded p-2"
                            min="0"
                        />
                        {errors.price && <div className="text-red-600">{errors.price}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            className="mt-1 block w-full border rounded p-2"
                        />
                        {errors.address && <div className="text-red-600">{errors.address}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            type="file"
                            onChange={(e) => setData('image', e.target.files[0])}
                            className="mt-1 block w-full border rounded p-2"
                        />
                        {errors.image && <div className="text-red-600">{errors.image}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Options</label>
                        <div className="flex items-center">
                            <label className="inline-flex items-center mt-1">
                                <input
                                    type="checkbox"
                                    checked={data.bedroom}
                                    onChange={(e) => setData('bedroom', e.target.checked)}
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />
                                <span className="ml-2"><FontAwesomeIcon icon={faBed} /></span>
                            </label>
                            <span className="ml-4">Bedroom</span>
                        </div>
                        <div className="flex items-center">
                            <label className="inline-flex items-center mt-1">
                                <input
                                    type="checkbox"
                                    checked={data.bathroom}
                                    onChange={(e) => setData('bathroom', e.target.checked)}
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />
                                <span className="ml-2"><FontAwesomeIcon icon={faBath} /></span>
                            </label>
                            <span className="ml-4">Bathroom</span>
                        </div>
                        <div className="flex items-center">
                            <label className="inline-flex items-center mt-1">
                                <input
                                    type="checkbox"
                                    checked={data.kitchen}
                                    onChange={(e) => setData('kitchen', e.target.checked ? 1 : 0)}
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />
                                <span className="ml-2"><FontAwesomeIcon icon={faUtensils} /></span>
                            </label>
                            <span className="ml-4">Kitchen</span>
                        </div>
                        <div className="flex items-center">
                            <label className="inline-flex items-center mt-1">
                                <input
                                    type="checkbox"
                                    checked={data.tv}
                                    onChange={(e) => setData('tv', e.target.checked ? 1 : 0)}
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />
                                <span className="ml-2"><FontAwesomeIcon icon={faTv} /></span>
                            </label>
                            <span className="ml-4">TV</span>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
