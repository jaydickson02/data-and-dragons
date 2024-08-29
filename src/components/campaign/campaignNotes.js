import { useState, useEffect, useCallback } from 'react';
import Split from 'react-split';
import NotesList from '@components/notes/notesList';
import NotesCarousel from '@components/notes/notesCarousel';
import NoteEditor from '@components/notes/noteEditor';
import SkeletonLoader from '@components/elements/skeletonLoader';
import { updateNoteInDatabase, addNewNoteToDatabase, deleteNote } from '@/lib/DBUtils/noteDBUtils';
import { updateCharacterInDatabase, deleteCharacter } from '@/lib/DBUtils/characterDBUtils';

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

export default function CampaignNotes({ campaignID, notes, characters = { data: [] }, isLoading, loadingError, setNotes, setCharacters, openAlert, setTags, selectedTag }) {
  // Handle State
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteContent, setNoteContent] = useState('');
  const [isPreview, setIsPreview] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [paneSizes, setPaneSizes] = useState([25, 75]);

  useEffect(() => {
    if(!isLoading){
      // Map characters to note-like objects
      const characterNotes = characters.data.map(character => ({
        id: character.ID, // Using character ID
        content: character.Background,
        character: true, // Flag to indicate this is a character note
        ...character // Spread all character data to use later in NoteEditor
      }));

      // Merge notes and character notes
      // Ensure all notes are unique based on their ID, prioritize characterNotes
      const mergedNotes = [...notes, ...characterNotes];
    
      const uniqueNotes = mergedNotes.reduce((acc, current) => {
        const existingIndex = acc.findIndex(item => item.ID === current.ID);
        if (existingIndex === -1 || !current.character) {
          // If no duplicate is found, add the note
          acc.push(current);
        } else {
          // If a duplicate is found, replace it with the one from characterNotes
          acc[existingIndex] = current;
        }
        return acc;
      }, []);

      //Set each note with a unique ID
      uniqueNotes.forEach((note, index) => {
        note.uniqueID = index;
      });

      setNotes(uniqueNotes);
  }
  }, [characters, isLoading]);

    
  useEffect(() => {
    if(!isLoading){
      findAndSetTags(notes);
    }
  }, [noteContent, notes]);
    
  
  const findAndSetTags = (notes) => {
    if (notes.length > 0) {
      // Iterate over each note and extract tags
      const updatedNotes = notes.map(note => {
        const tagRegex = /#\w+/g;
        const foundTags = note.content.match(tagRegex) || [];
  
        // Remove the '#' from each tag and store in the note object
        note.tags = foundTags.map(tag => tag.replace('#', ''));
  
        return note;
      });
  
      // Flatten all tags across all notes
      const allTags = updatedNotes.map(note => note.tags).flat();
  
      // Remove duplicates
      const uniqueTags = [...new Set(allTags)];
  
      // Extract tag name and iconType
      const tagData = uniqueTags.map(tag => {
        return {
          tag: tag,
          iconType: 'HiOutlineTag' // Set default icon, can be changed later based on some logic
        };
      });
  
      setTags(tagData); // Assuming setTags is a useState setter function
      setNotes(updatedNotes); // Assuming setNotes is used to update the state of notes
    }
  };


  const updateCharacterNote = (characterData) => {
    const updatedNotes = notes.map((note) =>
      note.uniqueID === characterData.uniqueID ? { ...note, ...characterData,  } : note
    );

    
    let updatedCharacters = {
        data: characters.data.map(existingCharacter => 
            existingCharacter.ID === characterData.ID 
                ? {
                    ...existingCharacter,
                    Name: characterData.Name,
                    Class: characterData.Class,
                    Background: characterData.Background,
                    CampaignID: characterData.CampaignID,
                    Player: characterData.characterType === "Player" ? 1 : 0,
                    Image: characterData.Image,
                    PlayerName: characterData.PlayerName,
                    Affiliation: characterData.Affiliation,
                    Location: characterData.Location,
                    Alignment: characterData.Alignment,
                    Level: characterData.Level,
                    Race: characterData.Race,
                    Status: characterData.Status,
                } 
                : existingCharacter
        )
    };
    
    setCharacters(updatedCharacters);
    setNotes(updatedNotes); // Set the notes without filtering out character notes
  };

  const debouncedUpdateNote = useCallback(
    debounce((noteId, content, campaignID) => {
      
      const noteToUpdate = notes.find(note => note.uniqueID === noteId);

      if (noteToUpdate.character) {
        // Update the Background field with the new content for character notes
        updateCharacterInDatabase({ 
          ...noteToUpdate, 
          Background: content 
        });
      } else {
        // Update regular note
        updateNoteInDatabase(noteToUpdate.id, content, campaignID);
      }
    }, 1000),
    [notes]
  );

  // Set the selected note and note content when notes are loaded
  // useEffect(() => {
  //   if (notes.length > 0) {
  //     setSelectedNote(notes[0]);
  //     setNoteContent(notes[0].content);
  //   }
  // }, [isLoading]);

  // Add a new note if there are no notes
  useEffect(() => {
    if (!isLoading && notes.length === 0) {
      addNewNoteToDatabase(campaignID, setNotes, setSelectedNote, setNoteContent);
    }
  }, [notes, isLoading]);

  // Update the note or character in the database when the note content changes
  useEffect(() => {
    if (selectedNote) {
      debouncedUpdateNote(selectedNote.uniqueID, noteContent, campaignID);
    }
  }, [noteContent, selectedNote, debouncedUpdateNote]);

  // Detect screen size for responsive rendering
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 481);
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle selecting a note
  const handleNoteSelect = (note) => {
    setSelectedNote(note);
    setNoteContent(note ? note.content : '');
  };

  // Handle changing the note content
  const handleContentChange = (e) => {
    const updatedContent = e.target.value;
    setNoteContent(updatedContent);

    const updatedNotes = notes.map((note) =>
      note.uniqueID === selectedNote.uniqueID ? { ...note, content: updatedContent } : note
    );

    let updatedCharacters;

    if (selectedNote.character) {
      //Update the characters too
      updatedCharacters = {
        data: characters.data.map(existingCharacter => 
            existingCharacter.ID === selectedNote.ID 
                ? {
                    ...existingCharacter,
                    Background: updatedContent
                } 
                : existingCharacter
        )
      };
    } else {
      updatedCharacters = characters;
    }


    setCharacters(updatedCharacters);
    setNotes(updatedNotes);
  };

  // Handle deleting a note or character
  const handleDeleteNote = () => {
    if (selectedNote) {
      const noteIndex = notes.findIndex((note) => note.uniqueID === selectedNote.uniqueID);

      if (selectedNote.character) {
        // Delete character note
        deleteCharacter(selectedNote.id, openAlert);

        // Remove the character from the characters state
        const remainingCharacters = characters.data.filter((character) => character.ID !== selectedNote.id);
        setCharacters({ data: remainingCharacters });
      } else {
        // Delete regular note
        deleteNote(selectedNote.id, openAlert);
      }

      const remainingNotes = notes.filter((note) => note.uniqueID !== selectedNote.uniqueID);
      setNotes(remainingNotes);

      if (remainingNotes.length > 0) {
        // Determine the new selected note: the note before, or the note after if the before doesn't exist
        const newSelectedNoteIndex = noteIndex > 0 ? noteIndex - 1 : 0;
        setSelectedNote(remainingNotes[newSelectedNoteIndex]);
        setNoteContent(remainingNotes[newSelectedNoteIndex].content);
      } else {
        setSelectedNote(null);
        setNoteContent('');
      }
    }
  };

  // Handle toggling the preview mode
  const togglePreview = () => {
    setIsPreview(!isPreview);
  };


  // Handle loading state
  if (isLoading) {
    return (
      <div>
        <div className="flex h-screen">
          <div className="w-1/3 p-4 shadow  bg-gray-100 dark:bg-gray-900">
            <SkeletonLoader width="w-full" height="h-16 mb-4" />
            <SkeletonLoader width="w-full" height="h-16 mb-4" />
            <SkeletonLoader width="w-full" height="h-16 mb-4" />
            <SkeletonLoader width="w-full" height="h-16 mb-4" />
            <SkeletonLoader width="w-full" height="h-16 mb-4" />
            <SkeletonLoader width="w-full" height="h-16 mb-4" />
          </div>
          <div className="w-2/3">
            <div className="h-full max-h-full p-4  bg-gray-100 dark:bg-gray-900 relative">
              <SkeletonLoader width="w-full" height="h-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (loadingError) {
    return (
      <div className="px-4 py-5 sm:px-6 mb-5 mt-5 shadow rounded-lg bg-gray-100 dark:bg-gray-900">
        <h3 className="text-lg leading-6 font-medium text-red-600 dark:text-red-400">
          Notes failed to load
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-red-500 dark:text-red-400">
          {loadingError}
        </p>
      </div>
    );
  }

  if(isMobile){
  // Render notes
  return (
    <div className="h-screen">
        {selectedNote ? null : (
        <div className="h-full min-w-[200px]">
          <NotesList
            notes={notes}
            selectedNote={selectedNote}
            handleNoteSelect={handleNoteSelect}
            addNewNoteToDatabase={(campaignID) => addNewNoteToDatabase(campaignID, setNotes, setSelectedNote, setNoteContent)}
            campaignID={campaignID}
            selectedTag={selectedTag}
          />
        </div>
        )}
        {!selectedNote ? null : (
        <div className="h-full">
          <NoteEditor
            noteContent={noteContent}
            isPreview={isPreview}
            handleContentChange={handleContentChange}
            togglePreview={togglePreview}
            handleDeleteNote={handleDeleteNote}
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
            updateCharacterNote={updateCharacterNote}
            showAlert={openAlert}
            isMobile={isMobile}
          />
        </div>
        )}
    </div>
  );} else {

  // Render notes
  return (
    <div className="h-screen">
      <Split
        className="flex h-full"
        direction="horizontal"
        sizes={paneSizes} // Use state for pane sizes
        minSize={[200, 400]}
        gutterSize={2}
        gutterAlign="center"
        gutterStyle={() => ({width: '8px'})}
        onDragEnd={(sizes) => setPaneSizes(sizes)} // Save the sizes on drag end
        >
        <div className="h-full min-w-[200px]">
          <NotesList
            notes={notes}
            selectedNote={selectedNote}
            handleNoteSelect={handleNoteSelect}
            addNewNoteToDatabase={(campaignID) => addNewNoteToDatabase(campaignID, setNotes, setSelectedNote, setNoteContent)}
            campaignID={campaignID}
            selectedTag={selectedTag}
          />
        </div>
        <div className="h-full border-l dark:border-gray-600">
          <NoteEditor
            noteContent={noteContent}
            isPreview={isPreview}
            handleContentChange={handleContentChange}
            togglePreview={togglePreview}
            handleDeleteNote={handleDeleteNote}
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
            updateCharacterNote={updateCharacterNote}
            showAlert={openAlert}
            isMobile={isMobile}
          />
        </div>
      </Split>
    </div>
  );
}
}