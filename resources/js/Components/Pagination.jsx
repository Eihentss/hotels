import React from "react";
import { Link } from "@inertiajs/react";

const Pagination = ({ cards }) => {
    console.log(cards);
    const links = cards.links;
    const currentPage = cards.current_page;
    const lastPage = cards.last_page;

    return (
        <>
            <nav>
                <ul className="flex items-center -space-x-px h-8 text-sm">
                    {links.map((link, i) => {
                        return (
                            <li key={i}>
                                <Link
                                    href={link.url}
                                    className={` ${
                                        link.active
                                            ? "bg-gradient-to-tr from-green-500 to-lime-400"
                                            : "bg-gradient-to-bl from-green-200 to-lime-400"
                                    } flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700  dark:border-gray-700 ${
                                        i == 0 && "rounded-s-3xl "
                                    } ${
                                        i == links.length - 1 &&
                                        "rounded-e-3xl "
                                    } 
                                    ${i == 0 && currentPage == 1 && "hidden"}
                                     ${
                                         lastPage == currentPage &&
                                         i == links.length - 1 &&
                                         "hidden"
                                     }
                                    `}
                                >
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
};

export default Pagination;
