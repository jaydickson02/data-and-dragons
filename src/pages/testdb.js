import executeQuery from '../../lib/db';
import Link from 'next/link';
import Navbar from '@/components/navbar';

export default function testDB({ characters }) {
  return (
    //Add a shadow and size the box to a max width

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <Navbar />
    
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Characters
      </h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">
        All characters in the campaign.
      </p>
    </div>

    <div class="px-4 py-5 sm:px-6">

      <ul role="list" class="divide-y divide-gray-100">
      {characters.map((character) => (
        <li class="flex justify-between gap-x-6 py-5">
          <div class="flex gap-x-4">
            <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src={character.Image} alt=""></img>
            <div class="min-w-0 flex-auto">
              <p class="text-sm font-semibold leading-6 text-gray-900">{character.Name}</p>
              <p class="mt-1 truncate text-xs leading-5 text-gray-500">N/A</p>
            </div>
          </div>
          <div class="hidden sm:flex sm:flex-col sm:items-end">
            <p class="text-sm leading-6 text-gray-900">{ character.Player ? character.PlayerName : "NPC" }</p>
            <p class="mt-1 text-xs leading-5 text-gray-500">{character.Class}</p>

            <Link href={{ pathname: '/character', query: {"ID": character.ID} }}>
              <button type="button" class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                View
              </button>
            </Link>
            
       
          </div>
        </li>
      ))}
      </ul>

    </div>
    
    </div>

  );
}

export async function getServerSideProps() {
  const characters = await executeQuery({
    query: 'SELECT * FROM Characters',
    values: [],
  });

  return { props: {characters} };
}
