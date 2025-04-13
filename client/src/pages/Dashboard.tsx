import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { leads, campaigns } from '../services/api';

const Dashboard: React.FC = () => {
  const { data: leadsData } = useQuery({
    queryKey: ['leads'],
    queryFn: () => leads.getAll(),
  });

  const { data: campaignsData } = useQuery({
    queryKey: ['campaigns'],
    queryFn: () => campaigns.getAll(),
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Total Leads</div>
          <div className="stat-value">{leadsData?.data?.length || 0}</div>
          <div className="stat-desc">↗︎ 13% more than last month</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Active Campaigns</div>
          <div className="stat-value">{campaignsData?.data?.length || 0}</div>
          <div className="stat-desc">↗︎ 2 new this week</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Conversion Rate</div>
          <div className="stat-value">24.3%</div>
          <div className="stat-desc">↘︎ 3% less than last month</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Revenue</div>
          <div className="stat-value">$12.5k</div>
          <div className="stat-desc">↗︎ $2.1k more than last month</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Recent Leads */}
        <div className="bg-base-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Leads</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Source</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leadsData?.data?.slice(0, 5).map((lead: any) => (
                  <tr key={lead._id}>
                    <td>{lead.name}</td>
                    <td>{lead.source}</td>
                    <td>
                      <span className={`badge ${
                        lead.status === 'qualified' ? 'badge-success' :
                        lead.status === 'pending' ? 'badge-warning' :
                        'badge-error'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="bg-base-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Active Campaigns</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {campaignsData?.data?.slice(0, 5).map((campaign: any) => (
                  <tr key={campaign._id}>
                    <td>{campaign.name}</td>
                    <td>
                      <span className={`badge ${
                        campaign.status === 'active' ? 'badge-success' :
                        campaign.status === 'draft' ? 'badge-warning' :
                        'badge-error'
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td>
                      <progress 
                        className="progress progress-primary w-full" 
                        value={campaign.progress || 0} 
                        max="100"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 