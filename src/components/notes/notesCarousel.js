import React from 'react';
import { FaPlus } from 'react-icons/fa';
import Slider from 'react-slick';

const NotesCarousel = ({ notes, selectedNote, handleNoteSelect, addNewNoteToDatabase, campaignID }) => {
  const extractTitle = (content) => {
    const firstLine = content.split('\n')[0];
    const originalLength = firstLine.length;
    const title = firstLine.replace(/^#\s*/, '');
    return { title, originalLength };
  };

  const stripMarkdown = (markdown) => {
    return markdown
      .replace(/(\*\*|__)(.*?)\1/g, '$2')
      .replace(/(\*|_)(.*?)\1/g, '$2')
      .replace(/~~(.*?)~~/g, '$1')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
      .replace(/`(.*?)`/g, '$1')
      .replace(/#+\s(.*)/g, '$1')
      .replace(/>\s(.*)/g, '$1')
      .replace(/[*+-]\s/g, '')
      .replace(/\d+\.\s/g, '')
      .replace(/\n+/g, ' ')
      .trim();
  };

  // Slider settings for the carousel
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current, next) => handleNoteSelect(notes[next]), // Set the next note as active
  };

  return (
    <div className="w-full px-4 py-8 mb-2 rounded-xl bg-gray-300 dark:bg-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold dark:text-gray-100">Notes</h2>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
          onClick={() => addNewNoteToDatabase(campaignID)}
        >
          <FaPlus />
        </button>
      </div>
      <Slider {...settings}>
        {notes.map((note) => {
          const { title, originalLength } = extractTitle(note.content);
          const descriptionStartIndex = originalLength + 1;
          let description = note.content.slice(descriptionStartIndex).trim();
          description = stripMarkdown(description);

          if (description.length === 0) {
            description = 'A bad wizard erased this page...';
          }

          return (
            <div key={note.id} className="p-2">
              <div
                className={`block w-full text-left p-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 ${
                  note.id === selectedNote?.id ? 'bg-gray-200 dark:bg-gray-600 font-semibold' : ''
                }`}
                style={{ minHeight: '4rem' }} // Adjust height as needed
              >
                <span className="block truncate font-bold">
                  {title}
                </span>
                <span className="block text-sm text-gray-500 dark:text-gray-400 truncate mt-2">
                  {description.length > 100 ? description.slice(0, 100) + '...' : description}
                </span>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default NotesCarousel;