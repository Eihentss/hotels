
import { FaHotel } from "react-icons/fa";
import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";


export default function Welcome({ auth, laravelVersion, phpVersion, status, canResetPassword}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });
    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };
    return (
        <>
        <Head title="Welcome in Hotel" />
    <header className=" bg-cover h-screen" style={{ backgroundImage: "url(/assets/362619.jpg)"}}>
        <div className="content px-8 py-2">
            <nav className="flex items-center justify-between">
                <h2 className="text-gray-200 font-bold text-2xl ">
                    <img src="/assets/log-removebg-preview.png" alt="" className="w-36 h-36  rounded-full"/>
                </h2>

            </nav>
            <div className="body mt-20 mx-8">
                <div className="md:flex items-center justify-between">
                    <div className="w-full md:w-1/2 mr-auto">
                        <h1 className="text-7xl font-bold text-white tracking-wide">Hotel</h1>
                        <h2 className=" text-3xl font-bold text-white tracking-wide">Welcome <span className="text-white"> in Hotel booking</span></h2>
                        <p className="text-white text-lg">
                            Hello you can login and use our website!
                        </p>
                        <span className="text-white">Create New Account?<a href="/register" className="text-green-300 text-lg ml-2 font-bold">Sign Up</a></span>
                    </div>
                    <div className="w-full md:max-w-md mt-6">
                                <div className=" shadow-lg rounded-lg px-8 py-8 mb-6 border border-green-300 bg-opacity-95 backdrop-filter backdrop-blur-lg">
                            <form onSubmit={submit}>
                                <div className="flex items-center justify-center">
                                    <h2 className="text-3xl font-bold tracking-wide">
                                        Welcome back
                                    </h2> 
                                </div>
                                <h2 className="text-2xl font-bold tracking-wide">
                                Sign In
                                </h2>
                                <input type="email" onChange={(e) => setData("email", e.target.value)} className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none" placeholder="Email Address"/>
                                <InputError message={errors.email} className="mt-2z" />
                                <input type="password" onChange={(e) => setData("password", e.target.value)} className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-4 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none" placeholder="Password"/>
                                <InputError message={errors.password} className="mt-2" />

                                <div className="flex items-center justify-between">
                                    <button className="bg-gray-800 text-gray-200  px-2 py-1 rounded">Sign In</button>
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