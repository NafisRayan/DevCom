import React from 'react';

const Analytics: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Overview Stats */}
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Total Leads</div>
          <div className="stat-value">1,248</div>
          <div className="stat-desc">↗︎ 14% more than last month</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Conversion Rate</div>
          <div className="stat-value">23.8%</div>
          <div className="stat-desc">↗︎ 2.1% more than last month</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Active Campaigns</div>
          <div className="stat-value">12</div>
          <div className="stat-desc">↗︎ 3 new this month</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Revenue</div>
          <div className="stat-value">$45.2k</div>
          <div className="stat-desc">↗︎ 8.2% more than last month</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Lead Sources */}
        <div className="bg-base-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Lead Sources</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Leads</th>
                  <th>Conversion</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Organic Search</td>
                  <td>458</td>
                  <td>24.5%</td>
                  <td>$12,450</td>
                </tr>
                <tr>
                  <td>Social Media</td>
                  <td>385</td>
                  <td>18.2%</td>
                  <td>$8,920</td>
                </tr>
                <tr>
                  <td>Email Marketing</td>
                  <td>245</td>
                  <td>32.1%</td>
                  <td>$15,680</td>
                </tr>
                <tr>
                  <td>Referrals</td>
                  <td>160</td>
                  <td>28.7%</td>
                  <td>$8,150</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Campaign Performance */}
        <div className="bg-base-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Campaign Performance</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Status</th>
                  <th>Leads</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Summer Sale</td>
                  <td>
                    <span className="badge badge-success">Active</span>
                  </td>
                  <td>245</td>
                  <td>
                    <progress
                      className="progress progress-primary w-20"
                      value="75"
                      max="100"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Product Launch</td>
                  <td>
                    <span className="badge badge-warning">Draft</span>
                  </td>
                  <td>0</td>
                  <td>
                    <progress
                      className="progress progress-primary w-20"
                      value="15"
                      max="100"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Black Friday</td>
                  <td>
                    <span className="badge badge-success">Active</span>
                  </td>
                  <td>189</td>
                  <td>
                    <progress
                      className="progress progress-primary w-20"
                      value="45"
                      max="100"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Holiday Special</td>
                  <td>
                    <span className="badge badge-error">Ended</span>
                  </td>
                  <td>312</td>
                  <td>
                    <progress
                      className="progress progress-primary w-20"
                      value="100"
                      max="100"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 