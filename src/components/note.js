import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function Note(props) {
  const [value, setValue] = useState('');

  function handleChange(newValue) {
    setValue(newValue);
  }

  const clearField = () => {
    setValue('');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Don't submit if the field is empty.
    if(value == '') {
      return;
  }

    const data = {

      content: value, 
      objectID: props.ObjectID, 
      session: props.SessionNumber
    };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

      // API endpoint where we send form data.
    const endpoint = '/api/saveNote';

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

      if (result.data) {

        props.showAlert("Note Added. ", result.data);

        // Clear the form.
        clearField();

        //Call the database
        props.refreshData();
    }
      
  }

  return (

    <form id="noteForm" onSubmit={handleSubmit}>
      <ReactQuill
       value={value}
       onChange={handleChange}
       placeholder="Type something..."
       className="bg-white p-4 h-64 rounded-md"
       modules={{
         toolbar: [
           ['bold', 'italic', 'underline', 'strike'],
           [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
           [{ 'list': 'ordered'}, { 'list': 'bullet' }],
           ['link'],
           
         ]
       }}
      />
      
       <div class="px-4 py-10 sm:px-6">
            <div class="flex">   
                <button type="submit" class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                Add
                </button>
            </div>
        </div>

    </form>

  );
}
