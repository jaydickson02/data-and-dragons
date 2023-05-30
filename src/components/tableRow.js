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
                <td class="px-6 py-4 text-center">
                        <span
                            class="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-xs font-semibold text-yellow-600"
                        >
                            {row.Race}
                        </span>
                    
                    </td>
                <td class="px-6 py-4">
                    <div class="flex gap-2 text-center">
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
                                
                        <div class="flex gap-2 text-center">
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
                <button class="bg-white-500 hover:bg-gray-100 text-black font-bold px-1 rounded w-8 mb-5 mt-5 mr-5 ml-auto">
                    <Link href={{ pathname: '/editCharacter', query: {"ID": row.ID, "CampaignID": row.CampaignID} }}>
                    
                    
                    <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.134 19.319 11.587-11.588c.171-.171.279-.423.279-.684 0-.229-.083-.466-.28-.662l-3.115-3.104c-.185-.185-.429-.277-.672-.277s-.486.092-.672.277l-11.606 11.566c-.569 1.763-1.555 4.823-1.626 5.081-.02.075-.029.15-.029.224 0 .461.349.848.765.848.511 0 .991-.189 5.369-1.681zm-3.27-3.342 2.137 2.137-3.168 1.046zm.955-1.166 10.114-10.079 2.335 2.327-10.099 10.101z" fill-rule="nonzero"/></svg>
                        
                    </Link>
                    </button>
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