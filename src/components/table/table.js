import Link from 'next/link';
import ListRow from '@/components/table/listRow';
import { useState } from 'react';
import { PostToDB } from '@/lib/DBUtils/PostCalls';
import { FaPlus, FaUser, FaFile, FaFilter } from 'react-icons/fa';

export default function Table({ characters, showAlert, campaignID, setCharacters}) {

    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = characters.data.filter(row => 
        (row.Name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (row.Class?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (row.Race?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (row.Status?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (row.Location?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (row.Affiliation?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (row.Alignment?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    );

    const updateCharacter = (character) => {
        let updatedCharacters = {
            data: characters.data.map(existingCharacter => 
                existingCharacter.ID === character.ID 
                    ? {
                        ...existingCharacter,
                        Name: character.Name,
                        Class: character.Class,
                        Background: character.Background,
                        CampaignID: character.CampaignID,
                        Player: character.characterType === "Player" ? 1 : 0,
                        Image: character.Image,
                        PlayerName: character.PlayerName,
                        Affiliation: character.Affiliation,
                        Location: character.Location,
                        Alignment: character.Alignment,
                        Level: character.Level,
                        Race: character.Race,
                        Status: character.Status,
                    } 
                    : existingCharacter
            )
        };
        setCharacters(updatedCharacters);
    };

    const addNewCharacter = async () => {
    
        const data = {
            name: "John Doe",
            class: "Wizard",
            background: "What is my story?",
            campaignID: campaignID,
            characterType: "NPC",
            image: "https://www.gravatar.com/avatar/",
            playerName: "Matt Mercer",
            affiliation: "The Mighty Nein",
            location: "Wildemount",
            alignment: "Chaotic Good",
            level: 20,
            race: "Human",
            status: "Alive",
        };
    
        // Send the data to the API route.
        PostToDB("/api/add/character", data)
        .then((result) => {
            // If successful, show an alert.
            showAlert('gray', 'Character added successfully.', 'Success')
            
            // Update the characters state.
            let updatedCharacters = {
                data:[...characters.data, { 
                    ID: result.data.insertId,
                    Name: data.name,
                    Class: data.class,
                    Background: data.background,
                    CampaignID: data.campaignID,
                    Player: data.characterType === "Player" ? 1 : 0,
                    Image: data.image,
                    PlayerName: data.playerName,
                    Affiliation: data.affiliation,
                    Location: data.location,
                    Alignment: data.alignment,
                    Level: data.level,
                    Race: data.race,
                    Status: data.status,
                }]};
            setCharacters(updatedCharacters);
    
          })
          .catch((error) => {
            console.error(error);
    
            // If there was an error, show an alert.
            showAlert('red', 'There was an error adding the character.', 'Error')
          });
    
      };

    if(characters.data.length === 0) {
        return (
            <div className="border rounded-xl  dark:border-0 dark:bg-gray-800 shadow mt-5 p-4">
                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 mr-4 rounded-md border border-gray-300 dark:border-gray-700"
                    />
                    
                    <button onClick={addNewCharacter} type="button" className="inline-flex items-center px-3 py-3 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                        <FaPlus/>
                    </button>
                
                </div>
                <div className="text-center">
                    <p className="text-gray-500 dark:text-gray-400">No characters found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className=" dark:bg-gray-800 p-4">
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search characters..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 mr-4 text-gray-800 bg-white dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-300 rounded"
                    
                />
                <button onClick={addNewCharacter} type="button" className="inline-flex items-center px-5 py-1 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                <FaPlus/>
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredData.map((rowData) => (
                    <ListRow key={rowData.ID} characterData={rowData} updateCharacter={updateCharacter} showAlert={showAlert}/>
                ))}
            </div>
        </div>
    );
}