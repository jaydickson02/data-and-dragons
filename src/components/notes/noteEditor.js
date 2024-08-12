import React from 'react';
import ReactMarkdown from 'react-markdown';
import { FaEye, FaPen } from 'react-icons/fa';

const NoteEditor = ({ noteContent, isPreview, handleContentChange, togglePreview }) => {
  return (
    <div className="w-2/3 pl-4 relative">
      {isPreview ? (
        <div className="h-full max-h-full p-8 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800 overflow-y-auto relative">
          <ReactMarkdown className="prose dark:prose-invert">{noteContent}</ReactMarkdown>
          <button
            onClick={togglePreview}
            className="absolute top-8 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
          >
            <FaPen size={18} />
          </button>
        </div>
      ) : (
        <div className="h-full max-h-full relative">
          <textarea
            className="w-full h-full max-h-full p-8 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 overflow-y-auto"
            value={noteContent}
            onChange={handleContentChange}
          />
          <button
            onClick={togglePreview}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
          >
            <FaEye size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default NoteEditor;