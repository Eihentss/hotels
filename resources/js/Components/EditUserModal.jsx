import React from "react";
import { useForm, router, usePage } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { RiCloseCircleLine } from "react-icons/ri";

const EditUserModal = ({ setShowEdit, user }) => {
    const { errors } = usePage().props;

    const { data, setData, reset } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
    });

    const saveUser = (e) => {
        e.preventDefault();
        router.put(`/user-management/${user.id}/update`, data, {
            onSuccess: () => {
                setShowEdit(false);
                reset();
                window.location.reload(); // Reload the page to show changes
            },
            onError: () => {
                toast.error("Failed to update user.");
            }
        });
    };

    return (
        <>
            <section className="w-full fixed left-0 top-0 flex flex-col justify-center items-center h-screen">
                <div
                    className="w-full fixed bg-black/50 left-0 top-0 h-screen"
                    onClick={() => setShowEdit(false)}
                ></div>
                <form className="w-full" onSubmit={saveUser}>
                    <div className="py-6 flex flex-col justify-center sm:py-12">
                        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-bl from-green-100 to-lime-200 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                                <button
                                    type="button"
                                    className="absolute top-4 right-4 text-gray-400"
                                    onClick={() => setShowEdit(false)}
                                >
                                    <RiCloseCircleLine size={24} />
                                </button>
                                <div className="max-w-md mx-auto">
                                    <div>
                                        <h1 className="text-2xl font-semibold">
                                            Edit User {user.name}
                                        </h1>
                                    </div>
                                    <div className="divide-y divide-gray-200">
                                        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                            <div className="relative">
                                                <input
                                                    autoComplete="off"
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 border-t-0 border-r-0 border-l-0 focus:outline-none"
                                                    placeholder="Name"
                                                    onChange={(e) =>
                                                        setData(
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    value={data.name}
                                                />
                                                <label
                                                    htmlFor="name"
                                                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                                >
                                                    Name
                                                </label>
                                                {errors.name && (
                                                    <p className="text-red-700 text-sm mt-2">
                                                        {errors.name}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="relative">
                                                <input
                                                    autoComplete="off"
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 border-t-0 border-r-0 border-l-0 focus:outline-none"
                                                    placeholder="Email"
                                                    onChange={(e) =>
                                                        setData(
                                                            "email",
                                                            e.target.value
                                                        )
                                                    }
                                                    value={data.email}
                                                />
                                                <label
                                                    htmlFor="email"
                                                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                                >
                                                    Email
                                                </label>
                                                {errors.email && (
                                                    <p className="text-red-700 text-sm mt-2">
                                                        {errors.email}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="relative">
                                                <select
                                                    id="role"
                                                    name="role"
                                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 border-t-0 border-r-0 border-l-0 focus:outline-none"
                                                    onChange={(e) =>
                                                        setData(
                                                            "role",
                                                            e.target.value
                                                        )
                                                    }
                                                    value={data.role}
                                                >
                                                    <option value="user">
                                                        User
                                                    </option>
                                                    <option value="admin">
                                                        Admin
                                                    </option>
                                                    <option value="sorter">
                                                        Sorter
                                                    </option>
                                                </select>
                                                <label
                                                    htmlFor="role"
                                                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                                >
                                                    Role
                                                </label>
                                                {errors.role && (
                                                    <p className="text-red-700 text-sm mt-2">
                                                        {errors.role}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="relative">
                                                <button className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-tr from-green-100 to-lime-200 py-3 px-6 font-dm text-base font-medium text-gray-440 shadow-xl shadow-lime-300/45 transition-transform duration-200 ease-in-out hover:scale-[1.02]">
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default EditUserModal;
