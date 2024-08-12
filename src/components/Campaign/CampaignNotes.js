import { useState, useEffect, useCallback } from 'react';
import NotesList from '@components/notes/notesList';
import NoteEditor from '@components/notes/noteEditor';
import SkeletonLoader from '@components/elements/skeletonLoader';
import { updateNoteInDatabase, addNewNoteToDatabase, deleteNote, fetchNotes } from '@/lib/DBUtils/noteDBUtils';

// Debounce function to limit the frequency of updates
function debounce(func, delay) {
  let timeout;
  return (...args) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export default function CampaignNotes({ campaignID, openAlert }) {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteContent, setNoteContent] = useState('');
  const [isPreview, setIsPreview] = useState(true); // Preview is the default mode
  const [notesIsLoading, setNotesIsLoading] = useState(true);
  const [notesError, setNotesError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state for delete

  // Fetch notes based on campaignID
  useEffect(() => {
    fetchNotes(campaignID, setNotes, setSelectedNote, setNoteContent, setNotesIsLoading, setNotesError, openAlert);
  }, [campaignID, openAlert]);

  // Debounced function for updating the note in the database
  const debouncedUpdateNote = useCallback(
    debounce((noteId, content, campaignID) => {
      updateNoteInDatabase(noteId, content, campaignID);
    }, 1000),
    []
  );

  useEffect(() => {
    if (selectedNote) {
      debouncedUpdateNote(selectedNote.id, noteContent);
    }
  }, [noteContent, selectedNote, debouncedUpdateNote]);

  const handleNoteSelect = (note) => {
    setSelectedNote(note);
    setNoteContent(note.content);
  };

  const handleContentChange = (e) => {
    const updatedContent = e.target.value;
    setNoteContent(updatedContent);

    const updatedNotes = notes.map((note) =>
      note.id === selectedNote.id ? { ...note, content: updatedContent } : note
    );
    setNotes(updatedNotes);
  };

  const handleDeleteNote = () => {
    if (selectedNote) {
      deleteNote(selectedNote.id, setIsLoading, openAlert);
      const remainingNotes = notes.filter((note) => note.id !== selectedNote.id);
      setNotes(remainingNotes);

      if (remainingNotes.length > 0) {
        setSelectedNote(remainingNotes[0]);
        setNoteContent(remainingNotes[0].content);
      } else {
        setSelectedNote(null);
        setNoteContent('');
      }
    }
  };

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  if (notesIsLoading) {
    return (
      <div>
        <div className="flex justify-between items-center px-4 py-5 sm:px-6 mb-5 mt-5 shadow rounded-lg bg-gray-100 dark:bg-gray-900">
        
        <SkeletonLoader width="w-full" height="h-10" />
      </div>
      <div className="flex h-screen">
        <div className="w-1/3 px-4 py-5 sm:px-6 shadow rounded-lg bg-gray-100 dark:bg-gray-900">
          <SkeletonLoader width="w-full" height="h-16 mb-4" />
          <SkeletonLoader width="w-full" height="h-16 mb-4" />
          <SkeletonLoader width="w-full" height="h-16 mb-4" />
        </div>
        <div className="w-2/3 pl-4">
            <div className="h-full max-h-full p-8 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800 relative">
                <SkeletonLoader width="w-full" height="h-full" />
            </div>
        </div>
        </div>
      </div>
    );
  }

  if (notesError) {
    return (
        <div className="px-4 py-5 sm:px-6 mb-5 mt-5 shadow rounded-lg bg-gray-100 dark:bg-gray-900">
          <h3 className="text-lg leading-6 font-medium text-red-600 dark:text-red-400">
            Notes failed to load
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-red-500 dark:text-red-400">
            {notesError}
          </p>
        </div>
      );
  }

  return (
    <>
      <div className="flex justify-between items-center px-4 py-5 sm:px-6 mb-5 mt-5 shadow rounded-lg bg-gray-100 dark:bg-gray-900">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Notes</h3>
        
        <div className="flex space-x-2">
           
            <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                onClick={handleDeleteNote}
                disabled={!selectedNote || isLoading}
            >
                Delete Note
            </button>
        </div>
      </div>
      <div className="flex h-screen">
        <NotesList
          notes={notes}
          selectedNote={selectedNote}
          handleNoteSelect={handleNoteSelect}
          addNewNoteToDatabase={(campaignID) => addNewNoteToDatabase(campaignID, setNotes, setSelectedNote, setNoteContent)}
          campaignID={campaignID}
        />
        <NoteEditor
          noteContent={noteContent}
          isPreview={isPreview}
          handleContentChange={handleContentChange}
          togglePreview={togglePreview}
        />
      </div>
    </>
  );
}