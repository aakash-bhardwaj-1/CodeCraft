import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
    const { heading, count, imageLink } = props;

    return (
        <div className="flex flex-col flex-wrap min-w-[350px] p-4 border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex flex-row justify-between items-center w-full">
                <h5 className="mr-2 text-xl font-bold tracking-tight text-gray-900 dark:text-green-700">{count}</h5>
                <img src={imageLink} className="w-12 h-12 rounded-full" alt="Logo" />
            </div>
            <div>
                <p className="mt-2 font-normal text-sm text-gray-700 dark:text-gray-400">{heading}</p>
            </div>
        </div>
    );
}

export default Card;
