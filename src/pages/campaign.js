import executeQuery from '../lib/db';
import Layout from "@/components/layout";
import Navigation from "@/components/Navigation/navigation";
import Table from "@/components/table/table";
import Note from "@/components/notes/note";
import { useState, useEffect } from 'react';
import NoteRenderer from "@/components/notes/noteRenderer";
import Alert from "@/components/elements/alert";
import Error400 from "@components/Errors/400";
import Loading from "@components/loading";
import { useRouter } from 'next/router';

export default function Campaign(props) {
    const router = useRouter();
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
                <Navigation />
                <div className="px-4 py-5 sm:px-6">
                    {showNotice && (
                        <Alert
                            colour={noticeColour}
                            title={noticeTitle}
                            message={noticeMessage}
                            show={() => setShowNotice(false)}
                        />
                    )}

<div
                        className="relative px-4 pb-10 pt-4 sm:px-6 flex flex-col items-center"
                        style={{
                            backgroundImage: `url(${props.campaign.CoverImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '1.5rem',
                        }}
                    >
                        <div className="px-8 py-5 mb-20 mt-20 m-auto shadow rounded-3xl bg-gray-200 dark:bg-gray-900 flex justify-center">
                            <h2 className="text-3xl leading-6 font-medium text-gray-900 dark:text-gray-100">
                                {props.campaign.Name}
                            </h2>
                        </div>

                        <div className="flex space-x-2 mt-4">
                            <button
                                className={`px-4 py-2 focus:outline-none ${activeTab === 'campaign' ? 'bg-indigo-600  text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'} rounded-full`}
                                onClick={() => setActiveTab('campaign')}
                            >
                                Overview
                            </button>
                            <button
                                className={`px-4 py-2 focus:outline-none ${activeTab === 'characters' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'} rounded-full`}
                                onClick={() => setActiveTab('characters')}
                            >
                                Characters
                            </button>
                            <button
                                className={`px-4 py-2 focus:outline-none ${activeTab === 'notes' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'} rounded-full`}
                                onClick={() => setActiveTab('notes')}
                            >
                                Notes
                            </button>
                        </div>
                    </div>

                    <div className="mb-5 flex justify-center">
                    </div>


                    {activeTab === 'campaign' && (
                        <>
                            <div className="px-4 py-5 sm:px-6 mb-5 mt-5 shadow rounded-lg bg-gray-100 dark:bg-gray-900">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                                    Overview
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-100">
                                    Information about the campaign.
                                </p>
                            </div>
                            <div className="dark:bg-gray-800 bg-white overflow-hidden shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <dl>
                                        <dt className="text-sm leading-5 font-medium text-gray-900 dark:text-gray-100 truncate">
                                            Name
                                        </dt>
                                        <dd className="mt-1 text-sm leading-5 text-gray-800 dark:text-gray-400">
                                            {props.campaign.Name}
                                        </dd>
                                    </dl>
                                    <dl className="mt-4">
                                        <dt className="text-sm leading-5 font-medium text-gray-900 dark:text-gray-100 truncate">
                                            Dungeon Master
                                        </dt>
                                        <dd className="mt-1 text-sm leading-5 text-gray-800 dark:text-gray-400">
                                            {props.campaign.DM}
                                        </dd>
                                    </dl>
                                    <dl className="mt-4">
                                        <dt className="text-sm leading-5 font-medium text-gray-900 dark:text-gray-100 truncate">
                                            Description
                                        </dt>
                                        <dd className="mt-1 text-sm leading-5 text-gray-800 dark:text-gray-400">
                                            {props.campaign.Background}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'characters' && (
                        <>
                            <div className="px-4 py-5 sm:px-6 mb-5 mt-5 shadow rounded-lg bg-gray-100 dark:bg-gray-900">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                                    Characters
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-100">
                                    All characters in the campaign.
                                </p>
                            </div>
                            <Table data={characters.data} />
                        </>
                    )}

                    {activeTab === 'notes' && (
                        <>
                            <div className="px-4 py-5 sm:px-6 mb-5 mt-5 shadow rounded-lg bg-gray-100 dark:bg-gray-900">
                                <h3 id="notes" className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                                    Notes
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-100">
                                    All notes for the campaign.
                                </p>
                            </div>
                            {notes.data.map((note) => (
                                <NoteRenderer key={note.ID} note={note} onUpdate={() => setFetchNotesTrigger(!fetchNotesTrigger)} />
                            ))}
                            <Note 
                                ObjectID={props.campaign.ID} 
                                SessionNumber={sessionNumber} 
                                showAlert={openAlert}
                                onNewNote={() => setFetchNotesTrigger(!fetchNotesTrigger)}
                            />
                        </>
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