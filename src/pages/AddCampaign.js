
//Create a form to add a new campaign then allow it to run a query to add it to the database
import Layout from "@/components/layout"
import Notice from "@/components/elements/alert"
import { useState } from 'react';
import Navigation from "@/components/Navigation/navigation";
import Alert from "@/components/elements/alert";

import { PostToDB } from "@/lib/DBUtils/PostCalls";

import 'font-awesome/css/font-awesome.min.css';
import { useRouter } from 'next/router';
import { FaSpinner } from 'react-icons/fa';

export default function AddCampaign() {

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

  function clearForm() {
    document.getElementById("newCampaignForm").reset();
  }

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const data = {
      campaignName: event.target.campaignName.value,
      about: event.target.about.value,
      dmName: event.target.dmName.value,
    };

    // Check that all fields are not empty.
    if (!data.campaignName || !data.about || !data.dmName) {

      // Set the notice message to display.
      openAlert('red', 'Missing required fields.', 'Error');
      return;

    }

    // Set the loading state.
    setIsLoading(true);

    // Send a POST request to the API endpoint.
    PostToDB('/api/add/campaign', data)
    .then((result) => {
      
      // Set the notice message to display.
      openAlert('gray', 'New Campaign Added.', 'Success');
      setIsLoading(false);

      // Clear the form.
      clearForm();
    })
    .catch((error) => {
      // Set the notice message to display.
      openAlert('red', 'Error adding campaign.', 'Error');
      setIsLoading(false);
    });

  };


    return(
<Layout>
<Navigation />
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
{showNotice && (<Alert colour={noticeColour} title={noticeTitle} message={noticeMessage} show={openAlert}/>)}
</div>
<div class="sm:px-6">
<form class="rounded-lg max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-5 pl-5 pr-5 mb-10 dark:bg-gray-800" id="newCampaignForm" onSubmit={handleSubmit}>
  <div class="space-y-12">
    <div class="border-b border-gray-900/10 pb-12">
      <h2 class="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">New Campaign</h2>
      <p class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">Add Information for the Campaign.</p>

      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <label for="campaignName" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Campaign Name</label>
          <div class="mt-2">
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
              <input type="text" name="campaignName" id="campaignName" autocomplete="campaignName" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-gray-100" placeholder="The Mighty Dragon Den"></input>
            </div>
          </div>
        </div>

        <div class="sm:col-span-4">
            <label for="dmName" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">DM Name</label>
            <div class="mt-2">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                <input type="text" name="dmName" id="dmName" autocomplete="dmName" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-gray-100" placeholder="Matt Mercer"></input>
                </div>
            </div>
        </div>

        <div class="col-span-full">
          <label for="about" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">About</label>
          <div class="mt-2">
            <textarea id="about" name="about" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-100 dark:bg-gray-800"></textarea>
          </div>
          <p class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">Write a few sentences describing the campaign.</p>
        </div>

        <div class="col-span-full">
          <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Cover photo</label>
          <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div class="text-center">
              <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
              </svg>
              <div class="mt-4 flex text-sm leading-6 text-gray-600">
                <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 dark:text-gray-100 dark:bg-gray-800">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" class="sr-only"></input>
                </label>
                <p class="pl-1 dark:text-gray-100">or drag and drop</p>
              </div>
              <p class="text-xs leading-5 text-gray-600 dark:text-gray-100">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>



  <div class="mt-6 flex items-center justify-end gap-x-6 dark:text-gray-100">
  {isLoading && (
                    <FaSpinner class ="fa-spin" />
                )}
    <button type="button" class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100" onClick={clearForm}>Clear</button>
    <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create</button>
  </div>
</form>
</div>

        </Layout>
    )
}

                    