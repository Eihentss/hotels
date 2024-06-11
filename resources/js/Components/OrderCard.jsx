import React from "react";
import { GoInfo } from "react-icons/go";
import { RiEditCircleLine } from "react-icons/ri";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";

const OrderCard = ({
    status,
    handleShowEdit,
    order,
    handleShowDelete,
    name,
    // handleOrderStatusChange,
}) => {
    const handleOrderStatusChange = (id) => {
        router.put(`/orders-status/${id}`, {
            onSuccess: () => {
                toast.success("Order status updated successfully!");
                reset();
                window.location.reload();
            },
            onError: (error) => {
                toast.error("Failed to update order status.");
                console.log(error);
            },
        });
    };
    return (
        <>
            <div className="rounded-2xl overflow-hidden relative text-center p-4 group items-center flex flex-col max-w-sm hover:shadow-2xl transition-all duration-500 shadow-xl bg-gradient-to-bl from-green-100 to-lime-200">
                {/* <button
                    className="absolute left-3 top-3 text-gray-400"
                    onClick={() => handleShowEdit(order)}
                >
                    <RiEditCircleLine size={22} />
                </button> */}
                <button
                    className="absolute right-3 top-3 text-gray-400"
                    onClick={() => handleShowDelete(order)}
                >
                    <IoIosRemoveCircleOutline size={22} />
                </button>
                <div className="text-gray-500 group-hover:scale-105 transition-all">
                    <GoInfo size={61} />
                </div>
                <div className="group-hover:pb-10 transition-all duration-500 delay-200">
                    <h1 className="font-semibold text-gray-700">{name}</h1>
                    {status ? (
                        <p className="text-gray-500 text-sm">Delivered</p>
                    ) : (
                        <p className="text-gray-500 text-sm">Shipping</p>
                    )}
                </div>
                <div className="flex items-center transition-all duration-500 delay-200 group-hover:bottom-3 -bottom-full absolute gap-2 justify-evenly w-full">
                    {status ? (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleOrderStatusChange(order.id);
                            }}
                        >
                            <div className="flex gap-2 text-sm bg-red-700 text-white p-1 hover:p-2 hover:px-4 transition-all duration-500 delay-200 rounded-full shadow-sm px-3">
                                Cancel
                            </div>
                        </button>
                    ) : (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleOrderStatusChange(order.id);
                            }}
                        >
                            <div className="flex gap-2 text-sm bg-green-700 text-white p-1 hover:p-2 hover:px-4 transition-all duration-500 delay-200 rounded-full shadow-sm px-3">
                                Deliver
                            </div>
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default OrderCard;
