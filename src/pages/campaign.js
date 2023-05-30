import executeQuery from '../../lib/db';
import Layout from "@/components/layout";
import Navigation from "@/components/navigation";
import Table from "@/components/table";
import Note from "@/components/note";
import { useState } from 'react';
import NoteRenderer from "@/components/noteRenderer";
import { useEffect } from 'react';

import { useRouter } from 'next/router';

export default function Home(props) {

    //Validate Data
    console.log("-------- Campaign Data --------")
    console.log(props.campaign)
    console.log("-------- Character Data --------")
    console.log(props.characters)
    console.log("-------- Note Data --------")
    console.log(props.notes)

    const router = useRouter();

    let sessionNumber = 0;

    if(props.notes.length > 0) {
        sessionNumber = props.notes[props.notes.length - 1].Session + 1;
    }

    const refreshData = () => {
        router.replace(router.asPath);
      }

      const editNote = () => {
        refreshData();
        }

      const deleteNote = async (ID) => {
    
        // Get data from the form.
        const data = {
            id: ID,
        };
    
        // Check that required fields are not empty.
        if (!data.id) {
    
            console.log("Missing values: " + data.id)
            return;
    
        }
    
        //Delete the character from the database
    
        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);
    
        // API endpoint where we send form data.
        const endpoint = '/api/deleteNote';
    
        // Form the request for sending data to the server.
        const options = {
          // The method is POST because we are sending data.
          method: 'POST',
          // Tell the server we're sending JSON.
          headers: {
            'Content-Type': 'application/json',
          },
          // Body of the request is the JSON data we created above.
          body: JSONdata,
        };
    
        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options);
    
        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json();
    
        // Set the notice message to display.
        if (result.data) {
            // Redirect to the campaign page with the campaign ID as a get parameter
            refreshData();
        }
    }

    

    return (
  
    <Layout>
    <Navigation />

            <div class="px-4 py-5 sm:px-6">

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
                                    Description
                                </dt>
                                <dd class="mt-1 text-sm leading-5 text-gray-900">
                                    {props.campaign.Background}
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


        <Table data={props.characters}/>


        <div class="px-4 py-5 sm:px-6">
        <h3 id="notes" class="text-lg leading-6 font-medium text-gray-900">
          Notes
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          All notes for the campaign.
        </p>
        </div>

        {props.notes.map((note) => (
        <NoteRenderer key={note.ID} note={note} editNote={editNote} deleteNote={deleteNote} />
        ))}

        <Note ObjectID={props.campaign.ID} SessionNumber={sessionNumber} refreshData={refreshData}/>
  
      </Layout>
  
      
    )
  }
  
  export async function getServerSideProps({ query }) {

    

    let campaignQuery = await executeQuery({
        query: 'SELECT * FROM Campaign WHERE ID = ?',
        values: [query.ID],
    });

    let characters = await executeQuery({
        query: 'SELECT * FROM Characters WHERE CampaignID = ? ORDER BY Name ASC',
        values: [query.ID],
      });
    
    if(characters.length == 0){
        characters = [
            {
            "Name": "No Characters",
            "Image": "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
            "Player": false,
            "PlayerName": "N/A",
            "Class": "N/A",
            "ID": 0,
            "CampaignID": 0,
            "Background": "N/A",
            "Alignment": "N/A",
            "Affiliation": "N/A",
            "Level": "N/A",
            "Status": "N/A",
            "Location": "N/A",
            "Race": "N/A",
            }
        ];
    }

    let notes = await executeQuery({
        query: 'SELECT * FROM Notes WHERE ObjectID = ?',
        values: [query.ID],
        });
    
    if(notes.length == 0){
        notes = [
            {
            "Content": "",
            "Session": 0,
            }
        ];
    }

    const campaign = campaignQuery[0];

    return { props: { "characters": characters, "campaign": campaign, "notes": notes} };
}
