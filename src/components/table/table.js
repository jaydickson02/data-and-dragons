import Link from 'next/link';
import ListRow from '@/components/table/listRow';
import { useState } from 'react';

export default function Table({ data }) {
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

    return (
        <div className="border rounded-xl border-gray-200 dark:border-gray-900 bg-gray-200 dark:bg-gray-900 shadow-md mt-5 p-4">
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 mr-4 rounded-md border border-gray-300 dark:border-gray-700"
                />
                <Link href={{ pathname: '/AddCharacter', query: { "CampaignID": data[0].CampaignID } }}>
                    <button type="button" className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                        Add Character
                    </button>
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredData.map((rowData) => (
                    <ListRow key={rowData.ID} row={rowData}/>
                ))}
            </div>
        </div>
    );
}