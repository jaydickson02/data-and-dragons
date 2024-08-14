import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const DoubleConfirmButton = ({ onConfirm, noteContent, selectedNote }) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [showConfirmText, setShowConfirmText] = useState(false);

  useEffect(() => {
    setDeleteConfirmation(false);
    setShowConfirmText(false);
  }, [noteContent, selectedNote]);

  useEffect(() => {
    let timer;
    if (deleteConfirmation && showConfirmText) {
      timer = setTimeout(() => {
        setDeleteConfirmation(false);
        setShowConfirmText(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [deleteConfirmation, showConfirmText]);

  const handleDeleteClick = () => {
    if (deleteConfirmation && showConfirmText) {
      onConfirm();
      setDeleteConfirmation(false);
      setShowConfirmText(false); // Reset to original state after confirmation
    } else {
      setDeleteConfirmation(true);
    }
  };

  const handleTransitionEnd = () => {
    if (deleteConfirmation) {
      setShowConfirmText(true); // Show "Confirm?" text after expansion
    }
  };

  return (
    <div
      className={`relative flex items-center justify-center ${
        deleteConfirmation ? 'w-32' : 'w-8'
      } h-8 rounded-full transition-all duration-300 ease-in-out ${
        showConfirmText ? 'pulse-red bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
      }`}
      onTransitionEnd={handleTransitionEnd}
    >
      <button
        onClick={handleDeleteClick}
        className="flex items-center justify-center w-full h-full text-center"
        title="Delete"
      >
        {!showConfirmText ? <FaTrashAlt size={12} /> : 'Confirm?'}
      </button>
    </div>
  );
};

export default DoubleConfirmButton;