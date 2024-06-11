import React from "react";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";

const DeleteUserModal = ({ setShowDelete, user }) => {
    const handleDelete = (userId) => {
        router.post(
            `/user-management/${userId}`,
            {
                _method: "DELETE",
            },
            {
                onSuccess: () => {
                    setShowDelete(false);
                    toast.success("User deleted successfully!");
                    window.location.reload(); 
                },
                onError: () => {
                    toast.error("Failed to delete user.");
                },
            }
        );
    };

    return (
        <>
            <section className="w-full fixed left-0 top-0 flex flex-col justify-center items-center h-screen z-50">
                <div
                    className="w-full fixed bg-black/50 left-0 top-0 h-screen"
                    onClick={() => setShowDelete(false)}
                ></div>
                <form className="w-full">
                    <div className="py-6 flex flex-col justify-center sm:py-12 z-50">
                        <div className="relative py-3 sm:max-w-xl sm:mx-auto z-50">
                            <div className="absolute inset-0 bg-gradient-to-bl from-green-100 to-lime-200 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl z-50"></div>
                            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 z-50">
                                <div className="max-w-md mx-auto">
                                    <div>
                                        <h1 className="text-2xl font-semibold">
                                            Delete user {user.name}?
                                        </h1>
                                    </div>
                                    <div className="divide-y divide-gray-200">
                                        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                            <div className="flex flex-col">
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-tr from-green-100 to-lime-200 py-3 px-6 font-dm text-base font-medium text-gray-440 shadow-xl shadow-lime-300/45 transition-transform duration-200 ease-in-out hover:scale-[1.02] z-50"
                                                >
                                                    Yes
                                                </button>
                                                <button
                                                    onClick={() => setShowDelete(false)}
                                                    className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-tr from-red-100 to-lime-200 py-3 px-6 font-dm text-base font-medium text-gray-440 shadow-xl shadow-lime-300/45 transition-transform duration-200 ease-in-out hover:scale-[1.02] z-50"
                                                >
                                                    No
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

export default DeleteUserModal;

