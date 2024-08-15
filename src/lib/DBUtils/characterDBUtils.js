import { PostToDB } from '@/lib/DBUtils/PostCalls';
import { DeleteFromDB } from "@/lib/DBUtils/RemoveCalls";

export const updateCharacterInDatabase = async (characterData) => {
    try {
        if (!characterData.Name || !characterData.ID || !characterData.CampaignID) {
            console.error('Missing required character data');
            return;
        }

        // Prepare the data to be sent to the API
        const JSONdata = JSON.stringify({
            Name: characterData.Name,
            Class: characterData.Class,
            Background: characterData.Background,
            CampaignID: characterData.CampaignID,
            characterType: characterData.Player ? 'Player' : 'NPC',
            Image: characterData.Image,
            PlayerName: characterData.PlayerName,
            Affiliation: characterData.Affiliation,
            Location: characterData.Location,
            Alignment: characterData.Alignment,
            Level: characterData.Level,
            Race: characterData.Race,
            Status: characterData.Status,
            ID: characterData.ID
        });

        // Define the API endpoint and options
        const endpoint = '/api/updateCharacter';
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSONdata,
        };

        // Make the API request
        const response = await fetch(endpoint, options);
        const result = await response.json();

        if (parseInt(result.affectedRows) >= 1) {
            console.log('Character updated successfully');
            return { success: true };
        } else {
            console.error('An error occurred while updating the character');
            return { success: false, message: 'Error updating character' };
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return { success: false, message: error.message };
    }
};

export const deleteCharacter = async (characterID, openAlert) => {
    // Stop the form from submitting and refreshing the page.

    // Get data from the form.
    const data = {
        id: characterID
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

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();

    if(parseInt(result.affectedRows) == 0) {
        // Set the notice message to display.
        openAlert('red', 'There was an error deleting the character.', 'Error');
        return;
    }
    
    if (parseInt(result.affectedRows) >= 1) {
        // Redirect to the campaign page with the campaign ID as a get parameter
        openAlert('gray', 'Character Deleted.', 'Success');
    }
}

export const fetchCharacters = async (campaignID, setCharacters, setCharactersAreLoading, setCharactersError, openAlert) => {
    setCharactersAreLoading(true);
    try {
        const charactersRes = await fetch(`/api/get/characters/${campaignID}`);
        if (!charactersRes.ok) throw new Error('Failed to load characters');
        const charactersData = await charactersRes.json();
        setCharacters(charactersData);
    } catch (error) {
        setCharactersError(error.message);
    } finally {
        setCharactersAreLoading(false);
    }
}