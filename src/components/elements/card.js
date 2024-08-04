import Link from 'next/link'
import Image from 'next/image'

export default function Card(props) {
    return (
        <div className="max-w-2xl w-full mx-auto">
            <div className="h-full bg-gray-200 shadow-lg border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="relative w-full h-48">
                    <Image className="rounded-t-lg object-cover" src={"/" + props.image} layout="fill" alt="Campaign Image"></Image>
                </div>
                <div className="p-5">
                    <Link href={props.link}>
                        <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">{props.title}</h5>
                    </Link>
                    <p id="cardContent" className="font-normal text-gray-700 mb-3 dark:text-gray-400 overflow-auto">{props.description}</p>
                    <Link href={props.link} className="text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:focus:ring-blue-800 w-full">
                        <div className="w-full text-center">
                            View
                            <svg className="-mr-1 ml-2 h-4 w-4 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}