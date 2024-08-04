import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Navbar(props) {
    const [showMenu, setShowMenu] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeMediaQuery.matches);
        const handleChange = (e) => setIsDarkMode(e.matches);
        darkModeMediaQuery.addEventListener('change', handleChange);
        return () => darkModeMediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <div className="pt-2">
            <div className="min-h-full">
                <nav className="bg-white dark:bg-gray-700">
                    <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
                        <div className="flex h-12 items-center justify-between border-b border-gray-300 dark:border-gray-300 pb-2">
                            <div className="flex items-center">
                                <Image 
                                    src={isDarkMode ? "/IconWhite.png" : "/Icon.png"} 
                                    alt="Logo" 
                                    width={30} 
                                    height={30} 
                                />
                                <div className="hidden md:block">
                                    <div className="flex items-baseline space-x-4 ml-0">
                                        <Link href="/" passHref>
                                            <span className="text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium" aria-current={props.activePage}>Home</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                <button type="button" className="inline-flex items-center justify-center rounded-md bg-gray-200 dark:bg-gray-800 p-2 text-gray-900 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900" aria-controls="mobile-menu" aria-expanded="false" onClick={() => setShowMenu(!showMenu)}>
                                    <span className="sr-only">Open main menu</span>
                                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                    <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    {showMenu && (
                        <div className="md:hidden" id="mobile-menu">
                            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                <Link href="/" passHref>
                                    <span className="text-gray-900 dark:text-gray-100 block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-300 dark:hover:bg-gray-700" aria-current={props.activePage}>Home</span>
                                </Link>
                                <Link href="/AddCampaign" passHref>
                                    <span className="text-gray-900 dark:text-gray-100 block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-300 dark:hover:bg-gray-700" aria-current={props.activePage}>Add Campaign</span>
                                </Link>
                            </div>
                        </div>
                    )}
                </nav>
            </div>
        </div>
    )
}