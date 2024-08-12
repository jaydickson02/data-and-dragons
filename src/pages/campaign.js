import executeQuery from '../lib/db';
import Layout from "@/components/layout";
import CampaignHeader from "@/components/campaign/campaignHeader";
import CampaignOverview from "@/components/campaign/campaignOverview";
import CampaignCharacters from "@/components/campaign/campaignCharacters";
import CampaignNotes from "@/components/campaign/campaignNotes";
import Alert from "@/components/elements/alert";
import Error400 from "@components/Errors/400";
import Loading from "@components/loading";
import { useState, useEffect } from 'react';

export default function Campaign(props) {
    const [noticeMessage, setNoticeMessage] = useState('');
    const [noticeColour, setNoticeColour] = useState('');
    const [showNotice, setShowNotice] = useState(false);
    const [noticeTitle, setNoticeTitle] = useState('');
    const [activeTab, setActiveTab] = useState('campaign');

    const openAlert = (colour, message, title) => {
        setShowNotice(true);
        setNoticeColour(colour);
        setNoticeTitle(title);
        setNoticeMessage(message);
        setTimeout(() => setShowNotice(false), 5000); // Hide after 5 seconds
    };

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
                    {activeTab === 'characters' && <CampaignCharacters campaignID={props.campaign.ID} openAlert={openAlert} />}
                    {activeTab === 'notes' && <CampaignNotes campaignID={props.campaign.ID} openAlert={openAlert}/>}
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