import Navigation from "@/components/Navigation/navigation";

const CampaignHeader = ({ campaign, activeTab, setActiveTab }) => (
    <div
        className="relative px-4 pb-10 sm:px-6 flex flex-col items-center"
        style={{
            backgroundImage: `url(${campaign.CoverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '1.5rem',
        }}
    >
        <div className="absolute top-0 left-0 p-6">
            <Navigation />
        </div>
        <div className="px-12 py-8 mb-20 mt-20 m-auto shadow rounded-2xl bg-gray-200 dark:bg-gray-900 flex justify-center">
            <h2 className="text-4xl leading-6 font-medium text-gray-900 dark:text-gray-100">
                {campaign.Name}
            </h2>
        </div>
        <div className="flex space-x-2 mt-4">
            <button
                className={`px-4 py-2 focus:outline-none ${activeTab === 'campaign' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'} rounded-full`}
                onClick={() => setActiveTab('campaign')}
            >
                Overview
            </button>
            <button
                className={`px-4 py-2 focus:outline-none ${activeTab === 'characters' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'} rounded-full`}
                onClick={() => setActiveTab('characters')}
            >
                Characters
            </button>
            <button
                className={`px-4 py-2 focus:outline-none ${activeTab === 'notes' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'} rounded-full`}
                onClick={() => setActiveTab('notes')}
            >
                Notes
            </button>
        </div>
    </div>
);

export default CampaignHeader;