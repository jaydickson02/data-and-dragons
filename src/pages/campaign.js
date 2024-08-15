import executeQuery from '../lib/db';
import Layout from "@/components/layout";
import CampaignHeader from "@components/campaign/campaignHeader";
import CampaignOverview from "@components/campaign/campaignOverview";
import CampaignCharacters from "@components/campaign/campaignCharacters";
import CampaignNotes from "@components/campaign/campaignNotes";
import Alert from "@components/elements/alert";
import { useState, useEffect } from 'react';
import { fetchNotes } from '@/lib/DBUtils/noteDBUtils';
import { fetchCharacters } from '@/lib/DBUtils/characterDBUtils';

export default function Campaign(props) {
    const [noticeMessage, setNoticeMessage] = useState('');
    const [noticeColour, setNoticeColour] = useState('');
    const [showNotice, setShowNotice] = useState(false);
    const [noticeTitle, setNoticeTitle] = useState('');
    const [activeTab, setActiveTab] = useState('campaign');

    // Notes state
    const [notesIsLoading, setIsLoading] = useState(true); // Loading state for fetching notes
    const [notesError, setNotesError] = useState(null); // Error state for fetching notes
    const [notes, setNotes] = useState([]);

    // Characters state
    const [characters, setCharacters] = useState([]);
    const [charactersAreLoading, setCharactersAreLoading] = useState(true);
    const [charactersError, setCharactersError] = useState(null);

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

    // Fetch notes based on campaignID
    useEffect(() => {
        fetchNotes(props.campaign.ID, setNotes, setIsLoading, setNotesError, openAlert); 
        fetchCharacters(props.campaign.ID, setCharacters, setCharactersAreLoading, setCharactersError, openAlert);
    }, []);

    return (
        <Layout hideFooter={true}>
            <div className="px-4 py-5 sm:px-6">
                {showNotice && (
                    <Alert
                        colour={noticeColour}
                        title={noticeTitle}
                        message={noticeMessage}
                        show={() => setShowNotice(false)}
                    />
                )}
                <CampaignHeader campaign={props.campaign} activeTab={activeTab} setActiveTab={handleTabChange}/>
                {activeTab === 'campaign' && <CampaignOverview campaign={props.campaign} />}
                {activeTab === 'characters' && (
                    <CampaignCharacters 
                    campaignID={props.campaign.ID} 
                    characters={characters} 
                    isLoading={charactersAreLoading} 
                    loadingError={charactersError} 
                    setCharacters={setCharacters} 
                    openAlert={openAlert} />
                )}
                {activeTab === 'notes' && (
                    <CampaignNotes 
                    campaignID={props.campaign.ID} 
                    notes={notes} 
                    characters={characters}
                    isLoading={notesIsLoading} 
                    loadingError={notesError} 
                    setNotes={setNotes} 
                    setCharacters={setCharacters}
                    openAlert={openAlert} />
                )}
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