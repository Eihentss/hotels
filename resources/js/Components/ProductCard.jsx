import React from "react";
import { RiEditCircleLine } from "react-icons/ri";
import { AiOutlineEuroCircle } from "react-icons/ai";
import { IoIosRemoveCircleOutline } from "react-icons/io";

const ProductCard = ({
    name,
    quantity,
    description,
    handleShowEdit,
    product,
    handleShowDelete,
}) => {
    return (
        <>
            <div className="rounded-2xl overflow-hidden relative text-center p-4 group items-center flex flex-col max-w-sm hover:shadow-2xl transition-all duration-500 shadow-xl bg-gradient-to-bl from-green-100 to-lime-200">
                <button
                    className="absolute left-3 top-3 text-gray-400"
                    onClick={() => handleShowEdit(product)}
                >
                    <RiEditCircleLine size={22} />
                </button>
                <button
                    className="absolute right-3 top-3 text-gray-400"
                    onClick={() => handleShowDelete(product)}
                >
                    <IoIosRemoveCircleOutline size={22} />
                </button>
                <div className="text-gray-500 group-hover:scale-105 transition-all">
                    <AiOutlineEuroCircle size={61} />
                </div>
                <div className="group-hover:pb-10 transition-all duration-500 delay-200">
                    <h1 className="font-semibold text-gray-700">{name}</h1>
                    <p className="text-gray-500 text-sm">{quantity}</p>
                </div>
                <div className="flex items-center transition-all duration-500 delay-200 group-hover:bottom-3 -bottom-full absolute gap-2 justify-evenly w-full">
                    <div className="flex gap-2 text-sm bg-gray-700 text-white p-1 hover:p-2 transition-all duration-500 delay-200 rounded-full shadow-sm px-3">
                        {description}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;
