import { useRouter } from 'next/router';

export default function Navigation() {

    const router = useRouter();
      
    function handleClick() {
      router.back();
    }

    return (
        <div class=" px-6">
    <button
      onClick={handleClick}
      class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
    >
      Back
    </button>
    </div>
    )
}
