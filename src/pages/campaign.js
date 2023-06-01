import executeQuery from '../lib/db';
import Layout from "@/components/layout";
import Navigation from "@/components/Navigation/navigation";
import Table from "@/components/table/table";
import Note from "@/components/notes/note";
import { useState } from 'react';
import NoteRenderer from "@/components/notes/noteRenderer";
import Alert from "@/components/elements/alert";
import { getNotes, getCharacters } from "@/lib/DBUtils/GetCalls";
import Error400 from "@components/Errors/400"

import { useRouter } from 'next/router';

export default function campaign(props) {

    const router = useRouter();

    //Open and manage the alert
    const [noticeMessage, setNoticeMessage] = useState('');
    const [noticeColour, setNoticeColour] = useState('');
    const [showNotice, setShowNotice] = useState(false);
    const [noticeTitle, setNoticeTitle] = useState('');
  
  
    let openAlert = (colour, message, title) => {
      setShowNotice(!showNotice);
      setNoticeColour(colour);
      setNoticeTitle(title);
      setNoticeMessage(message);
      };

    //Fetch the notes from the database
    let { notes, notesError, notesIsLoading } = getNotes(props.campaign.ID);

    //Fetch the characters from the database
    let { characters, charactersError, charactersIsLoading } = getCharacters(props.campaign.ID);

    if (notesError || charactersError) {
        console.error(error)

        //Set error message
        if(notesError && charactersError){
            let errorMessage = "Failed to load notes and characters"
        }
        else if(notesError){
            let errorMessage = "Failed to load notes"
        }
        else if(charactersError){
            let errorMessage = "Failed to load characters"
        }

        return(<Error400 error={errorMessage}/>)
    }

    if (notesIsLoading || charactersIsLoading) {
        return <div>loading...</div>
    }
    
    if(notes && characters){

        if(characters.data.length == 0){
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

        if(notes.data.length == 0){
            notes.data = [
                {
                    "ObjectID": props.campaign.ID,
                    "Session": 0,
                    "Title": "No Notes",
                    "Content": "",
                }
            ]
        }


        let sessionNumber = 0;

        if(notes.data.length > 0) {
            sessionNumber = notes.data[notes.data.length - 1].Session + 1;
        }

    return(
  
    <Layout>
    <Navigation />

        <div class="px-4 py-5 sm:px-6">
        
        {showNotice && (<Alert colour={noticeColour} title={noticeTitle} message={noticeMessage} show={openAlert}/>)}

            <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                Campaign
                </h3>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                Campaign details and background.
                </p>
            </div>

            <div class="grid grid-cols-1 gap-4">
                <div class="bg-white overflow-hidden shadow rounded-lg">
                    <div class="px-4 py-5 sm:p-6">
                        <dl>
                            <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
                                Name
                            </dt>
                            <dd class="mt-1 text-sm leading-5 text-gray-900">
                                {props.campaign.Name}
                            </dd>
                        </dl>

                        <dl class="mt-4">
                            <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
                                DM
                            </dt>
                            <dd class="mt-1 text-sm leading-5 text-gray-900">
                                {props.campaign.DM}
                            </dd>
                        </dl>

                        <dl class="mt-4">
                            <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
                                Description
                            </dt>
                            <dd class="mt-1 text-sm leading-5 text-gray-900">
                                {props.campaign.Background}
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>


  
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Characters
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          All characters in the campaign.
        </p>
      </div>


        <Table data={characters.data}/>


        <div class="px-4 py-5 sm:px-6">
        <h3 id="notes" class="text-lg leading-6 font-medium text-gray-900">
          Notes
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          All notes for the campaign.
        </p>
        </div>

        {notes.data.map((note) => (
        <NoteRenderer key={note.ID} note={note}/>
        ))}

        <Note ObjectID={props.campaign.ID} SessionNumber={sessionNumber} showAlert={openAlert}/>
  
      </Layout>
  
      
    )
    }
  }
  
  export async function getServerSideProps({ query }) {


    let campaignQuery = await executeQuery({
        query: 'SELECT * FROM Campaign WHERE ID = ?',
        values: [query.ID],
    });

    const campaign = campaignQuery[0];

    return { props: { "campaign": campaign} };
}
