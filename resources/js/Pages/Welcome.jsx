import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";
import axios from "axios";

const Index = () => {
    const { auth, flash, apartments } = usePage().props;
    const [search, setSearch] = useState("");
    const [sortedApartments, setSortedApartments] = useState([]);
    const [sortType, setSortType] = useState("date");

    useEffect(() => {
        if (flash && flash.message) {
            toast.success(flash.message);
        }
    }, [flash]);

    useEffect(() => {
        console.log("Apartments data:", apartments);
        if (apartments && Array.isArray(apartments.data)) {
            setSortedApartments(apartments.data);
        } else {
            console.error("Apartments data is not available or not an array.");
        }
    }, [apartments]);
    

    useEffect(() => {
        if (apartments && Array.isArray(apartments.data)) {
            let sorted = [...apartments.data];
            if (sortType === "priceAsc") {
                sorted.sort((a, b) => a.price - b.price);
            } else if (sortType === "priceDesc") {
                sorted.sort((a, b) => b.price - a.price);
            } else if (sortType === "newest") {
                sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            } else if (sortType === "oldest") {
                sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            }
            setSortedApartments(sorted);
        }
    }, [sortType, apartments]);

    const handleDelete = async (apartmentId) => {
        try {
            await axios.delete(`/api/apartments/${apartmentId}`);
            // Remove the deleted apartment from the list
            setSortedApartments(sortedApartments.filter(apartment => apartment.id !== apartmentId));
            toast.success("Apartment deleted successfully");
        } catch (error) {
            console.error("Error deleting apartment:", error);
            toast.error("Error deleting apartment");
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        if (apartments && Array.isArray(apartments.data)) {
            const filtered = apartments.data.filter(
                (apartment) =>
                    apartment.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    apartment.description.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setSortedApartments(filtered);
        }
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Apartments" />
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center my-4">
                    <input
                        type="text"
                        className="border rounded p-2 w-1/2"
                        placeholder="Search by name or description"
                        value={search}
                        onChange={handleSearch}
                    />
                    <select
                        className="border rounded p-2"
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                    >
                        <option value="priceAsc">Sort by Price (Lowest to Highest)</option>
                        <option value="priceDesc">Sort by Price (Highest to Lowest)</option>
                        <option value="newest">Sort by Newest</option>
                        <option value="oldest">Sort by Oldest</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedApartments.map((apartment) => (
                        <div key={apartment.id} className="border rounded p-4">
                            <h2 className="text-xl font-bold">{apartment.name}</h2>
                            <p>{apartment.description}</p>
                            <p>Price: ${apartment.price}</p>
                            {apartment.image && (
                                <img 
                                    src={`/storage/image/${apartment.image}`} 
                                    alt={apartment.name} 
                                    className="w-100 h-80 object-cover mt-2" 
                                />
                            )}
                            <Link href={`/apartments/${apartment.id}`} className="text-blue-500 mt-2 block">View Details</Link>
                            {auth?.user?.role === "admin" && (
                                <button onClick={() => handleDelete(apartment.id)} className="text-red-500 mt-2 block">Delete</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
