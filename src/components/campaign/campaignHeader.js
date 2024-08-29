import Navigation from "@/components/Navigation/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFile } from '@fortawesome/free-regular-svg-icons';
import { HiOutlineDocumentText, HiOutlineUserCircle } from 'react-icons/hi2';

const CampaignHeader = ({ campaign, activeTab, setActiveTab, setSelectedTag, selectedTag }) => (
    <div className="flex flex-col pt-4 space-y-4">
        {/* Campaign Name */}
        <div className="flex flex-row px-4 text-center">
        <Navigation />
            <h2 className="text-sm md:text-lg text-gray-100 dark:text-gray-100">
                {campaign.Name}
            </h2>
        </div>
        {/* Sidebar Buttons */}
        <div className="flex flex-col px-2">
        <button
                className={`flex flex-row px-4 py-1 text-left w-full rounded-md border-gray-300 dark:border-gray-700 focus:outline-none ${activeTab === 'notes' && !selectedTag ? 'bg-slate-600 text-gray-100 dark:text-gray-100' : '  text-gray-100 dark:text-gray-100'}`}
                onClick={() => {
                setActiveTab('notes')
                setSelectedTag(null)
                }}
            >
                <HiOutlineDocumentText className="my-auto h-5 w-5"/> <div className="ml-2 text-sm">Notes</div>
            </button>
            <button
                className={`flex flex-row px-4 py-1 text-left w-full rounded-md border-gray-300 dark:border-gray-700 focus:outline-none ${activeTab === 'characters' ? 'bg-slate-600 text-gray-100 dark:text-gray-100' : ' text-gray-100 dark:text-gray-100'}`}
                onClick={() => setActiveTab('characters')}
            >
                <HiOutlineUserCircle className="my-auto h-5 w-5"/><div className="ml-2 text-sm">Characters</div>
            </button>
        </div>
    </div>
);

export default CampaignHeader;