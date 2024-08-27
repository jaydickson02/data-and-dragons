import Table from '@/components/table/table';
import SkeletonLoader from '@components/elements/skeletonLoader';

export default function CampaignCharacters({ campaignID, characters, isLoading, loadingError, setCharacters, openAlert }) {

  if (isLoading) {
    return (
    <div>
        <div className="flex justify-between items-center px-4 py-5 sm:px-6 mb-5 mt-5 shadow rounded-lg bg-gray-100 dark:bg-gray-900">
        <SkeletonLoader width="w-full" height="h-16" />
      </div>
    <div className="border rounded-xl  dark:border-0 dark:bg-gray-800 shadow mt-5 p-4">
        <div className="flex justify-between mb-4">
        <SkeletonLoader width="w-full" height="h-16 mb-4" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SkeletonLoader width="w-full" height="h-32 mb-4" />
            <SkeletonLoader width="w-full" height="h-32 mb-4" />
        </div>
    </div>
    </div>
    );
  }

  // Handle error state
  if (loadingError) {
    return (
      <div className="px-4 py-5 sm:px-6 mb-5 mt-5 shadow rounded-lg bg-gray-100 dark:bg-gray-900">
        <h3 className="text-lg leading-6 font-medium text-red-600 dark:text-red-400">
          Characters failed to load
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-red-500 dark:text-red-400">
          {loadingError}
        </p>
      </div>
    );
  }

  return (
    <div className='px-4'>
      {/* <div className="px-4 py-5 sm:px-6 mb-5 mt-5 shadow rounded-lg bg-gray-100 dark:bg-gray-900">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
          Characters
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-100">
          All characters in the campaign.
        </p>
      </div> */}
      <Table characters={characters} setCharacters={setCharacters} campaignID={campaignID} showAlert={openAlert} />
    </div>
  );
}
