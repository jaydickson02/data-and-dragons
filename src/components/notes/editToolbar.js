import React, { useState, useEffect } from 'react';
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaAlignLeft,
  FaFont,
  FaHeading,
  FaAlignCenter,
  FaAlignRight,
  FaUnderline,
  FaLink,
  FaHighlighter,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

const EditToolbar = ({ editor }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [alignmentIcon, setAlignmentIcon] = useState(<FaAlignLeft />);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const applyFontFamily = (family) => {
    editor.chain().focus().setFontFamily(family).run();
    setActiveDropdown(null);
  };

  const toggleTextAlign = () => {
    const currentAlign = editor.getAttributes('paragraph').textAlign || 'left';
    const alignOptions = ['left', 'center', 'right'];
    const nextAlign = alignOptions[(alignOptions.indexOf(currentAlign) + 1) % alignOptions.length];

    const iconMap = {
      left: <FaAlignLeft />,
      center: <FaAlignCenter />,
      right: <FaAlignRight />,
    };

    setAlignmentIcon(iconMap[nextAlign]);
    editor.chain().focus().setTextAlign(nextAlign).run();
  };

  useEffect(() => {
    if (!editor) return;

    const currentAlign = editor.getAttributes('paragraph').textAlign || 'left';
    const iconMap = {
      left: <FaAlignLeft />,
      center: <FaAlignCenter />,
      right: <FaAlignRight />,
    };
    setAlignmentIcon(iconMap[currentAlign]);
  }, [editor]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.relative')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getCurrentFontFamily = () => {
    if (!editor) return 'Font';
    return editor.getAttributes('textStyle').fontFamily || 'Font';
  };

  const toggleToolbar = () => {
    setIsCollapsed(!isCollapsed);
      // // Delay the unrendering to allow the animation to complete
      // setTimeout(() => {
        
      // }, 300); // 800ms matches the duration of your transition
  };

  if (!editor) {
    return null;
  }

  return (
    <>
    <div id="toolbar-section">
      {!isCollapsed ? (
        <div className={`absolute bottom-8 left-1/2 transform ${
          isCollapsed ? 'translate-x-full opacity-0' : '-translate-x-1/2 opacity-100'
        } flex px-2 py-1 bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg items-center transition-all duration-300 ease-in-out`}>
          <div className='flex space-x-4 mx-auto'>
          {/* Heading Group */}
          <div className="relative flex items-center">
            <button
              onClick={() => toggleDropdown('heading')}
              className={`text-gray-600 dark:text-gray-100 p-1 rounded-lg text-xs`}
              title="Headings"
            >
              <FaHeading />
            </button>
            {activeDropdown === 'heading' && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg flex space-x-1 p-2">
                {[1, 2, 3, 4].map((level) => (
                  <button
                    key={level}
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level }).run();
                      setActiveDropdown(null);
                    }}
                    className={`block p-1.5 text-gray-600 dark:text-gray-100 text-sm ${
                      editor.isActive('heading', { level })
                        ? 'bg-gray-300 dark:bg-gray-600 rounded-lg'
                        : ''
                    } hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg`}
                  >
                    H{level}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Formatting Group */}
          <div className="flex space-x-1">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`text-gray-600 dark:text-gray-100 p-1 rounded-md text-xs ${
                editor.isActive('bold') ? 'bg-gray-300 dark:bg-gray-600' : ''
              }`}
              title="Bold"
            >
              <FaBold />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`text-gray-600 dark:text-gray-100 p-1 rounded-md text-xs ${
                editor.isActive('italic') ? 'bg-gray-300 dark:bg-gray-600' : ''
              }`}
              title="Italic"
            >
              <FaItalic />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`text-gray-600 dark:text-gray-100 p-1 rounded-md text-xs ${
                editor.isActive('strike') ? 'bg-gray-300 dark:bg-gray-600' : ''
              }`}
              title="Strikethrough"
            >
              <FaStrikethrough />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`text-gray-600 dark:text-gray-100 p-1 rounded-md text-sm ${
                editor.isActive('underline') ? 'bg-gray-300 dark:bg-gray-600' : ''
              }`}
              title="Underline"
            >
              <u>U</u>
            </button>
          </div>

          {/* Link and Highlight Group */}
          <div className="hidden md:flex space-x-1">
            <button
              onClick={() => {
                const url = window.prompt('Enter the URL');
                if (url) {
                  editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                }
              }}
              className={`text-gray-600 dark:text-gray-100 p-1 rounded-lg text-xs ${
                editor.isActive('link') ? 'bg-gray-300 dark:bg-gray-600' : ''
              }`}
              title="Insert Link"
            >
              <FaLink />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={`text-gray-600 dark:text-gray-100 rounded-lg text-xs px-1 py-1 ${
                editor.isActive('highlight') ? 'bg-gray-300 dark:bg-gray-600' : ''
              }`}
              title="Highlight"
            >
              <FaHighlighter />
            </button>
          </div>

          {/* Font and Alignment Group */}
          <div className="hidden md:flex space-x-1">
            <div className="relative flex items-center">
              <button
                onClick={() => toggleDropdown('fontFamily')}
                className="text-gray-600 dark:text-gray-100 p-1 rounded-lg text-xs"
                title="Font Family"
              >
                <FaFont />
              </button>
              {activeDropdown === 'fontFamily' && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg p-1">
                  {['Arial', 'Georgia', 'Courier New', 'Times New Roman'].map((family) => (
                    <button
                      key={family}
                      onClick={() => applyFontFamily(family)}
                      className={`block w-32 px-1 py-1 text-center text-gray-600 dark:text-gray-100 text-sm ${
                        getCurrentFontFamily() === family ? 'bg-gray-300 dark:bg-gray-600 rounded-lg' : ''
                      } hover:bg-gray-200 dark:hover:bg-gray-700`}
                    >
                      {family}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={toggleTextAlign}
              className="text-gray-600 dark:text-gray-100 px-1 py-1 rounded-lg text-xs"
              title="Text Alignment"
            >
              {alignmentIcon}
            </button>
          </div>

          {/* Collapse Button */}
          <button
            onClick={toggleToolbar}
            className="text-gray-600 dark:text-gray-100 p-1 rounded-lg text-xs"
            title="Collapse Toolbar"
          >
            <FaChevronRight />
          </button>
          </div>
        </div>
      ) : (
        <div className="absolute bottom-8 right-8 p-1 bg-gray-100 dark:bg-gray-700 shadow-lg rounded-md flex items-center transition-all duration-300 ease-in-out">
          <button
            onClick={toggleToolbar}
            className="text-gray-600 dark:text-gray-100 p-2 rounded-md text-xs"
            title="Expand Toolbar"
          >
            <span className='flex flex-row'>
              <FaBold /><FaItalic /><FaStrikethrough />
            </span>
          </button>
          
        </div>
      )}
      </div>
    </>
  );
};

export default EditToolbar;