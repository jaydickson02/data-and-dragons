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

  function handleSubmit(event) {
    event.preventDefault();
    // Clear the form.

    clearField();

    //Call the database

    props.refreshData();

    if(value == '') {
        return;
    }

    // Send the data to a server-side endpoint
    fetch('/api/saveNote', {
      method: 'POST',
      body: JSON.stringify({ content: value, objectID: props.ObjectID, session: props.SessionNumber}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
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
           [{ 'align': [] }],
           ['link', 'image'],
           ['clean']
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
