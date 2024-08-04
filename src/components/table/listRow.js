import { useState } from 'react';
import Link from 'next/link';
import Modal from '@/components/elements/modal';

function ListRow({ row }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);
    const handleExpand = () => setIsExpanded(!isExpanded);

    return (
        <div className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <img
                        className="h-16 w-16 rounded-full object-cover"
                        src={row.Image}
                        alt=""
                    />
                    <div>
                        <div className="font-medium text-lg text-gray-900 dark:text-gray-100">{row.Name}</div>
                        <div className="text-gray-400 dark:text-gray-300">{row.Player ? row.PlayerName : "NPC"}</div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="font-medium text-gray-700 dark:text-gray-300">{row.Class}</div>
                    <div className="text-gray-500 dark:text-gray-400">{row.Race}</div>
                </div>
            </div>
            {(isExpanded || window.innerWidth >= 640) && (
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Status</span>
                        <span className="bg-blue-50 dark:bg-blue-500 px-2 py-1 rounded text-blue-600 dark:text-blue-900">{row.Status}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Location</span>
                        <span className="bg-indigo-50 dark:bg-indigo-500 px-2 py-1 rounded text-indigo-600 dark:text-indigo-900">{row.Location}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Affiliation</span>
                        <span className="bg-violet-50 dark:bg-violet-500 px-2 py-1 rounded text-violet-600 dark:text-violet-900">{row.Affiliation}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Alignment</span>
                        <span className="bg-pink-50 dark:bg-pink-500 px-2 py-1 rounded text-pink-600 dark:text-pink-900">{row.Alignment}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Level</span>
                        <span className="bg-orange-50 dark:bg-orange-500 px-2 py-1 rounded text-orange-600 dark:text-orange-900">Level {row.Level}</span>
                    </div>
                </div>
            )}
            {(isExpanded || window.innerWidth >= 640) && (
                <div className="mt-4 flex space-x-2">
                    {row.ID !== 0 && (
                        <Link href={{ pathname: '/editCharacter', query: { "ID": row.ID, "CampaignID": row.CampaignID } }}>
                            <button className="inline-flex items-center bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-3 py-1 rounded transition ease-in-out duration-150">
                                Edit
                            </button>
                        </Link>
                    )}
                    {row.ID !== 0 && (
                        <button
                            className="inline-flex items-center bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-3 py-1 rounded transition ease-in-out duration-150"
                            onClick={handleModalOpen}
                        >
                            See Background
                        </button>
                    )}
                </div>
            )}
            {isModalOpen && (
                <Modal onClose={handleModalClose}>
                    <div className="p-4">
                        <h1 className="text-lg font-semibold">Character Background</h1>
                        <p>{row.Background}</p>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default ListRow;