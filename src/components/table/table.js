import Link from 'next/link';
import ListRow from '@/components/table/listRow';
import { useState } from 'react';
import { PostToDB } from '@/lib/DBUtils/PostCalls';

export default function Table({ data, showAlert, campaignID}) {

    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = data.filter(row => 
        (row.Name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (row.Class?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (row.Race?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (row.Status?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (row.Location?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (row.Affiliation?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (row.Alignment?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    );

    const addNewCharacter = async () => {
    
        const data = {
            name: "John Doe",
            class: "Wizard",
            background: "What is my story?",
            campaignID: campaignID,
            characterType: 0,
            image: "https://www.gravatar.com/avatar/",
            playerName: "Matt Mercer",
            affiliation: "The Mighty Nein",
            location: "Wildemount",
            alignment: "Chaotic Good",
            level: 20,
            race: "Human",
            status: "Alive",
        };
    
        // setIsLoading(true);
    
        // Send the data to the API route.
        PostToDB("/api/add/character", data)
        .then((result) => {
            // If successful, show an alert.
            showAlert('gray', 'Character added successfully.', 'Success')
    
            // Set loading to false.
            // setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
    
            // Set loading to false.
            // setIsLoading(false);
    
            // If there was an error, show an alert.
            showAlert('red', 'There was an error adding the character.', 'Error')
          });
    
      };

    if(data.length === 0) {
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
                    
                    <button onClick={addNewCharacter} type="button" className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                        Add Character
                    </button>
                
                </div>
                <div className="text-center">
                    <p className="text-gray-500 dark:text-gray-400">No characters found.</p>
                </div>
            </div>
        );
    }

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
                <button onClick={addNewCharacter} type="button" className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                        Add Character
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredData.map((rowData) => (
                    <ListRow key={rowData.ID} row={rowData} showAlert={showAlert}/>
                ))}
            </div>
        </div>
    );
}