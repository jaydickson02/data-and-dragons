import executeQuery from '../lib/db';
import Layout from "@/components/layout";
import CampaignHeader from "@/components/Campaign/CampaignHeader";
import CampaignOverview from "@/components/Campaign/CampaignOverview";
import CampaignCharacters from "@/components/Campaign/CampaignCharacters";
import CampaignNotes from "@/components/Campaign/CampaignNotes";
import Alert from "@/components/elements/alert";
import Error400 from "@components/Errors/400";
import Loading from "@components/loading";
import { useState, useEffect } from 'react';

export default function Campaign(props) {
    const [noticeMessage, setNoticeMessage] = useState('');
    const [noticeColour, setNoticeColour] = useState('');
    const [showNotice, setShowNotice] = useState(false);
    const [noticeTitle, setNoticeTitle] = useState('');
    const [notes, setNotes] = useState(null);
    const [characters, setCharacters] = useState(null);
    const [notesError, setNotesError] = useState(null);
    const [charactersError, setCharactersError] = useState(null);
    const [notesIsLoading, setNotesIsLoading] = useState(true);
    const [charactersIsLoading, setCharactersIsLoading] = useState(true);
    const [fetchNotesTrigger, setFetchNotesTrigger] = useState(false);
    const [activeTab, setActiveTab] = useState('campaign');

    const openAlert = (colour, message, title) => {
        setShowNotice(true);
        setNoticeColour(colour);
        setNoticeTitle(title);
        setNoticeMessage(message);
        setTimeout(() => setShowNotice(false), 5000); // Hide after 5 seconds
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const notesRes = await fetch(`/api/get/notes/${props.campaign.ID}`);
                if (!notesRes.ok) throw new Error('Failed to load notes');
                const notesData = await notesRes.json();
                setNotes(notesData);
            } catch (error) {
                setNotesError(error.message);
            } finally {
                setNotesIsLoading(false);
            }

            try {
                const charactersRes = await fetch(`/api/get/characters/${props.campaign.ID}`);
                if (!charactersRes.ok) throw new Error('Failed to load characters');
                const charactersData = await charactersRes.json();
                setCharacters(charactersData);
            } catch (error) {
                setCharactersError(error.message);
            } finally {
                setCharactersIsLoading(false);
            }
        }

        fetchData();
    }, [props.campaign.ID, fetchNotesTrigger]); // Add fetchNotesTrigger to dependency array

    if (notesError || charactersError) {
        let errorMessage = notesError && charactersError
            ? "Failed to load notes and characters"
            : notesError
                ? "Failed to load notes"
                : "Failed to load characters";
        return (<Error400 error={errorMessage} />);
    }

    if (notesIsLoading || charactersIsLoading) {
        return (<Loading />);
    }

    if (notes && characters) {
        if (characters.data.length === 0) {
            characters.data = [
                {
                    "Name": "No Characters",
                    "Image": "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
                    "Player": false,
                    "PlayerName": "N/A",
                    "Class": "N/A",
                    "ID": 0,
                    "CampaignID": props.campaign.ID,
                    "Background": "N/A",
                    "Alignment": "N/A",
                    "Affiliation": "N/A",
                    "Level": "N/A",
                    "Status": "N/A",
                    "Location": "N/A",
                    "Race": "N/A"
                }
            ];
        }

        if (notes.data.length === 0) {
            notes.data = [
                {
                    "ObjectID": props.campaign.ID,
                    "Session": 0,
                    "Title": "No Notes",
                    "Content": "",
                }
            ];
        }

        let sessionNumber = notes.data.length > 0 ? notes.data[notes.data.length - 1].Session + 1 : 0;

        return (
            <Layout>
                <div className="px-4 py-5 sm:px-6">
                    {showNotice && (
                        <Alert
                            colour={noticeColour}
                            title={noticeTitle}
                            message={noticeMessage}
                            show={() => setShowNotice(false)}
                        />
                    )}
                    <CampaignHeader campaign={props.campaign} activeTab={activeTab} setActiveTab={setActiveTab} />
                    {activeTab === 'campaign' && <CampaignOverview campaign={props.campaign} />}
                    {activeTab === 'characters' && <CampaignCharacters characters={characters} openAlert={openAlert} />}
                    {activeTab === 'notes' && (
                        <CampaignNotes
                            notes={notes}
                            campaignID={props.campaign.ID}
                            sessionNumber={sessionNumber}
                            openAlert={openAlert}
                            setFetchNotesTrigger={setFetchNotesTrigger}
                        />
                    )}
                </div>
            </Layout>
        );
    }
}

export async function getServerSideProps({ query }) {
    let campaignQuery = await executeQuery({
        query: 'SELECT * FROM Campaign WHERE ID = ?',
        values: [query.ID],
    });
    const campaign = campaignQuery[0];

    return { props: { campaign } };
}