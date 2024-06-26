import React from 'react'
import { BsAsterisk } from 'react-icons/bs';
export default function TextField(props) {
    const { name, onChangeFunction, type, title, rows, value } = props;
    return (
        <>
            <div className="sm:col-span-3">
                <label
                    htmlFor={name}
                    name={name}
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    <div className="flex">
                        {title}
                        <BsAsterisk className='h-2 w-auto text-[#FF0000] mx-1' />
                    </div>
                </label>
                <div className="mt-2">
                    <input
                        type={type}
                        name={name}
                        id={name}
                        onChange={onChangeFunction}
                        rows={rows}
                        defaultValue={value}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>


        </>
    )
}
