import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
//import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { PostToDB } from '@/lib/DBUtils/PostCalls';

import 'font-awesome/css/font-awesome.min.css';
import { FaSpinner } from 'react-icons/fa';

export default function Note(props) {
  const [value, setValue] = useState(
    '<p>Write a new note here...</p> <br></br> <br></br>'
    );
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(newValue) {
    setValue(newValue);
  }

  const clearField = () => {
    setValue('<p>Write a new note here...</p> <br></br> <br></br>');
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

    setIsLoading(true);

    PostToDB("/api/add/note", data)
    .then((result) => {
      props.showAlert("gray", "Note added successfully", "Success")
      setIsLoading(false);
      clearField();

    })
    .catch((error) => {
      console.error(error);
      setIsLoading(false);
      props.showAlert("red", "Failed to add note", "Error")
    });
  }

  return (

    <form id="noteForm" onSubmit={handleSubmit}>
      <ReactQuill
       value={value}
       theme="bubble"
       spellcheck="true"
       onChange={handleChange}
       className="px-2 mt-16 bg-gray-100 dark:bg-gray-800 dark:text-gray-100 rounded-md"
       placeholder=""
       modules={{
         toolbar: [
           ['bold', 'italic', 'underline', 'strike'],
           [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
           [{ 'list': 'ordered'}, { 'list': 'bullet' }],
           ['link'],
           
         ]
       }}
      />
      
       <div class="py-3">
            <div class="flex items-center">   
                <button type="submit" class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                Add
                </button>
                {isLoading && (
                    <FaSpinner class ="fa-spin ml-2" />
                )}
            </div>
        </div>

    </form>

  );
}
