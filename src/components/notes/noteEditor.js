import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { FaEye, FaPen, FaFileAlt, FaExpand } from 'react-icons/fa';
import DoubleConfirmButton from '@components/notes/doubleConfirmButton';
import ListRow from '@components/table/listRow';

const NoteEditor = ({ noteContent, isPreview, handleContentChange, togglePreview, handleDeleteNote, handleMakeCharacterSheet, selectedNote, updateCharacterNote, showAlert}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    setIsFullscreen(false);
  }, [selectedNote, noteContent]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    if (textareaRef.current) {
      // // Reset textarea height first
      // textareaRef.current.style.height = 'auto';
      // Then set it to the scrollHeight to match the content
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 50}px`;
    }
  }, [noteContent, isPreview, selectedNote]);

  return (
    <div className="w-full pb-4 md:pb-0 md:w-2/3 md:pl-2 h-full flex flex-col">
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
      <div className="flex-grow px-8 bg-gray-100 dark:bg-gray-800 overflow-y-auto rounded-b-xl">
        {selectedNote?.character && (
          <ListRow characterData={selectedNote} isNoteView={true} showAlert={showAlert} notePreview={isPreview} updateCharacterNote={updateCharacterNote} />
        )}
        {isPreview ? (
          <div className="w-full">
            <ReactMarkdown className="prose dark:prose-invert">{noteContent}</ReactMarkdown>
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            className="w-full noscroll bg-gray-100 dark:bg-gray-800 dark:text-gray-100 resize-none focus:outline-none border-none focus:ring-0"
            value={noteContent}
            onChange={handleContentChange}
            rows={10} // Start with a single row
          />
        )}
      </div>
    </div>
  );
};

export default NoteEditor;