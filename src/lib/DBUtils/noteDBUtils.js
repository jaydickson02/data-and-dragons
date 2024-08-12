// lib/DBUtils/noteDBUtils.js

import { PostToDB } from '@/lib/DBUtils/PostCalls';
import { DeleteFromDB } from "@/lib/DBUtils/RemoveCalls";

// Function to update an existing note in the database
export const updateNoteInDatabase = async (noteId, content) => {
  const data = {
    id: noteId,
    content: content,
    session: 1, // Hardcoded session for now
  };

  if (!data.id || !data.content || !data.session) {
    console.log("Missing values for note update");
    return;
  }

  const JSONdata = JSON.stringify(data);
  const endpoint = '/api/updateNote';

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSONdata,
  };

  try {
    const response = await fetch(endpoint, options);
    const result = await response.json();

    if (parseInt(result.affectedRows) === 0) {
      console.log("Failed to update note");
      return;
    }

    if (parseInt(result.affectedRows) >= 1) {
      console.log("Note updated successfully");
    }
  } catch (error) {
    console.error("Failed to update note", error);
  }
};

// Function to add a new note to the database
export const addNewNoteToDatabase = async (campaignID, setNotes, setSelectedNote, setNoteContent) => {
  const newNoteData = {
    objectID: campaignID,
    content: "# A new page in the Grimoire", // Default content for a new note
    session: 1, // Adjust as needed
  };

  if (!newNoteData.objectID || !newNoteData.content || !newNoteData.session) {
    console.error("Missing values in new note data:", newNoteData);
    return;
  }

  try {
    const result = await PostToDB("/api/add/note", newNoteData);
    if (!result || !result.data) {
      throw new Error("Failed to add note: Invalid response from server");
    }

    newNoteData.id = result.data.insertId;

    setNotes((prevNotes) => [...prevNotes, newNoteData]);
    setSelectedNote(newNoteData);
    setNoteContent(newNoteData.content);
    console.log("New note added successfully");

  } catch (error) {
    console.error("Failed to add new note", error);
  }
};

// Function to delete a note from the database
export const deleteNote = async (ID, openAlert) => {

  const data = { id: ID };

  if (!data.id) {
    console.log("Missing values: " + data.id);
    return;
  }

  DeleteFromDB('/api/remove/note', data)
    .then((result) => {
      console.log("Note removed Successfully: " + result);
    })
    .catch((error) => {
      openAlert('red', 'There was an error deleting the note.', 'Error');
    });
};

// Function to fetch notes based on campaignID
export const fetchNotes = async (campaignID, setNotes, setSelectedNote, setNoteContent, setNotesIsLoading, setNotesError, openAlert) => {
    setNotesIsLoading(true);
    try {
      const notesRes = await fetch(`/api/get/notes/${campaignID}`);
      if (!notesRes.ok) throw new Error('Failed to load notes');
      const notesData = await notesRes.json();
  
      // Map the fetched notes to the expected structure
      const mappedNotes = notesData.data.map((note) => ({
        id: note.ID,
        content: note.Content,
        session: note.Session
      }));
  
      setNotes(mappedNotes);
      setSelectedNote(mappedNotes[0]); // Set the first note as the selected note
      setNoteContent(mappedNotes[0]?.content || ''); // Set the content of the first note
    } catch (error) {
      setNotesError(error.message);
      openAlert && openAlert('Error loading notes', 'error'); // Trigger the alert if openAlert is provided
    } finally {
      setNotesIsLoading(false);
    }
  };