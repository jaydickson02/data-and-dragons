import 'font-awesome/css/font-awesome.min.css';
import { FaSpinner } from 'react-icons/fa';

export default function Example() {
    return (
      <div class="dark:bg-gray-800 h-screen">
        <main className="grid min-h-full place-items-center bg-white dark:bg-gray-700 px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center mb-64">
            <p className="text-base font-semibold text-indigo-600 dark:text-indigo-300">200</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">Loading</h1>
            <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">We are getting everything ready!</p>
            <div class="flex items-center justify-center mt-10 dark:text-gray-100">
                <FaSpinner class ="fa-spin" />
            </div>
           
          </div>
        </main>
      </div>
    )
  }
  