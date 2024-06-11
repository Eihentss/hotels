import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "user",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("register"));
    };

    return (
        <>
            <Head title="Register" />
            <header className="bg-cover h-screen" style={{ backgroundImage: "url(/assets/luxury_hotel-wallpaper-2048x1152.jpg)"}}>
                <div className="content px-8 py-2">
                    <nav className="flex items-center justify-between">
                        <h2 className="text-gray-200 font-bold text-2xl ">
                            <img src="/assets/log-removebg-preview.png" alt="" className=" h-40 rounded-full"/>
                        </h2>
                    </nav>
                    <div className="body mt-20 mx-8">
                        <div className="md:flex items-center justify-between">
                            <div className="w-full md:w-1/2 mr-auto">
                                <h1 className="text-7xl font-bold text-white tracking-wide">Hotel</h1>
                                <h2 className="text-3xl font-bold text-white tracking-wide">Welcome <span className="text-white">to Hotel Booking</span></h2> 
                                <span className="text-white">You hava a account?<a href="/login" className="text-green-300 text-lg ml-2 font-bold">Sign In </a></span>
                            </div>
                            <div className="w-full md:max-w-md mt-6">
                                <div className=" shadow-lg rounded-lg px-8 py-8 mb-6 border border-green-300 bg-opacity-95 backdrop-filter backdrop-blur-lg">
                                    <form onSubmit={submit}>
                                        <div className="flex items-center justify-center">
                                        <h2 className="text-2xl font-bold tracking-wide">
                                        Register
                                            </h2> 
                                        </div>
                    
                                        <input 
                                            type="text" 
                                            onChange={(e) => setData("name", e.target.value)} 
                                            className="rounded px-4 w-full py-1 bg-gray-200 border border-gray-800 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none" 
                                            placeholder="Username"/>
                                        <InputError message={errors.name} />

                                        <select 
                                            onChange={(e) => setData("role", e.target.value)} 
                                            className="rounded px-4 w-full py-1 bg-gray-200 border border-gray-800 mb-6 text-gray-700 focus:bg-white focus:outline-none">
                                            <option value="" disabled selected>Select your role</option>
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>
                                        <InputError message={errors.role} />

                                        <input 
                                            type="email" 
                                            onChange={(e) => setData("email", e.target.value)} 
                                            className="rounded px-4 w-full py-1 bg-gray-200 border border-gray-800 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none" 
                                            placeholder="Email Address"/>
                                        <InputError message={errors.email} />

                                        <input 
                                            type="password" 
                                            onChange={(e) => setData("password", e.target.value)} 
                                            className="rounded px-4 w-full py-1 bg-gray-200 border border-gray-800 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none" 
                                            placeholder="Password"/>
                                        <InputError message={errors.password} />

                                        <input 
                                            type="password" 
                                            onChange={(e) => setData("password_confirmation", e.target.value)} 
                                            className="rounded px-4 w-full py-1 bg-gray-200 border border-gray-800 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none" 
                                            placeholder="Password Confirmation"/>
                                        <InputError message={errors.password_confirmation} />
                                        
                                        <div className="flex items-center justify-between">
                                            <button className="bg-gray-800 text-gray-200 px-2 py-1 rounded">Register</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
