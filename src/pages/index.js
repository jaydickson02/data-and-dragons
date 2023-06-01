import executeQuery from "../lib/db";
import Layout from "@/components/layout";
import Card from "@/components/elements/card";
import { getCampaigns } from "@/lib/DBUtils/GetCalls";
import Error400 from "@/components/Errors/400";

export default function Campaigns( {campaigns} ) {

    return (
        <Layout>
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Campaigns
              </h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">
                All created campaigns.
              </p>
           </div>
        
            <div class="px-4 py-5 sm:px-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                
                campaigns.map((campaign) => (
                    
                    <Card title={campaign.Name} link={{ pathname: '/campaign', query: {"ID": campaign.ID} }} image={campaign.CoverImage} description={campaign.Background}/>

                ))}            
            </div>
            </div>
        </Layout>
    )
}

//Get initial Props
export async function getServerSideProps() {
    
        const result = await executeQuery({
            query: 'SELECT * FROM Campaign',
            values: [],
        });

        const campaigns = result
    
        return {
            props: {
                campaigns
            }
        }
    }


