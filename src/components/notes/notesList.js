import React, { useState, useEffect } from 'react';
import lunr from 'lunr';
import { FaPlus, FaUser, FaFile, FaFilter } from 'react-icons/fa';

const NotesList = ({ notes, selectedNote, selectedTag, handleNoteSelect, addNewNoteToDatabase, campaignID, isMobile }) => {
  const [filter, setFilter] = useState('all'); // 'all', 'character', or 'normal'
  const [searchQuery, setSearchQuery] = useState('');
  const [lunrIndex, setLunrIndex] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    // Build Lunr.js index
    const buildLunrIndex = () => {
      const index = lunr(function () {
        this.ref('uniqueID');
        this.field('name');
        this.field('content');

        notes.forEach(note => {
          this.add({
            uniqueID: note.uniqueID,
            name: note.Name,
            content: note.content,
          });
        });
      });
      setLunrIndex(index);
    };

    buildLunrIndex();
  }, [notes]);

  const toggleFilter = () => {
    if (filter === 'all') {
      setFilter('character');
    } else if (filter === 'character') {
      setFilter('normal');
    } else {
      setFilter('all');
    }
  };

  useEffect(() => {
    handleNoteSelect(null);
  }, [filter, selectedTag]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (lunrIndex && query) {
      // Apply fuzzy search to the entire phrase
      const fuzzyQuery = `${query}~1`;

      const results = lunrIndex.search(fuzzyQuery);

      setSearchResults(
        results.map(result => ({
          uniqueID: result.ref,
          score: result.score,
        }))
      );

      setNoResults(results.length === 0);
    } else {
      // Show all notes when no search query is present
      setSearchResults(notes.map(note => ({ uniqueID: note.uniqueID, score: 1 })));
      setNoResults(false);
    }
  };

  // Function to extract title and description by stripping HTML tags
  const extractTitleAndDescription = (content, isCharacterNote = false) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    if (isCharacterNote) {
      // For character notes, return the full content as the description
      const fullContent = doc.body.textContent.trim();
      return {
        title: '',
        description: fullContent.length > 0 ? fullContent.slice(0, 160) : 'A bad wizard erased this page...',
      };
    }

    // Find the first text node or element for the title
    const firstTextNode = doc.body.firstChild;
    let title = '';
    if (firstTextNode) {
      title = firstTextNode.textContent.trim();
    }

    // Remove the first element or text node from the content
    if (firstTextNode) {
      doc.body.removeChild(firstTextNode);
    }

    // Get the remaining content after removing the title
    const remainingContent = doc.body.innerHTML;

    // Parse the remaining content to strip HTML tags
    const descriptionDoc = parser.parseFromString(remainingContent, 'text/html');
    const description = descriptionDoc.body.textContent.trim() || '';

    return {
      title: title.length > 0 ? title.slice(0, 80) : 'Untitled Note',
      description: description.length > 0 ? description.slice(0, 160) : 'A bad wizard erased this page...',
    };
  };

  // Determine which notes to display based on selectedTag, search results, and filters
  const filteredNotes = notes
    .filter(note => {
      // Filter by tag
      if (selectedTag && (!note.tags || !note.tags.includes(selectedTag))) {
        return false;
      }
      // Filter by type (character/normal)
      if (filter === 'character' && !note.character) return false;
      if (filter === 'normal' && note.character) return false;
      // Filter by search query
      if (searchQuery && !searchResults.some(result => result.uniqueID.toString() === note.uniqueID.toString())) return false;
      return true;
    })
    .map(note => {
      const matchingResult = searchResults.find(result => result.uniqueID.toString() === note.uniqueID.toString());
      return {
        ...note,
        score: matchingResult ? matchingResult.score : 1,
      };
    })
    .sort((a, b) => b.score - a.score);

    return (
      //if isMobile and SelectedNote hide this component
      <div className="flex flex-col border-r dark:border-gray-600 dark:bg-gray-800 h-full">
        <div className="flex justify-between items-center px-3 mb-4 mt-4 space-x-3">
          <h2 className="text-xl font-bold dark:text-gray-100">Notes</h2>
          <div className="flex space-x-1 text-xs">
            <button
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 rounded"
              onClick={toggleFilter}
            >
              {filter === 'all' ? <FaFilter /> : filter === 'character' ? <FaUser /> : <FaFile />}
            </button>
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
              onClick={() => addNewNoteToDatabase(campaignID)}
            >
              <FaPlus />
            </button>
          </div>
        </div>
        <div className="px-3">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full py-2 mb-2 text-gray-800 bg-white dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-300 rounded border border-gray-400 dark:border-gray-400"
          />
        </div>
        {noResults ? (
          <div className="flex flex-col h-full overflow-y-auto px-3 space-y-1">
            <div className="block w-full text-left p-2 dark:text-gray-100">
              <span className="block truncate w-full">
                No notes found matching the search query.
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full overflow-y-auto px-3">
            <ul className="space-y-1">
              {filteredNotes.map((note) => {
                let title, description;
                if (note.character) {
                  title = note.Name.slice(0, 80);
                  description = extractTitleAndDescription(note.content, true).description;
                } else {
                  const output = extractTitleAndDescription(note.content);
                  title = output.title;
                  description = output.description;
                }
    
                return (
                  <li key={note.uniqueID}>
                    <button
                      className={`block w-full text-left p-2 rounded-md dark:text-gray-100 ${
                        note.uniqueID === selectedNote?.uniqueID
                          ? 'bg-gray-100 dark:bg-gray-600 border-l-8 border-gray-500'
                          : ''
                      }`}
                      onClick={() => handleNoteSelect(note)}
                    >
                      <span className="block truncate font-bold">{title}</span>
                      <div className="h-10 overflow-hidden text-sm text-gray-500 dark:text-gray-300">
                        {description}
                      </div>
    
                      <div className="text-xs pt-1 text-gray-400 dark:text-gray-400">32 Aug</div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
};

export default NotesList;