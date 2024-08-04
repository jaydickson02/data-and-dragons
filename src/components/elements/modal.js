import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-6 rounded-lg shadow-lg w-11/12 sm:w-1/2 max-h-[calc(100%-4rem)] overflow-auto mt-8 mb-8">
                <button
                    className="fixed top-12 right-8 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg"
                    onClick={onClose}
                >
                    <FaTimes size={20} />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;