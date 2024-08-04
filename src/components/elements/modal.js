import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 sm:w-1/2 relative">
                <button
                    className="absolute top-2 right-2 text-gray-700 dark:text-gray-300"
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