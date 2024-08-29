import React from 'react';
import * as HiIcons from 'react-icons/hi2';


const Tags = ({ tags, setSelectedTag, selectedTag, setActiveTab }) => {
  return (
    <div className="py-4">
      {/* <h3 className="text-lg font-semibold mb-4 text-gray-100 dark:text-gray-100">Tags</h3> */}
      <div className="flex flex-col px-2 text-sm">
        {tags.map((tagItem, index) => {
          const Icon = HiIcons[tagItem.iconType] || HiIcons.HiOutlineTag; // Use the iconType from tag data or default to FaTag

          return (
            <button
              key={index}
              className={`flex flex-row px-4 py-1 text-left w-full rounded-md border-gray-300 dark:border-gray-700 focus:outline-none ${selectedTag == tagItem.tag ? 'bg-slate-600 text-gray-100 dark:text-gray-100' : ' text-gray-100 dark:text-gray-100'}`}

              onClick={() => {
                setSelectedTag(tagItem.tag)
                setActiveTab('notes')
            }}
            >
              <Icon className="my-auto h-5 w-5" />
              <div className='ml-2'>{tagItem.tag}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tags;