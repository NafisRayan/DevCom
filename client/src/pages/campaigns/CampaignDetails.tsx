import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { campaigns } from '../../services/api';

const CampaignDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: campaign, isLoading } = useQuery({
    queryKey: ['campaigns', id],
    queryFn: () => campaigns.getById(id!),
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
        <h1 className="text-3xl font-bold">Campaign Details</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/campaigns')}
            className="btn btn-ghost"
          >
            Back to Campaigns
          </button>
          <button className="btn btn-primary">Edit Campaign</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign Information */}
        <div className="lg:col-span-2">
          <div className="bg-base-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Campaign Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium opacity-70">Name</label>
                <p className="text-lg">{campaign?.data?.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium opacity-70">Description</label>
                <p className="text-lg whitespace-pre-wrap">
                  {campaign?.data?.description}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium opacity-70">Status</label>
                <span className={`badge ml-2 ${
                  campaign?.data?.status === 'active' ? 'badge-success' :
                  campaign?.data?.status === 'draft' ? 'badge-warning' :
                  'badge-error'
                }`}>
                  {campaign?.data?.status}
                </span>
              </div>
              <div>
                <label className="text-sm font-medium opacity-70">Progress</label>
                <div className="flex items-center gap-2">
                  <progress
                    className="progress progress-primary w-full"
                    value={campaign?.data?.progress || 0}
                    max="100"
                  />
                  <span>{campaign?.data?.progress || 0}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Stats */}
        <div className="lg:col-span-1">
          <div className="bg-base-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Campaign Stats</h2>
            <div className="stats stats-vertical shadow w-full">
              <div className="stat">
                <div className="stat-title">Total Leads</div>
                <div className="stat-value">{campaign?.data?.leads?.length || 0}</div>
                <div className="stat-desc">↗︎ 12 (30%)</div>
              </div>

              <div className="stat">
                <div className="stat-title">Conversion Rate</div>
                <div className="stat-value">18.2%</div>
                <div className="stat-desc">↘︎ 2% less than last week</div>
              </div>

              <div className="stat">
                <div className="stat-title">Budget Spent</div>
                <div className="stat-value">$2,400</div>
                <div className="stat-desc">↗︎ $400 more than last month</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails; 