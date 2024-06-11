import React, { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import toast from "react-hot-toast";

const AddOrderModal = ({ setShowAdd, users, products }) => {
    const { data, setData, reset } = useForm({
        items: [{ productName: "", quantity: "" }],
        user_id: null,
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        data.items.forEach((item, index) => {
            if (!item.productName) {
                newErrors[`productName_${index}`] = "Product name is required.";
            }
            if (!item.quantity || item.quantity < 1) {
                newErrors[`quantity_${index}`] = "Quantity must be at least 1.";
            }
        });
        return newErrors;
    };

    const saveOrder = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            router.post("/orders", data, {
                onSuccess: () => {
                    toast.success("Order added successfully!");
                    setShowAdd(false);
                    reset();
                    window.location.reload();
                },
                onError: (error) => {
                    toast.error("Failed to add order.");
                    setErrors(error);
                },
            });
        } else {
            setErrors(validationErrors);
        }
    };

    const addItem = () => {
        setData("items", [...data.items, { productName: "", quantity: "" }]);
    };

    const handleItemChange = (index, field, value) => {
        const newItems = data.items.slice();
        newItems[index][field] = value;
        setData("items", newItems);
    };

    return (
        <>
            <section className="w-full fixed left-0 top-0 flex flex-col justify-center items-center h-screen">
                <div
                    className="w-full fixed bg-black/50 left-0 top-0 h-screen"
                    onClick={() => setShowAdd(false)}
                ></div>
                <form className="w-full" onSubmit={saveOrder}>
                    <div className="py-6 flex flex-col justify-center sm:py-12 ">
                        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-bl from-green-100 to-lime-200 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                                <div className="max-w-md mx-auto">
                                    <div>
                                        <h1 className="text-2xl font-semibold">
                                            Add Order
                                        </h1>
                                    </div>
                                    <div className="divide-y divide-gray-200">
                                        {data.items.map((item, index) => (
                                            <div
                                                key={index}
                                                className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                                            >
                                                <div className="relative border-none mt-6">
                                                    <select
                                                        id={`productName_${index}`}
                                                        name={`productName_${index}`}
                                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                        value={item.productName}
                                                        onChange={(e) =>
                                                            handleItemChange(
                                                                index,
                                                                "productName",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            Select a product
                                                        </option>
                                                        {products.map(
                                                            (product) => (
                                                                <option
                                                                    key={
                                                                        product.id
                                                                    }
                                                                    value={
                                                                        product.name
                                                                    }
                                                                >
                                                                    {
                                                                        product.name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                    {errors[
                                                        `productName_${index}`
                                                    ] && (
                                                        <p className="text-red-700 text-sm mt-2">
                                                            {
                                                                errors[
                                                                    `productName_${index}`
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="relative border-none">
                                                    <input
                                                        autoComplete="off"
                                                        id={`quantity_${index}`}
                                                        name={`quantity_${index}`}
                                                        type="number"
                                                        min={1}
                                                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 border-t-0 border-r-0 border-l-0 focus:outline-none"
                                                        placeholder="Quantity"
                                                        onChange={(e) =>
                                                            handleItemChange(
                                                                index,
                                                                "quantity",
                                                                e.target.value
                                                            )
                                                        }
                                                        value={item.quantity}
                                                    />
                                                    <label
                                                        htmlFor={`quantity_${index}`}
                                                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                                    >
                                                        Quantity
                                                    </label>
                                                    {errors[
                                                        `quantity_${index}`
                                                    ] && (
                                                        <p className="text-red-700 text-sm mt-2">
                                                            {
                                                                errors[
                                                                    `quantity_${index}`
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                        {data.items.length < 2 && (
                                            <div className="relative border-none">
                                                <button
                                                    type="button"
                                                    onClick={addItem}
                                                    className="mt-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-tr from-blue-100 to-blue-200 py-2 px-4 font-dm text-base font-medium text-gray-440 shadow-xl shadow-blue-300/45 transition-transform duration-200 ease-in-out hover:scale-[1.02]"
                                                >
                                                    Add Another Item
                                                </button>
                                            </div>
                                        )}

                                        <div className="relative border-none mt-6">
                                            <select
                                                id="user"
                                                name="user"
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                value={data.user_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "user_id",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            >
                                                <option
                                                    value=""
                                                    selected
                                                    disabled
                                                >
                                                    Select a user
                                                </option>

                                                {users.map((user, index) => (
                                                    <option value={user.id}>
                                                        {user.name} ({user.role}
                                                        )
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="relative border-none">
                                            <button className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-tr from-green-100 to-lime-200 py-3 px-6 font-dm text-base font-medium text-gray-440 shadow-xl shadow-lime-300/45 transition-transform duration-200 ease-in-out hover:scale-[1.02]">
                                                Submit Order
                                            </button>
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

export default AddOrderModal;
