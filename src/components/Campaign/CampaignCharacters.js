import Table from "@/components/table/table";

const CampaignCharacters = ({ characters, openAlert }) => (
    <>
        <div className="px-4 py-5 sm:px-6 mb-5 mt-5 shadow rounded-lg bg-gray-100 dark:bg-gray-900">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                Characters
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-100">
                All characters in the campaign.
            </p>
        </div>
        <Table data={characters.data} showAlert={openAlert} />
    </>
);

export default CampaignCharacters;