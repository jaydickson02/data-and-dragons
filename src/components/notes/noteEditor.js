import React, { useState, useEffect } from 'react';
import TiptapEditor from '@components/notes/tiptapEditor';
import DoubleConfirmButton from '@components/notes/doubleConfirmButton';
import TurndownService from 'turndown';
import { FaAngleLeft, FaDownload, FaHashtag } from 'react-icons/fa';

const NoteEditor = ({
  noteContent,
  handleContentChange,
  handleDeleteNote,
  handleMakeCharacterSheet,
  selectedNote,
  setSelectedNote,
  updateCharacterNote,
  showAlert,
  isMobile,
}) => {
  const [title, setTitle] = useState('');
  const [showBorder, setShowBorder] = useState(false);

  const updateTitle = (content) => {
    if (selectedNote?.character) {
      setTitle(selectedNote.Name);
    } else if (content) {
      const tempElement = document.createElement('div');
      tempElement.innerHTML = content;

      const firstTextNode = tempElement.childNodes[0];
      let firstLine = '';

      if (firstTextNode) {
        if (firstTextNode.nodeType === Node.TEXT_NODE) {
          firstLine = firstTextNode.textContent.trim();
        } else if (firstTextNode.nodeType === Node.ELEMENT_NODE) {
          firstLine = firstTextNode.textContent.split('\n')[0].trim();
        }
      }

      let cleanTitle = firstLine.replace(/<\/?[^>]+(>|$)/g, '');

      if (cleanTitle.length === 0) {
        cleanTitle = "Untitled Note";
      }

      setTitle(cleanTitle.slice(0, 80));
    } else {
      setTitle('');
    }
  };

  useEffect(() => {
    updateTitle(noteContent);
  }, [selectedNote, noteContent]);

  const exportToMarkdown = () => {
    const turndownService = new TurndownService();
    const markdownContent = turndownService.turndown(noteContent);

    const element = document.createElement('a');
    const file = new Blob([markdownContent], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${title || 'Untitled Note'}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Function to handle scroll event from TiptapEditor
  const handleScroll = (scrollTop) => {
    setShowBorder(scrollTop > 0);
  };

  if(selectedNote) {
  return (
    <div className="relative h-full flex flex-col bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      {/* Options Bar */}
      <div className={`flex justify-between items-center px-6 py-2 transition-all duration-300 ${showBorder ? 'border-b dark:border-gray-600' : ''}`}>
        {isMobile &&
          //Reset selectedNote to null
          <button
            onClick={() => setSelectedNote(null)}
            className="flex w-8 h-8 items-center justify-center rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 mr-8"
            title="Close"
          > <FaAngleLeft size={16} /> </button>}

        <h2 className={`text-xl font-bold dark:text-gray-100 transition-opacity duration-500 ${showBorder ? 'opacity-100' : 'opacity-0'}`}>
          {title}
        </h2>
        <div className="ml-auto flex space-x-0">
          <button
            onClick={handleMakeCharacterSheet}
            className="flex w-8 h-8 items-center justify-center rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            title="Make Character Sheet"
          >
            <FaHashtag size={14}/>
          </button>
          <button
            onClick={exportToMarkdown}
            className="flex w-8 h-8 items-center justify-center rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            title="Export as Markdown"
          >
            <FaDownload size={14}/>
          </button>
          <DoubleConfirmButton onConfirm={handleDeleteNote} noteContent={noteContent} selectedNote={selectedNote} />
        </div>
      </div>
        
      {/* Editor */}
      <TiptapEditor
        noteContent={noteContent}
        handleContentChange={handleContentChange}
        selectedNote={selectedNote}
        updateTitle={updateTitle}
        showAlert={showAlert}
        updateCharacterNote={updateCharacterNote}
        onScroll={handleScroll}
      />
    </div>
  )} else {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-800 dark:text-gray-200">
        <h2 className="text-xl font-bold dark:text-gray-100">No note selected</h2>
      </div>
    );
  }
};

export default NoteEditor;