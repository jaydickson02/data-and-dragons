import executeQuery from '../lib/db';
import Layout from "@/components/layout";
import CampaignHeader from "@components/campaign/campaignHeader";
import CampaignOverview from "@components/campaign/campaignOverview";
import CampaignCharacters from "@components/campaign/campaignCharacters";
import CampaignNotes from "@components/campaign/campaignNotes";
import Tags from "@components/sidebar/tags";
import Alert from "@components/elements/alert";
import { useState, useEffect } from 'react';
import { fetchNotes } from '@/lib/DBUtils/noteDBUtils';
import { fetchCharacters } from '@/lib/DBUtils/characterDBUtils';
import { FaBars, FaArrowLeft } from 'react-icons/fa'; // Import icons for sidebar toggle

export default function Campaign(props) {
    const [noticeMessage, setNoticeMessage] = useState('');
    const [noticeColour, setNoticeColour] = useState('');
    const [showNotice, setShowNotice] = useState(false);
    const [noticeTitle, setNoticeTitle] = useState('');
    const [activeTab, setActiveTab] = useState('notes'); // Load notes by default
    const [anyLoading, setAnyLoading] = useState(true);

    // Sidebar state
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Notes state
    const [notesIsLoading, setIsLoading] = useState(true); // Loading state for fetching notes
    const [notesError, setNotesError] = useState(null); // Error state for fetching notes
    const [notes, setNotes] = useState([]);

    // Characters state
    const [characters, setCharacters] = useState([]);
    const [charactersAreLoading, setCharactersAreLoading] = useState(true);
    const [charactersError, setCharactersError] = useState(null);

    //Tags state
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);

    const openAlert = (colour, message, title) => {
        setShowNotice(true);
        setNoticeColour(colour);
        setNoticeTitle(title);
        setNoticeMessage(message);
        setTimeout(() => setShowNotice(false), 5000); // Hide after 5 seconds
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    // Fetch notes and characters based on campaignID
    useEffect(() => {
        fetchNotes(props.campaign.ID, setNotes, setIsLoading, setNotesError, openAlert); 
        fetchCharacters(props.campaign.ID, setCharacters, setCharactersAreLoading, setCharactersError, openAlert);
    }, []);

    useEffect(() => {
        if (charactersAreLoading || notesIsLoading) {
            setAnyLoading(true);
        } else {
            setAnyLoading(false);
        }
    }, [charactersAreLoading, notesIsLoading]);

    // Toggle the sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <Layout hideFooter={true} hideNav={true}>
            <div className="flex h-full">
                <div 
                    className={`fixed h-full border-r inset-y-0 left-0 z-30 w-48 transform dark:border-gray-600 bg-slate-800 dark:bg-gray-700 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <CampaignHeader campaign={props.campaign} activeTab={activeTab} setActiveTab={handleTabChange} setSelectedTag={setSelectedTag} selectedTag={selectedTag} />
                    <Tags tags={tags} setSelectedTag={setSelectedTag} selectedTag={selectedTag} setActiveTab={setActiveTab} />

                    <button
                        onClick={toggleSidebar}
                        className={`fixed bottom-4 right-4 text-gray-600 dark:text-gray-300 p-2 bg-gray-200 dark:bg-gray-700 rounded-full focus:outline-none`}
                    >
                        <FaArrowLeft />
                    </button>
                </div>

                {/* Main content area */}
                <div className={`flex-grow h-full dark:bg-gray-800 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-48' : 'ml-0'}`}>
                    <button
                        onClick={toggleSidebar}
                        className={`fixed bottom-4 left-4 ${sidebarOpen ? 'hidden' : ''} transform transition-transform duration-300 ease-in-out text-gray-600 dark:text-gray-300 p-2 bg-gray-200 dark:bg-gray-700 rounded-full focus:outline-none`}
                    >
                        <FaBars />
                    </button>

                    {showNotice && (
                        <Alert
                            colour={noticeColour}
                            title={noticeTitle}
                            message={noticeMessage}
                            show={() => setShowNotice(false)}
                        />
                    )}

                    {activeTab === 'characters' && (
                        <CampaignCharacters 
                            campaignID={props.campaign.ID} 
                            characters={characters} 
                            isLoading={charactersAreLoading} 
                            loadingError={charactersError} 
                            setCharacters={setCharacters} 
                            openAlert={openAlert} 
                        />
                    )}
                    {activeTab === 'notes' && (
                        <CampaignNotes 
                            campaignID={props.campaign.ID} 
                            notes={notes} 
                            characters={characters}
                            isLoading={anyLoading}
                            loadingError={notesError} 
                            selectedTag={selectedTag}
                            setNotes={setNotes} 
                            setCharacters={setCharacters}
                            openAlert={openAlert} 
                            setTags={setTags}
                            
                        />
                    )}
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ query }) {
    let campaignQuery = await executeQuery({
        query: 'SELECT * FROM Campaign WHERE ID = ?',
        values: [query.ID],
    });
    const campaign = campaignQuery[0];

    return { props: { campaign } };
}