import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Settings */}
        <div className="lg:col-span-2">
          <div className="bg-base-100 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
            <form className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Company</span>
                </label>
                <input
                  type="text"
                  placeholder="Acme Inc."
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="input input-bordered w-full"
                />
              </div>

              <button className="btn btn-primary">Save Changes</button>
            </form>
          </div>

          {/* API Keys */}
          <div className="bg-base-100 rounded-lg shadow p-6 mt-8">
            <h2 className="text-xl font-semibold mb-6">API Keys</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                <div>
                  <h3 className="font-medium">Production API Key</h3>
                  <p className="text-sm opacity-70">Last used 2 days ago</p>
                </div>
                <button className="btn btn-sm">Show Key</button>
              </div>

              <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                <div>
                  <h3 className="font-medium">Development API Key</h3>
                  <p className="text-sm opacity-70">Last used 5 hours ago</p>
                </div>
                <button className="btn btn-sm">Show Key</button>
              </div>

              <button className="btn btn-outline">Generate New API Key</button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div>
          <div className="bg-base-100 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm opacity-70">
                    Receive email updates about your account
                  </p>
                </div>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Lead Alerts</h3>
                  <p className="text-sm opacity-70">
                    Get notified when new leads are captured
                  </p>
                </div>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Campaign Updates</h3>
                  <p className="text-sm opacity-70">
                    Receive updates about your campaign performance
                  </p>
                </div>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Weekly Reports</h3>
                  <p className="text-sm opacity-70">
                    Get weekly summary reports via email
                  </p>
                </div>
                <input type="checkbox" className="toggle toggle-primary" />
              </div>
            </div>
          </div>

          {/* Billing Settings */}
          <div className="bg-base-100 rounded-lg shadow p-6 mt-8">
            <h2 className="text-xl font-semibold mb-6">Billing Settings</h2>
            <div className="space-y-4">
              <div className="p-4 bg-base-200 rounded-lg">
                <h3 className="font-medium">Current Plan</h3>
                <p className="text-sm opacity-70">Professional Plan</p>
                <p className="text-sm opacity-70">$49/month</p>
              </div>

              <button className="btn btn-outline w-full">Upgrade Plan</button>
              <button className="btn btn-ghost w-full">Billing History</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 