import Link from 'next/link'
import Image from 'next/image'

export default function Card(props) {

    return(
<div class="max-w-2xl w-full mx-auto">
    
    <div class="bg-white shadow-md border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <Link href={props.link}>
            <Image class="rounded-t-lg" src={props.image} width={1000} height={1000}  alt=""></Image>
        </Link>
        <div class="p-5">
            <Link href={props.link}>
                <h5 id="CardContent" class="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">{props.title}</h5>
            </Link>
            <p class="font-normal text-gray-700 mb-3 dark:text-gray-400 h-64 overflow-auto">{props.description}</p>
            <Link href={props.link} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                View
                <svg class="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </Link>
        </div>
    </div>
    </div>
    )
    }
