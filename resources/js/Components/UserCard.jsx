import React from "react";
import { RiEditCircleLine } from "react-icons/ri";
import { IoIosRemoveCircleOutline } from "react-icons/io";

const UserCard = ({ name, role, email, handleShowEdit, handleShowDelete }) => {

    return (
        <div className="rounded-2xl overflow-hidden relative text-center p-4 group items-center flex flex-col max-w-sm hover:shadow-2xl transition-all duration-500 shadow-xl bg-gradient-to-bl from-green-100 to-lime-200">
            <button
                className="absolute left-3 top-3 text-gray-400"
                onClick={() => handleShowEdit({ name, role, email })}
            >
                <RiEditCircleLine size={22} />
            </button>
            <button
                className="absolute right-3 top-3 text-gray-400"
                onClick={handleShowDelete}
            >
                <IoIosRemoveCircleOutline size={22} />
            </button>
            
            <div className="text-gray-500 group-hover:scale-105 transition-all">
                <svg
                    className="w-16 h-16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
            <div className="group-hover:pb-10 transition-all duration-500 delay-200">
                <h1 className="font-semibold text-gray-700">{name}</h1>
                <p className="text-gray-500 text-sm">{role}</p>
            </div>
            <div className="flex items-center transition-all duration-500 delay-200 group-hover:bottom-3 -bottom-full absolute gap-2 justify-evenly w-full">
                <div className="flex gap-2 text-sm bg-gray-700 text-white p-1 hover:p-2 transition-all duration-500 delay-200 rounded-full shadow-sm px-3">
                    {email}
                </div>
            </div>
        </div>
    );
};

export default UserCard;

