import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSpinner, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

const SaveButton = ({ onClick, isLoading = false }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    let saveTimeout;
    if (isSaving) {
      saveTimeout = setTimeout(() => {
        if (!isLoading) {
          setIsSaving(false);
          setIsSaved(true);
        }
      }, 1000); // Ensure spinner is shown for at least 1 second
    }

    return () => clearTimeout(saveTimeout);
  }, [isSaving, isLoading]);

  useEffect(() => {
    let resetTimeout;
    if (isSaved) {
      resetTimeout = setTimeout(() => {
        setIsSaved(false);
      }, 1500); // Show tick icon for 1 second before resetting
    }

    return () => clearTimeout(resetTimeout);
  }, [isSaved]);

  const handleClick = () => {
    setIsSaving(true);
    onClick && onClick();
  };

  return (
    <button
      onClick={handleClick}
      disabled={isSaving || isSaved}
      className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${
        (isSaving || isSaved) ? 'opacity-80' : ''
      } ${isSaved ? 'shake' : ''}`}  // Add the shake class when isSaved is true
    >
      {isSaving || isLoading ? (
        <FontAwesomeIcon icon={faSpinner} spin className="h-5 w-5" />
      ) : isSaved ? (
        <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5" />
      ) : (
        <FontAwesomeIcon icon={faFloppyDisk} className="h-5 w-5" />
      )}
    </button>
  );
};

export default SaveButton;