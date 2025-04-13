import React from 'react';
import { useQuery } from '@tanstack/react-query';

const Profile: React.FC = () => {
  // Mock user data - in a real app, this would come from your auth context or API
  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Administrator',
    company: 'Acme Inc.',
    phone: '+1 (555) 123-4567',
    avatar: 'https://placehold.co/400',
    joinDate: '2023-01-15',
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <div className="bg-base-100 p-6 rounded-lg shadow">
            <div className="flex flex-col items-center">
              <div className="avatar mb-4">
                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={mockUser.avatar} alt={mockUser.name} />
                </div>
              </div>
              <h2 className="text-2xl font-semibold">{mockUser.name}</h2>
              <p className="text-base-content/70">{mockUser.role}</p>
              <div className="badge badge-primary mt-2">{mockUser.company}</div>
            </div>

            <div className="divider"></div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium opacity-70">Email</label>
                <p className="text-base">{mockUser.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium opacity-70">Phone</label>
                <p className="text-base">{mockUser.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium opacity-70">Member Since</label>
                <p className="text-base">
                  {new Date(mockUser.joinDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity & Settings */}
        <div className="lg:col-span-2">
          {/* Recent Activity */}
          <div className="bg-base-100 p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="badge badge-primary">Campaign</div>
                <div>
                  <p className="font-medium">Created new campaign "Summer Sale 2024"</p>
                  <p className="text-sm opacity-70">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="badge badge-secondary">Lead</div>
                <div>
                  <p className="font-medium">Added 5 new leads to "Product Launch"</p>
                  <p className="text-sm opacity-70">Yesterday</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="badge badge-accent">Page</div>
                <div>
                  <p className="font-medium">Updated landing page "Black Friday Special"</p>
                  <p className="text-sm opacity-70">3 days ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-base-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <form className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email Notifications</span>
                </label>
                <div className="flex items-center gap-4">
                  <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                  <span className="text-sm opacity-70">
                    Receive email updates about your account activity
                  </span>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Two-Factor Authentication</span>
                </label>
                <div className="flex items-center gap-4">
                  <input type="checkbox" className="toggle toggle-primary" />
                  <span className="text-sm opacity-70">
                    Enable two-factor authentication for enhanced security
                  </span>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Public Profile</span>
                </label>
                <div className="flex items-center gap-4">
                  <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                  <span className="text-sm opacity-70">
                    Make your profile visible to other users
                  </span>
                </div>
              </div>

              <button className="btn btn-primary mt-4">Save Settings</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 