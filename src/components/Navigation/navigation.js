import { useRouter } from 'next/router';
import { HiOutlineChevronLeft } from 'react-icons/hi2';

export default function Navigation() {
    const router = useRouter();

    function handleClick() {
        router.back();
    }

    return (
        <button
            onClick={handleClick}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-white hover:bg-slate-600 focus:outline-none active:bg-slate-600 transition ease-in-out"
        >
            <HiOutlineChevronLeft />
        </button>
    );
}