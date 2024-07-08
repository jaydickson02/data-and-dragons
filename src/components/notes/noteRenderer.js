//React
import { useState } from "react";
import React from "react";

//Components
import Alert from "@/components/elements/alert";

//Database
import { DeleteFromDB } from "@/lib/DBUtils/RemoveCalls";
import { PostToDB } from "@/lib/DBUtils/PostCalls";

//Next
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from "next/link";
import dynamic from 'next/dynamic';

//Quill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
//import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

//Icons
import 'font-awesome/css/font-awesome.min.css';
import { FaSpinner, FaEdit } from 'react-icons/fa';
import { BiExpandAlt } from 'react-icons/bi';
import { BsThreeDots } from "react-icons/bs";

export default function Note({ note }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(note.Content);
  const [sessionNumber, setSessionNumber] = useState(note.Session);
  const [collapsed, setCollapsed] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  //Open and manage the alert
  const [noticeMessage, setNoticeMessage] = useState('');
  const [noticeColour, setNoticeColour] = useState('');
  const [showNotice, setShowNotice] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');

  let openAlert = (colour, message, title) => {
    setShowNotice(!showNotice);
    setNoticeColour(colour);
    setNoticeTitle(title);
    setNoticeMessage(message);
    };

  const editNote = () => {
    setIsEditing(!isEditing);
    setIsDrawerOpen(!isDrawerOpen);
    setValue(note.Content);
    };


  let saveNote = async (ID) => {

    // Get data 
    const data = {
      id: ID,
      content: value,
      session: parseInt(sessionNumber),
    };

    // Check that required fields are not empty.
    if (!data.id || !data.content || !data.session) {

        console.log("Missing values for note update")
    }

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = '/api/updateNote';

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

    setIsLoading(true);

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();

    if(parseInt(result.affectedRows) == 0 ){
      openAlert("red", "Error updating note", "Error");
      setIsLoading(false);
      return;
    }

    if (parseInt(result.affectedRows) >= 1) {
      openAlert("gray", "Note updated successfully", "Success");
      setIsEditing(!isEditing);
      setIsLoading(false);
  }

  };

  const deleteNote = async (ID) => {

    console.log("I RAN 4")

    // Get data from the form.
    const data = {
        id: ID,
    };

    // Check that required fields are not empty.
    if (!data.id) {

        console.log("Missing values: " + data.id)
        return;

    }

    setIsLoading(true);

    DeleteFromDB('/api/remove/note', data)
    .then((result) => {
      console.log("I RAN 3")
      // If successful, show an alert.
      openAlert('gray', 'Note removed successfully.', 'Success')

      // Set loading to false.
      setIsLoading(false);

    })
    .catch((error) => {
      console.log("I RAN 2")
      //console.error(error);

      // Set loading to false.
      setIsLoading(false);

      // If there was an error, show an alert.
      openAlert('red', 'There was an error deleting the note.', 'Error')
    });

}

  if(collapsed) {

    return(
      <div className="my-5">
      <div className="bg-white hover:bg-gray-50 dark:hover:bg-gray-600 dark:bg-gray-800 overflow-hidden shadow-md rounded-lg" onClick={() => {setCollapsed(false)}}>
          <div className="p-6">
            
            <dl id="noteContent">
              <dt className="text-sm leading-5 font-medium text-gray-500 dark:text-gray-100 truncate flex justify-between">
                <div>
              {note.Session == 0 ? "No Notes" : "Session " + note.Session}
              </div>
              <div>
                <BiExpandAlt class="fa"/>
              </div>

              </dt>
            </dl>
          </div>
        </div>
        </div>

              
      
    )

  }else{

  return (
    <>

      <div className="my-5">
      {showNotice && (<Alert colour={noticeColour} title={noticeTitle} message={noticeMessage} show={openAlert}/>)}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-md rounded-lg">
          <div>
            
            <dl id="noteContent">
              <dt className="text-sm leading-5 font-medium text-gray-500 dark:text-gray-100 truncate flex justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-600" onClick={() => {setCollapsed(true)}}>

              {isEditing && ( 
                <div class="flex items-center">
                  <label class="mr-2" for="sessionNumber">Session:</label>
                  <input type="number" class="w-24 dark:bg-gray-800" id="sessionNumber" value={sessionNumber} onChange={() => {setSessionNumber(document.getElementById("sessionNumber").value)}}></input>
                </div>
              )}
              <div>
              {!isEditing && (note.Session == 0 ? "No Notes" : "Session " + note.Session)}

              </div>
                <div class="ml-auto">
                  <BiExpandAlt class="fa"/>
                </div>
              </dt>

              {!isEditing && (
              <>
              <div className="px-6 pb-5" >
                <dd className="mt-1 text-sm leading-5 text-gray-900 dark:text-gray-100" dangerouslySetInnerHTML={{ __html: note.Content}}>
                </dd>

                {!isEditing && (
                
                <div className="flex items-center p-5">
              
                  <button class="text-black dark:text-gray-400" type="button" onClick={() => {editNote(note.ID)}}>
                    <FaEdit class="fa" size={20}/>
                  </button>

                </div>
                )}
                
              </div> 
              </>
            )}

            </dl>
          </div>

          {isEditing && (
          
            <form id="noteEditForm">
            <ReactQuill
             value={value}
             theme="bubble"
             onChange={(value) => {setValue(value)}}
             placeholder="Type something..."
             className="bg-white dark:bg-gray-800 dark:border-gray-800 h-full rounded-md dark:text-gray-100"
             modules={{
               toolbar: [
                 ['bold', 'italic', 'underline', 'strike'],
                 [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                 [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                 ['link'],
               ]
             }}
            />
            
            <div className="flex justify-between items-center">
              <div className="border-t border-gray-200"></div>

                <button
                  type="button"
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150 ml-2 mb-5 mt-5"
                  onClick={() => {saveNote(note.ID)}}
                >
                  Save
                </button>

                {isLoading && (
                    <FaSpinner class ="fa fa-spin ml-auto mr-2" />
                )}

                <button
                  type="button"
                  className="bg-white-500 hover:bg-gray-100 text-black font-bold px-1 rounded w-6 mb-5 mt-5 mr-5 ml-auto"
                  onClick={() => {
                    deleteNote(note.ID);
                  }}
                >

                <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fill-rule="nonzero"/></svg>
                </button>

                
         
            </div>
            </form>
          )}
          
        </div>
      </div>
    </>
  )
  }
}

