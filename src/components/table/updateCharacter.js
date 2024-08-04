// components/table/UpdateCharacter.js

import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

const UpdateCharacter = ({ row, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        Name: row.Name,
        Class: row.Class,
        Background: row.Background,
        CampaignID: row.CampaignID,
        characterType: row.Player ? 'Player' : 'NPC',
        Image: row.Image,
        PlayerName: row.PlayerName,
        Affiliation: row.Affiliation,
        Location: row.Location,
        Alignment: row.Alignment,
        Level: row.Level,
        Race: row.Race,
        Status: row.Status,
        ID: row.ID,
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log('Updating character: ', formData);
        console.log('Row data: ', row);
        if (!formData.Name || !formData.ID || !row.CampaignID) {
            alert('Missing required fields.');

            //Which fields are missing?
            if (!formData.Name) console.log('Name is missing');
            if (!formData.ID) console.log('ID is missing');
            if (!row.CampaignID) console.log('CampaignID is missing');

            return;
        }
        const JSONdata = JSON.stringify(formData);
        const endpoint = '/api/updateCharacter';
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSONdata,
        };

        setIsLoading(true);
        const response = await fetch(endpoint, options);
        const result = await response.json();
        if (parseInt(result.affectedRows) >= 1) {
            alert('Character Updated.');
            onUpdate({
                ...formData,
                Name: formData.Name,
                Class: formData.Class,
                Background: formData.Background,
                CampaignID: row.CampaignID,
                Player: formData.characterType === 'Player',
                Image: formData.Image,
                PlayerName: formData.PlayerName,
                Affiliation: formData.Affiliation,
                Location: formData.Location,
                Alignment: formData.Alignment,
                Level: formData.Level,
                Race: formData.Race,
                Status: formData.Status,
                ID: formData.ID,
            });
            onClose();
        } else {
            alert('There was an error updating the character.');
        }
        setIsLoading(false);
    };


    return (
        <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label className="font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input
                        type="text"
                        name="Name"
                        value={formData.Name}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-1.5 px-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Name"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-medium text-gray-700 dark:text-gray-300">Class</label>
                    <input
                        type="text"
                        name="Class"
                        value={formData.Class}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-1.5 px-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Class"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-medium text-gray-700 dark:text-gray-300">Race</label>
                    <input
                        type="text"
                        name="Race"
                        value={formData.Race}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-1.5 px-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Race"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-medium text-gray-700 dark:text-gray-300">Player Name</label>
                    <input
                        type="text"
                        name="PlayerName"
                        value={formData.PlayerName}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-1.5 px-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Player Name"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-medium text-gray-700 dark:text-gray-300">Character Type</label>
                    <select
                        name="characterType"
                        value={formData.characterType}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-1.5 px-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="NPC">NPC</option>
                        <option value="Player">Player</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="font-medium text-gray-700 dark:text-gray-300">Status</label>
                    <select
                        name="Status"
                        value={formData.Status}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-1.5 px-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="Alive">Alive</option>
                        <option value="Dead">Dead</option>
                        <option value="Missing">Missing</option>
                        <option value="Captured">Captured</option>
                        <option value="Unknown">Unknown</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="font-medium text-gray-700 dark:text-gray-300">Location</label>
                    <input
                        type="text"
                        name="Location"
                        value={formData.Location}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-1.5 px-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Location"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-medium text-gray-700 dark:text-gray-300">Affiliation</label>
                    <input
                        type="text"
                        name="Affiliation"
                        value={formData.Affiliation}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-1.5 px-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Affiliation"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-medium text-gray-700 dark:text-gray-300">Alignment</label>
                    <select
                        name="Alignment"
                        value={formData.Alignment}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-1.5 px-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="Lawful Good">Lawful Good</option>
                        <option value="Lawful Neutral">Lawful Neutral</option>
                        <option value="Lawful Evil">Lawful Evil</option>
                        <option value="Neutral Good">Neutral Good</option>
                        <option value="True Neutral">True Neutral</option>
                        <option value="Neutral Evil">Neutral Evil</option>
                        <option value="Chaotic Good">Chaotic Good</option>
                        <option value="Chaotic Neutral">Chaotic Neutral</option>
                        <option value="Chaotic Evil">Chaotic Evil</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="font-medium text-gray-700 dark:text-gray-300">Level</label>
                    <select
                        name="Level"
                        value={formData.Level}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-1.5 px-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {Array.from({ length: 20 }, (_, i) => (
                            <option key={i} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col col-span-2">
                    <label className="font-medium text-gray-700 dark:text-gray-300">Image URL</label>
                    <input
                        type="text"
                        name="Image"
                        value={formData.Image}
                        onChange={handleChange}
                        className="block w-full rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-1.5 px-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Image URL"
                    />
                </div>
                <div className="flex flex-col col-span-2">
                    <label className="font-medium text-gray-700 dark:text-gray-300">Background</label>
                    <textarea
                        name="Background"
                        value={formData.Background}
                        onChange={handleChange}
                        rows="4"
                        className="block w-full rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-1.5 px-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Background"
                    />
                </div>
            </div>
            <div className="flex items-center justify-end space-x-2">
                <button
                    type="button"
                    className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-1 rounded transition ease-in-out duration-150"
                    onClick={onClose}
                    >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="inline-flex items-center bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-3 py-1 rounded transition ease-in-out duration-150"
                    >
                    {isLoading ? <FaSpinner className="animate-spin" /> : 'Save'}
                </button>
            </div>
        </form>
                    
                    
        )
        }

        export default UpdateCharacter;