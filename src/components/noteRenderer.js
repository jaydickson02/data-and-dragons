import { useState } from "react";
import Link from "next/link";

function Note({ note, refreshData }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const editNote = () => {
    refreshData();
    }

  const deleteNote = async (ID) => {

    // Get data from the form.
    const data = {
        id: ID,
    };

    // Check that required fields are not empty.
    if (!data.id) {

        console.log("Missing values: " + data.id)
        return;

    }

    //Delete the note from the database

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = '/api/deleteNote';

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();

    // Set the notice message to display.
    if (result.data) {
        // Redirect to the campaign page with the campaign ID as a get parameter
        refreshData();
    }
}

  return (
    <>
      <div className="px-4 py-5 sm:px-6">
        <div className="bg-white overflow-hidden shadow-md rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dl>
              <dt className="text-sm leading-5 font-medium text-gray-500 truncate flex justify-between">
                {note.Session == 0 ? "No Notes" : "Session " + note.Session}
                <button class="bg-white-500 hover:bg-gray-100 text-black font-bold px-1 mb-2 rounded ml-auto" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                </button>
                
              </dt>
              <div className="border-t border-gray-200 pb-5" ></div> 
              <dd className="mt-1 text-sm leading-5 text-gray-900" dangerouslySetInnerHTML={{ __html: note.Content }}>
              </dd>
            </dl>
          </div>

          {isDrawerOpen && (
            <div>
              <div className="border-t border-gray-200"></div>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150 mb-5 ml-5 mt-5"
                onClick={() => {
                  editNote(note.ID);
                }}
              >
                Edit
              </button>

              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150 ml-2 mb-5 mt-5"
                onClick={() => {
                  deleteNote(note.ID);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Note;
