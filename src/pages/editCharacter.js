import { useState } from 'react';
import Layout from '../components/layout';
import Alert from '../components/elements/alert';
import Navigation from '@/components/Navigation/navigation';
import { useEffect } from 'react';

import 'font-awesome/css/font-awesome.min.css';
import { FaSpinner } from 'react-icons/fa';

import { useRouter } from 'next/router';
import executeQuery from '../lib/db';

export default function AddCharacter({character}) {

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

  const router = useRouter();

  // Get the query
  const {CampaignID} = router.query;

  
  const deleteCharacter = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const data = {
        id: character[0].ID
    };

    // Check that required fields are not empty.
    if (!data.id) {

    // Set the notice message to display.
    openAlert('red', 'Missing required fields.', 'Error');
    return;

    }

    //Delete the character from the database

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = '/api/deleteCharacter';

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

    //Set the loading state to true
    setIsLoading(true);

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();

    if(parseInt(result.affectedRows) == 0) {
        // Set the notice message to display.
        openAlert('red', 'There was an error deleting the character.', 'Error');
        setIsLoading(false);
        return;
    }
    
    if (parseInt(result.affectedRows) >= 1) {
        // Redirect to the campaign page with the campaign ID as a get parameter
        openAlert('gray', 'Character Deleted.', 'Success');
        router.push(`/campaign?ID=${CampaignID}`);
    }
}



  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const data = {
      name: event.target.name.value,
      class: event.target.class.value,
      background: event.target.background.value,
      campaignID: CampaignID,
      characterType: event.target.characterType.value,
      image: event.target.image.value,
      playerName: event.target.playerName.value,
      affiliation: event.target.affiliation.value,
      location: event.target.location.value,
      alignment: event.target.alignment.value,
      level: event.target.level.value,
      race: event.target.race.value,
      status: event.target.status.value,
      id: character[0].ID
    };

    // Check that required fields are not empty.
    if (!data.name || !data.campaignID || !data.id) {

        // Set the notice message to display.
        openAlert('red', 'Missing required fields.', 'Error');
        return;

    }

    //Set Defaults

    if (!data.class) {
        data.class = "None";
    }

    if (!data.background) {
        data.background = "None";
    }

    if (!data.image) {
        data.image = "dice-black.png";
    }

    if (!data.playerName) {
        data.playerName = "DM";
    }

    if (!data.affiliation) {
        data.affiliation = "None";
    }

    if (!data.location) {
        data.location = "None";
    }

    if (!data.race) {
        data.race = "None";
    }

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = '/api/updateCharacter';

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

    //Set the loading state to true
    setIsLoading(true);

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();

    if(parseInt(result.affectedRows) == 0) {

        openAlert('red', 'There was an error updating the character.', 'Error');
        setIsLoading(false);
    }

    // Set the notice message to display.
    if (parseInt(result.affectedRows) >= 1) {
        
        openAlert('gray', 'Character Updated.', 'Success');
        // Redirect to the campaign page with the campaign ID as a get parameter
        router.push(`/campaign?ID=${CampaignID}`);
    }
  };
  
  useEffect(() => {
    //Set the inputs in the form to default values

    let values = character[0];

    if(!values.Player) {
        values.Player = "NPC";
    } else {
        values.Player = "Player";
    }

    document.getElementById("name").value = values.Name;
    document.getElementById("class").value = values.Class;
    document.getElementById("background").value = values.Background;
    document.getElementById("characterType").value = values.Player;
    document.getElementById("image").value = values.Image;
    document.getElementById("playerName").value = values.PlayerName;
    document.getElementById("affiliation").value = values.Affiliation;
    document.getElementById("location").value = values.Location;
    document.getElementById("alignment").value = values.Alignment;
    document.getElementById("level").value = values.Level;
    document.getElementById("race").value = values.Race;
    document.getElementById("status").value = values.Status;
 

  }, []);   // <-- empty dependency array

  return (
    <Layout>
    <Navigation />
    <div class="px-4 sm:px-6">
      {showNotice && (<Alert colour={noticeColour} title={noticeTitle} message={noticeMessage} show={openAlert}/>)}
    </div>
      <form class="px-4 py-5 sm:px-6" id="updateCharacterForm" onSubmit={handleSubmit}>
      <div class="space-y-12">
                <div class="border-b rounded-lg border-gray-900/10 pb-12 pl-5 pr-5 pt-5 dark:bg-gray-800">
                <h2 class="text-base font-semibold leading-7 text-gray-900 dark:text-gray-200">Edit Character</h2>
                <p class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-100">Update information for this character.</p>


                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-4">
                        <label for="name" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Name</label>
                        <div class="mt-2">
                            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                            <input type="text" name="name" id="name" autocomplete="name" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-gray-100" placeholder="Demon Lord - Destroyer of All"></input>
                            </div>
                        </div>
                    </div>

                    <div class="sm:col-span-4">
                        <label for="image" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Image</label>
                        <div class="mt-2">
                            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                            <input type="text" name="image" id="image" autocomplete="image" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-gray-100" placeholder="www.imagehost.com/image"></input>
                            </div>
                        </div>
                    </div>

                    <div class="col-span-full">
                        <label for="background" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Background</label>
                        <div class="mt-2">
                            <textarea id="background" name="background" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-gray-100" placeholder="Once upon a time..."></textarea>
                        </div>
                        <p class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-500">Outline the Characters Background.</p>
                    </div>

                    
                </div>
                </div>

                <div class="rounded-lg border-b border-gray-900/10 pb-12 dark:bg-gray-800 pl-5 pr-5 pt-5">
                <h2 class="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">Details</h2>
                <p class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-100">Update the specifics of the Character.</p>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-2">
                    <label for="class" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Class</label>
                    <div class="mt-2">
                        <input type="text" name="class" id="class" autocomplete="class" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-gray-100" placeholder="Wizard"></input>
                    </div>
                    </div>

                    <div class="sm:col-span-2">
                    <label for="race" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Race</label>
                    <div class="mt-2">
                        <input type="text" name="race" id="race" autocomplete="race" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-gray-100" placeholder='Human. Probably.'></input>
                    </div>
                    </div>

                    <div class="col-span-2">
                    <label for="playerName" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Player Name</label>
                    <div class="mt-2">
                        <input type="text" name="playerName" id="playerName" autocomplete="playerName" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-gray-100" placeholder="Mike Wheeler"></input>
                    </div>
                    </div>



                    <div class="sm:col-span-2">
                    <label for="characterType" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Character Type</label>
                    <div class="mt-2">
                        <select id="characterType" name="characterType" autocomplete="characterType" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-s sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-gray-100">
                        <option>NPC</option>
                        <option>Player</option>
                        </select>
                    </div>
                    </div>

                    <div class="sm:col-span-2">
                    <label for="alignment" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Alignment</label>
                    <div class="mt-2">
                        <select id="alignment" name="alignment" autocomplete="alignment" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-s sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-gray-100">
                        <option>Lawful Good</option>
                        <option>Lawful Neutral</option>
                        <option>Lawful Evil</option>
                        <option>Neutral Good</option>
                        <option>True Neutral</option>
                        <option>Neutral Evil</option>
                        <option>Chaotic Good</option>
                        <option>Chaotic Neutral</option>
                        <option>Chaotic Evil</option>
                        </select>
                    </div>
                    </div>

                    <div class="sm:col-span-2">
                    <label for="status" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Status</label>
                    <div class="mt-2">
                        <select id="status" name="status" autocomplete="status" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-s sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-gray-100">
                        <option>Alive</option>
                        <option>Dead</option>
                        <option>Missing</option>
                        <option>Captured</option>
                        <option>Unknown</option>
                        </select>
                    </div>
                    </div>

                    <div class="sm:col-span-2">
                    <label for="location" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Location</label>
                    <div class="mt-2">
                        <input type="text" name="location" id="location" autocomplete="location" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-gray-100" placeholder='Surrounded by giant spiders'></input>
                    </div>
                    </div>

                    <div class="sm:col-span-2">
                    <label for="affiliation" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Affiliation</label>
                    <div class="mt-2">
                        <input type="text" name="affiliation" id="affiliation" autocomplete="affiliation" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-gray-100" placeholder='The Whitest Knights'></input>
                    </div>
                    </div>

                    <div class="sm:col-span-2">
                    <label for="level" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">level</label>
                    <div class="mt-2">
                        <select id="level" name="level" autocomplete="level" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-s sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-gray-100">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option> 
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                        <option>16</option>
                        <option>17</option>
                        <option>18</option>
                        <option>19</option>
                        <option>20</option> 
                        </select>
                    </div>
                    </div> 

                </div>
                </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
                {isLoading && (
                    <FaSpinner class ="fa-spin" />
                )}
                <button type="submit" class="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600" onClick={deleteCharacter}>Delete</button>
                <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update</button>
            </div>
      </form>
    </Layout>
  );
}

//Get initial props
export async function getServerSideProps({ query }) {
    const { ID } = query;

    const character = await executeQuery({
            query: 'SELECT * FROM Characters WHERE id = ?',
            values: [ID],
        });

    
    return {
        props: {
        character,
        },
    };
    }