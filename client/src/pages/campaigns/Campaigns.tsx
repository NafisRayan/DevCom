import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { campaigns } from '../../services/api';

const Campaigns: React.FC = () => {
  const { data: campaignsData, isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: () => campaigns.getAll(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Campaigns</h1>
        <Link to="/campaigns/new" className="btn btn-primary">
          Create Campaign
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaignsData?.data?.map((campaign: any) => (
          <div key={campaign._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{campaign.name}</h2>
              <p className="text-base-content/70">{campaign.description}</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Status</span>
                  <span className={`badge ${
                    campaign.status === 'active' ? 'badge-success' :
                    campaign.status === 'draft' ? 'badge-warning' :
                    'badge-error'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Progress</span>
                  <progress
                    className="progress progress-primary w-24"
                    value={campaign.progress || 0}
                    max="100"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Leads</span>
                  <span className="badge badge-neutral">{campaign.leads?.length || 0}</span>
                </div>
              </div>
              <div className="card-actions justify-end mt-4">
                <Link
                  to={`/campaigns/${campaign._id}`}
                  className="btn btn-sm btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaigns; 