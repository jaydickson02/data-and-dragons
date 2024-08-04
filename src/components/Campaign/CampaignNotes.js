import Note from "@/components/notes/note";
import NoteRenderer from "@/components/notes/noteRenderer";

const CampaignNotes = ({ notes, campaignID, sessionNumber, openAlert, setFetchNotesTrigger }) => (
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
            <NoteRenderer key={note.ID} note={note} onUpdate={() => setFetchNotesTrigger(prev => !prev)} />
        ))}
        <Note
            ObjectID={campaignID}
            SessionNumber={sessionNumber}
            showAlert={openAlert}
            onNewNote={() => setFetchNotesTrigger(prev => !prev)}
        />
    </>
);

export default CampaignNotes;