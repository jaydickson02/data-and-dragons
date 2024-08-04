const CampaignOverview = ({ campaign }) => (
    <>
        <div className="px-4 py-5 sm:px-6 mb-5 mt-5 border shadow dark:border-0 rounded-lg bg-gray-100 dark:bg-gray-900">
            <h3 className="text-lg leading-6 font-medium dark:text-gray-100">
                Overview
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-100">
                Information about the campaign.
            </p>
        </div>
        <div className="dark:bg-gray-800 overflow-hidden border shadow dark:border-0 rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <dl>
                    <dt className="text-sm leading-5 font-medium dark:text-gray-100 truncate">
                        Name
                    </dt>
                    <dd className="mt-1 text-sm leading-5 dark:text-gray-100">
                        {campaign.Name}
                    </dd>
                </dl>
                <dl className="mt-4">
                    <dt className="text-sm leading-5 font-medium dark:text-gray-100 truncate">
                        Dungeon Master
                    </dt>
                    <dd className="mt-1 text-sm leading-5 dark:text-gray-100">
                        {campaign.DM}
                    </dd>
                </dl>
                <dl className="mt-4">
                    <dt className="text-sm leading-5 font-medium dark:text-gray-100 truncate">
                        Description
                    </dt>
                    <dd className="mt-1 text-sm leading-5 dark:text-gray-100">
                        {campaign.Background}
                    </dd>
                </dl>
            </div>
        </div>
    </>
);

export default CampaignOverview;