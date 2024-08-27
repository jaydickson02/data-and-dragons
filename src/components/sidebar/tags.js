import React from 'react';
import * as FaIcons from 'react-icons/fa';

const Tags = ({ tags, setSelectedTag, setActiveTab }) => {
  return (
    <div className="p-4">
      {/* <h3 className="text-lg font-semibold mb-4 text-gray-100 dark:text-gray-100">Tags</h3> */}
      <div className="flex flex-col px-2 text-sm">
        {tags.map((tagItem, index) => {
          const Icon = FaIcons[tagItem.iconType] || FaIcons.FaTag; // Use the iconType from tag data or default to FaTag

          return (
            <button
              key={index}
              className="text-gray-100 dark:text-gray-300 flex items-center py-1 transition-all duration-300 ease-in-out"
              onClick={() => {
                setSelectedTag(tagItem.tag)
                setActiveTab('notes')
            }}
            >
              <Icon className="mr-2" />
              {tagItem.tag}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tags;