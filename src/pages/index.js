import executeQuery from "../lib/db";
import Layout from "@/components/layout";
import Card from "@/components/elements/card";
import Link from 'next/link';

export default function Campaigns({ campaigns }) {
  return (
    <Layout>
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h2 className="text-2xl leading-6 font-medium text-gray-900 dark:text-gray-100">
          Campaigns
        </h2>
        <Link href="/AddCampaign">
          <button className="text-white px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
            New Campaign
          </button>
        </Link>
      </div>

      <div className="px-4 py-5 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <Card
              key={campaign.ID}
              title={campaign.Name}
              link={{ pathname: '/campaign', query: { ID: campaign.ID } }}
              image={campaign.CoverImage}
              description={campaign.Background}
              className="transition-transform transform hover:scale-105"
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

// Get initial Props
export async function getServerSideProps() {
  const result = await executeQuery({
    query: "SELECT * FROM Campaign",
    values: [],
  });

  const campaigns = result;

  return {
    props: {
      campaigns,
    },
  };
}