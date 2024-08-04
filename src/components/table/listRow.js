import { useState, useEffect } from 'react';
import Modal from '@/components/elements/modal';
import UpdateCharacter from '@/components/table/updateCharacter';
import DOMPurify from 'dompurify';

function ListRow({ row, showAlert }) {
    const [characterData, setCharacterData] = useState(row);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);
    const handleExpand = () => setIsExpanded(!isExpanded);
    const toggleEdit = () => setIsEditing(!isEditing);

    const handleUpdate = (updatedCharacter) => {
        setCharacterData(updatedCharacter);
        setIsEditing(false);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 640);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Configure DOMPurify to allow certain tags and attributes
    const purifyConfig = {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'blockquote', 'code'],
        ALLOWED_ATTR: ['href', 'title', 'target']
    };

    const sanitizedBackground = DOMPurify.sanitize(characterData.Background.replace(/\n/g, '<br />'), purifyConfig);

    return (
        <div className="border border-gray-300 dark:border-0 p-4 rounded-lg bg-white dark:bg-gray-700 shadow">
            {isEditing ? (
                <UpdateCharacter 
                    row={characterData} 
                    onClose={toggleEdit} 
                    onUpdate={handleUpdate} 
                    showAlert={showAlert} 
                />
            ) : (
                <>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <img
                                className="h-16 w-16 rounded-full object-cover"
                                src={characterData.Image}
                                alt=""
                            />
                            <div>
                                <div className="font-medium text-lg text-gray-900 dark:text-gray-100">{characterData.Name}</div>
                                <div className="text-gray-500 dark:text-gray-300">{characterData.Class} - {characterData.Race}</div>
                            </div>
                        </div>
                        {isSmallScreen && (
                            <button
                                type="button"
                                className="inline-flex items-center bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-3 py-1 rounded transition ease-in-out duration-150"
                                onClick={handleExpand}
                            >
                                {isExpanded ? 'Collapse' : 'Expand'}
                            </button>
                        )}
                    </div>
                    {(isExpanded || !isSmallScreen) && (
                        <>
                            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                                <div className="flex flex-col">
                                    <span className="font-medium text-gray-900 dark:text-gray-100">Player Name</span>
                                    <span className="bg-gray-50 dark:bg-gray-200 px-2 py-1 rounded text-gray-600 dark:text-gray-900 truncate hover:overflow-visible hover:whitespace-normal">
                                        {characterData.PlayerName}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium text-gray-900 dark:text-gray-100">Status</span>
                                    <span className="bg-blue-50 dark:bg-blue-200 px-2 py-1 rounded text-blue-600 dark:text-blue-900 truncate hover:overflow-visible hover:whitespace-normal">
                                        {characterData.Status}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium text-gray-900 dark:text-gray-100">Location</span>
                                    <span className="bg-green-50 dark:bg-green-200 px-2 py-1 rounded text-green-600 dark:text-green-900 truncate hover:overflow-visible hover:whitespace-normal">
                                        {characterData.Location}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium text-gray-900 dark:text-gray-100">Affiliation</span>
                                    <span className="bg-violet-50 dark:bg-violet-200 px-2 py-1 rounded text-violet-600 dark:text-violet-900 truncate hover:overflow-visible hover:whitespace-normal">
                                        {characterData.Affiliation}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium text-gray-900 dark:text-gray-100">Alignment</span>
                                    <span className="bg-pink-50 dark:bg-pink-200 px-2 py-1 rounded text-pink-600 dark:text-pink-900 truncate hover:overflow-visible hover:whitespace-normal">
                                        {characterData.Alignment}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium text-gray-900 dark:text-gray-100">Level</span>
                                    <span className="bg-orange-50 dark:bg-orange-200 px-2 py-1 rounded text-orange-600 dark:text-orange-900 truncate hover:overflow-visible hover:whitespace-normal">
                                        Level {characterData.Level}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4 flex space-x-2">
                                <button
                                    type="button"
                                    className="inline-flex items-center bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-3 py-1 rounded transition ease-in-out duration-150"
                                    onClick={toggleEdit}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-3 py-1 rounded transition ease-in-out duration-150"
                                    onClick={handleModalOpen}
                                >
                                    See Background
                                </button>
                            </div>
                        </>
                    )}
                    {isModalOpen && (
                        <Modal onClose={handleModalClose}>
                            <div className="p-4">
                                <h1 className="text-lg font-semibold">Character Background</h1>
                                <div dangerouslySetInnerHTML={{ __html: sanitizedBackground }} />
                            </div>
                        </Modal>
                    )}
                </>
            )}
        </div>
    );
}

export default ListRow;