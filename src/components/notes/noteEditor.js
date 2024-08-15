import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { FaEye, FaPen, FaFileAlt, FaExpand } from 'react-icons/fa';
import DoubleConfirmButton from '@components/notes/doubleConfirmButton';

const NoteEditor = ({ noteContent, isPreview, handleContentChange, togglePreview, handleDeleteNote, handleMakeCharacterSheet, selectedNote }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setIsFullscreen(false);
  }, [selectedNote, noteContent]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="w-full pb-4 md:w-2/3 md:pl-2 md:pb-0 h-full flex flex-col">
      {/* Options Bar */}
      <div className="flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-800 rounded-t-xl">
        <button
          onClick={togglePreview}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          title={isPreview ? 'Edit' : 'Preview'}
        >
          {isPreview ? <FaPen size={12} /> : <FaEye size={12} />}
        </button>
        <div className="flex space-x-2">
          <button
            onClick={toggleFullscreen}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            title="Fullscreen"
          >
            <FaExpand size={12} />
          </button>
          <button
            onClick={handleMakeCharacterSheet}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            title="Make Character Sheet"
          >
            <FaFileAlt size={12} />
          </button>
          <DoubleConfirmButton onConfirm={handleDeleteNote} noteContent={noteContent} selectedNote={selectedNote} />
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div className="flex-grow overflow-y-auto">
        {isPreview ? (
          <div className="h-full px-8 bg-gray-100 rounded-b-xl dark:bg-gray-800 overflow-y-auto">
            <ReactMarkdown className="prose dark:prose-invert">{noteContent}</ReactMarkdown>
          </div>
        ) : (
          <div className="h-full relative">
            <textarea
              className="w-full h-full px-8 rounded-b-xl bg-gray-100 dark:bg-gray-800 dark:text-gray-100 overflow-y-auto resize-none focus:outline-none border-none focus:ring-0"
              value={noteContent}
              onChange={handleContentChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteEditor;