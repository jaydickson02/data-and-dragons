import Link from 'next/link'
import TableRow from './tableRow';

export default function Table(props) {

    return (
        <div class="overflow-auto rounded-lg border border-gray-200 shadow-md m-5">
            <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Name</th>
                        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Class</th>
                        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Race</th>
                        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Status / Location / Affiliation</th>
                        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Alignment / Level</th> 
                        <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 border-t border-gray-100">

                    {
                    props.data.map((rowData) => (
                        <TableRow key={rowData.ID} row={rowData} />
                    ))
                    }

                    <tr>
                        <td class="px-4 py-5 sm:px-6">
                    
                            <div class="flex">
                            <Link href={{ pathname: '/AddCharacter', query: {"CampaignID": props.data[0].CampaignID} }}>

                                <button type="button" class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                                Add Character
                                </button>
                    
                            </Link>
                            </div>
                    
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
