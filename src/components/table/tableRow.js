import { useState } from 'react';
import Link from 'next/link';

import 'font-awesome/css/font-awesome.min.css';
import { FaEdit, FaSpinner } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';


function tableRow({ row }){
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <>
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                <th class="flex gap-6 px-6 py-2 font-normal text-gray-900 items-center">
                    <div class="h-16 w-16">
                        <img
                            class="h-full w-full rounded-full object-cover object-center"
                            src={row.Image}
                            alt=""
                        />
                    </div>
                    <div class="text-sm">
                        <div class="font-medium text-gray-700 dark:text-gray-100">{row.Name}</div>
                        <div class="text-gray-400 dark:text-gray-300">{row.Player ? row.PlayerName : "NPC"}</div>
                    </div>
                </th>
                <td class="px-6 py-2 text-center justify-center">
                    <span
                        class="inline-flex items-center gap-1 rounded-full bg-green-50 dark:bg-green-500 px-2 py-1 text-xs font-semibold text-green-600 dark:text-green-900"
                    >
                        
                        {row.Class}
                    </span>
                </td>
                <td class="px-6 py-2 text-center justify-center">
                        <span
                            class="inline-flex items-center gap-1 rounded-full bg-yellow-50 dark:bg-yellow-500 px-2 py-1 text-xs font-semibold text-yellow-600 dark:text-yellow-900"
                        >
                            {row.Race}
                        </span>
                    
                    </td>
                
                <td class="px-6 py-2">
                    <div class="flex gap-2 text-center justify-center">
                    <span
                            class="inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-500 px-2 py-1 text-xs font-semibold text-blue-600 dark:text-blue-900"
                        >
                            {row.Status}
                        </span>
                        <span
                            class="inline-flex items-center gap-1 rounded-full bg-indigo-50 dark:bg-indigo-500 px-2 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-900"
                        >
                            {row.Location}
                        </span>
                        <span
                            class="inline-flex items-center gap-1 rounded-full bg-violet-50 dark:bg-violet-500 px-2 py-1 text-xs font-semibold text-violet-600 dark:text-violet-900"
                        >
                            {row.Affiliation}
                        </span>
                        
                    </div>
                </td>
               

                <td class="px-6 py-2">
                                
                        <div class="flex gap-2 text-center justify-center">
                            <span
                                class="inline-flex items-center gap-1 rounded-full bg-pink-50 dark:bg-pink-500 px-2 py-1 text-xs font-semibold text-pink-600 dark:text-pink-900"
                            >
                                {row.Alignment}
                            </span>
                            <span
                                class="inline-flex items-center gap-1 rounded-full bg-orange-50 dark:bg-orange-500 px-2 py-1 text-xs font-semibold text-orange-600 dark:text-orange-900"
                            >
                                Level {row.Level}
                            </span>
                        </div>

                </td>

               

                <td class="px-6 py-2">
                    <div class="flex gap-2 items-center justify-center">
                        <button class="inline-flex bg-white-500 hover:bg-gray-100 text-black dark:text-gray-400  font-bold px-1 rounded">
                            <Link href={{ pathname: '/editCharacter', query: {"ID": row.ID, "CampaignID": row.CampaignID} }}>
                                <FaEdit class="fa" size={20}/>                 
                            </Link>
                        </button>

                        <button class="inline-flex bg-white-500 hover:bg-gray-100 text-black dark:text-gray-400  font-bold px-1 rounded" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                            <BsThreeDots class="fa" size={20}/>
                        </button>
                    </div>
                </td>
                                                  
            </tr>
            <tr>
            {isDrawerOpen && (
                        <>
                            <td class="px-6 py-4" colspan="6">
                                <div class="max-w-6xl max-h-sm overflow-scroll dark:text-gray-100">
                                    <h1><strong>Background</strong></h1>
                                    {row.Background}
                                </div>
                            </td>
                        </>
                    )}
            </tr>
        </>
    )

}

export default tableRow;