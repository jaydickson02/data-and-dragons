import { useState } from 'react';
import Link from 'next/link';

function tableRow({ row }){
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <>
            <tr class="hover:bg-gray-50" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                    <div class="relative h-10 w-10">
                        <img
                            class="h-full w-full rounded-full object-cover object-center"
                            src={row.Image}
                            alt=""
                        />
                    </div>
                    <div class="text-sm">
                        <div class="font-medium text-gray-700">{row.Name}</div>
                        <div class="text-gray-400">{row.Player ? row.PlayerName : "NPC"}</div>
                    </div>
                </th>
                <td class="px-6 py-4">
                    <span
                        class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
                    >
                        
                        {row.Class}
                    </span>
                </td>
                <td class="px-6 py-4">
                        <span
                            class="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-xs font-semibold text-yellow-600"
                        >
                            {row.Race}
                        </span>
                    
                    </td>
                <td class="px-6 py-4">
                    <div class="flex gap-2">
                        <span
                            class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                        >
                            {row.Status}
                        </span>
                        <span
                            class="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"
                        >
                            {row.Location}
                        </span>
                        <span
                            class="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600"
                        >
                            {row.Affiliation}
                        </span>
                    </div>
                </td>

                <td class="px-6 py-4">
                                
                        <div class="flex gap-2">
                            <span
                                class="inline-flex items-center gap-1 rounded-full bg-pink-50 px-2 py-1 text-xs font-semibold text-pink-600"
                            >
                                {row.Alignment}
                            </span>
                            <span
                                class="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600"
                            >
                                Level {row.Level}
                            </span>
                        </div>

                </td>

                <td class="px-6 py-4">
                    <Link href={{ pathname: '/editCharacter', query: {"ID": row.ID, "CampaignID": row.CampaignID} }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                    </Link>
                </td>
                                                    
            </tr>
            <tr>
            {isDrawerOpen && (
                        <>
                        
                            <td class="px-6 py-4" colspan="6">
                                <div class="max-w-6xl max-h-sm overflow-scroll">
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