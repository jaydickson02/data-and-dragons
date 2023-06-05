//Footer Component
import Link from 'next/link'

export default function Footer() {

    //Add simple footer
    return (

        //Pin the footer to the bottom of the page
        <footer class="w-full p-4 dark:bg-gray-800 bg-gray-300">
                <p class="text-center text-base text-gray-400">
                    &copy; 2023 Jay Dickson. All rights reserved.
                </p>
        </footer>
    )
}