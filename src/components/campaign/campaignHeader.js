import Navigation from "@/components/Navigation/navigation";
import { FaUser, FaFile } from 'react-icons/fa';

const CampaignHeader = ({ campaign, activeTab, setActiveTab }) => (
    <div className="w-full h-full flex flex-col">
        {/* Navigation */}
        {/* <div className="p-6">
            <Navigation />
        </div> */}

        {/* Campaign Name */}
        <div className="px-4 py-6 text-center">
            <h2 className="md:text-xl text-xl leading-6 font-medium text-gray-100 dark:text-gray-100">
                {campaign.Name}
            </h2>
        </div>

        {/* Cover Image */}
        {/* <div
            className="h-20 bg-cover bg-center mb-5"
            style={{
                backgroundImage: `url(${campaign.CoverImage})`,
            }}
        ></div> */}

        {/* Sidebar Buttons */}
        <div className="flex flex-col mx-2">
            <button
                className={`flex flex-row px-4 py-1 text-left w-full rounded-md border-gray-300 dark:border-gray-700 focus:outline-none ${activeTab === 'characters' ? 'bg-slate-600 text-gray-100 dark:text-gray-100' : ' text-gray-100 dark:text-gray-100'}`}
                onClick={() => setActiveTab('characters')}
            >
                <FaUser size={10} className="my-auto"/> <div className="ml-2">Characters</div>
            </button>
            <button
                className={`flex flex-row px-4 py-1 text-left w-full rounded-md border-gray-300 dark:border-gray-700 focus:outline-none ${activeTab === 'notes' ? 'bg-slate-600 text-gray-100 dark:text-gray-100' : '  text-gray-100 dark:text-gray-100'}`}
                onClick={() => setActiveTab('notes')}
            >
                <FaFile size={10} className="my-auto"/> <div className="ml-2">Notes</div>
            </button>
        </div>
    </div>
);

export default CampaignHeader;