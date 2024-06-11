import React from "react";
import { PiPlusCircleThin } from "react-icons/pi";

const AddProductCard = ({}) => {
    return (
        <div className="rounded-3xl p-6 overflow-hidden relative text-center  group items-center flex flex-col max-w-sm hover:shadow-2xl transition-all duration-500 shadow-xl bg-gradient-to-bl from-green-100 to-lime-200">
            <div className="text-gray-500 group-hover:scale-105 transition-all">
                <PiPlusCircleThin size={100} />
            </div>
            <div className="group-hover:pb-10 transition-all duration-500 delay-200"></div>
            <div className="flex items-center transition-all duration-500 delay-200 group-hover:bottom-3 -bottom-full absolute gap-2 justify-evenly w-full">
                <a className="flex gap-2 text-sm bg-gray-700 text-white p-1 hover:p-2 hover:px-4 transition-all duration-500 delay-200 rounded-full shadow-sm px-3">
                    Add Product
                </a>
            </div>
        </div>
    );
};

export default AddProductCard;
