import Navigation from "@/components/Navigation/navigation";
import { FaUser, FaFile } from 'react-icons/fa';

const CampaignHeader = ({ campaign, activeTab, setActiveTab, setSelectedTag }) => (
    <div className="flex flex-col pt-4 space-y-4">
        {/* Navigation */}
        {/* <div className="p-6">
            <Navigation />
        </div> */}

        {/* Campaign Name */}
        <div className="flex flex-col px-4 text-center">
            <h2 className="md:text-xl text-xl leading-6 font-medium text-gray-100 dark:text-gray-100">
                {campaign.Name}
            </h2>
        </div>
        {/* Sidebar Buttons */}
        <div className="flex flex-col px-2 text-sm">
            <button
                className={`flex flex-row px-4 py-1 text-left w-full rounded-md border-gray-300 dark:border-gray-700 focus:outline-none ${activeTab === 'characters' ? 'bg-slate-600 text-gray-100 dark:text-gray-100' : ' text-gray-100 dark:text-gray-100'}`}
                onClick={() => setActiveTab('characters')}
            >
                <FaUser className="my-auto"/> <div className="ml-2">Characters</div>
            </button>
            <button
                className={`flex flex-row px-4 py-1 text-left w-full rounded-md border-gray-300 dark:border-gray-700 focus:outline-none ${activeTab === 'notes' ? 'bg-slate-600 text-gray-100 dark:text-gray-100' : '  text-gray-100 dark:text-gray-100'}`}
                onClick={() => {
                setActiveTab('notes')
                setSelectedTag(null)
                }}
            >
                <FaFile className="my-auto"/> <div className="ml-2">Notes</div>
            </button>
        </div>
    </div>
);

export default CampaignHeader;