import React from 'react';
import { FaPlus } from 'react-icons/fa';

const NotesList = ({ notes, selectedNote, handleNoteSelect, addNewNoteToDatabase, campaignID }) => {
  const extractTitle = (content) => {
    const firstLine = content.split('\n')[0];
    const originalLength = firstLine.length;
    const title = firstLine.replace(/^#\s*/, '');
    return { title, originalLength };
  };

  const stripMarkdown = (markdown) => {
    return markdown
      .replace(/(\*\*|__)(.*?)\1/g, '$2')
      .replace(/(\*|_)(.*?)\1/g, '$2')
      .replace(/~~(.*?)~~/g, '$1')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
      .replace(/`(.*?)`/g, '$1')
      .replace(/#+\s(.*)/g, '$1')
      .replace(/>\s(.*)/g, '$1')
      .replace(/[*+-]\s/g, '')
      .replace(/\d+\.\s/g, '')
      .replace(/\n+/g, ' ')
      .trim();
  };

  return (
    <div className="w-1/3 px-4 py-4 sm:px-6 shadow rounded-lg bg-gray-300 dark:bg-gray-900 overflow-y-auto h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold dark:text-gray-100">Notes</h2>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
          onClick={() => addNewNoteToDatabase(campaignID)}
        >
          <FaPlus />
        </button>
      </div>
      <ul className="space-y-2">
        {notes.map((note) => {
          const { title, originalLength } = extractTitle(note.content);
          const descriptionStartIndex = originalLength + 1;
          let description = note.content.slice(descriptionStartIndex).trim();
          description = stripMarkdown(description);

          if (description.length === 0) {
            description = 'A bad wizard erased this page...';
          }

          return (
            <li key={note.id}>
              <button
                className={`block w-full text-left p-2 rounded-lg dark:text-gray-100 dark:hover:bg-gray-700 hover:bg-gray-100 ${
                  note.id === selectedNote?.id ? 'bg-gray-100 dark:bg-gray-600 font-semibold' : ''
                }`}
                onClick={() => handleNoteSelect(note)}
                style={{ height: '4.5rem' }}
              >
                <span className="block truncate font-bold">
                  {title}
                </span>
                <span className="block text-sm text-gray-500 dark:text-gray-400 truncate">
                  {description.length > 100 ? description.slice(0, 100) + '...' : description}
                </span>
              </button>
              <hr className="border-gray-500 dark:border-gray-700 mt-2" />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NotesList;