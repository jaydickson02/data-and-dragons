//Next image
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import 'font-awesome/css/font-awesome.min.css';
import { FaDragon } from 'react-icons/fa';

export default function Navbar(props) {

    const [showMenu, setShowMenu] = useState(false);


return (

//Add padding to the bottom

<div class="pb-4">
        
<div class="min-h-full">
  <nav class="dark:bg-gray-800 bg-gray-200">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <div class="flex-shrink-0 text-gray-800 dark:text-white">
            <FaDragon size={35}/>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              
              <Link href="/" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current={props.activePage}>Campaigns</Link>
              <Link href="/AddCampaign" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current={props.activePage}>Add Campaign</Link>
            </div>
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
        
          <button type="button" class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-controls="mobile-menu" aria-expanded="false" onClick={() => setShowMenu(!showMenu)}>
            <span class="sr-only">Open main menu</span>
         
            <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    {showMenu && (
    <div class="md:hidden" id="mobile-menu">
      <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">

        <a href="/" class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current={props.activePage}>Campaign</a>
        <a href="/AddCampaign" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium" aria-current={props.activePage}>Add Campaign</a>
      </div>
    </div>
    )}
  </nav>

</div>

</div>



  )
}

