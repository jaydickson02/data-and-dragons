import Link from 'next/link'
import TableRow from './tableRow';

export default function Table(props) {

    return (

<div class="border border-gray-200 dark:border-gray-900 bg-gray-200 dark:bg-gray-900 shadow-md mt-5">
  
  <div class="max-h-96 overflow-y-scroll w-full">
    <table class="w-full border-collapse text-left text-sm text-gray-500 bg-white dark:bg-gray-800">
        <thead class="divide-y divide-gray-100 border-t border-gray-100 dark:border-gray-800 dark:divide-gray-900 dark:bg-gray-900 bg-gray-200 sticky top-0">
        <tr class="text-gray-900 dark:text-gray-100 text-center">
            <th scope="col" class="px-6 py-4 font-medium">Name</th>
            <th scope="col" class="px-6 py-4 font-medium">Class</th>
            <th scope="col" class="px-6 py-4 font-medium">Race</th>
            <th scope="col" class="px-6 py-4 font-medium">Status | Location | Affiliation</th>
            <th scope="col" class="px-6 py-4 font-medium">Alignment | Level</th> 
            <th scope="col" class="px-6 py-4 font-medium">Options</th>
        </tr>
        </thead>

        <tbody class="overflow-y-hidden divide-y divide-gray-100 border-t border-gray-100 dark:border-gray-800 dark:divide-gray-900 mt-16">
            {props.data.map((rowData) => (
            <TableRow key={rowData.ID} row={rowData} />
            ))}
        </tbody>

    </table>

    
  </div>
  <tfoot>
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
    </tfoot>
</div>

    )
}
