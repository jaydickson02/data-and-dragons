import 'font-awesome/css/font-awesome.min.css';
import { FaSpinner } from 'react-icons/fa';

export default function Example() {
    return (
      <>
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">200</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Loading</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">We are getting everything ready!</p>
            <div class="flex items-center">
                <FaSpinner class ="fa-spin" />
            </div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
            </div>
          </div>
        </main>
      </>
    )
  }
  