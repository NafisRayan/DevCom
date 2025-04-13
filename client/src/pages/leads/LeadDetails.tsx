import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { leads } from '../../services/api';

const LeadDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: lead, isLoading } = useQuery({
    queryKey: ['leads', id],
    queryFn: () => leads.getById(id!),
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
        <h1 className="text-3xl font-bold">Lead Details</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/leads')}
            className="btn btn-ghost"
          >
            Back to Leads
          </button>
          <button className="btn btn-primary">Edit Lead</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Information */}
        <div className="bg-base-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Lead Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium opacity-70">Name</label>
              <p className="text-lg">{lead?.data?.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium opacity-70">Email</label>
              <p className="text-lg">{lead?.data?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium opacity-70">Phone</label>
              <p className="text-lg">{lead?.data?.phone || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm font-medium opacity-70">Source</label>
              <p className="text-lg">{lead?.data?.source}</p>
            </div>
            <div>
              <label className="text-sm font-medium opacity-70">Status</label>
              <span className={`badge ml-2 ${
                lead?.data?.status === 'qualified' ? 'badge-success' :
                lead?.data?.status === 'pending' ? 'badge-warning' :
                'badge-error'
              }`}>
                {lead?.data?.status}
              </span>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-base-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium opacity-70">Company</label>
              <p className="text-lg">{lead?.data?.company || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm font-medium opacity-70">Position</label>
              <p className="text-lg">{lead?.data?.position || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm font-medium opacity-70">Notes</label>
              <p className="text-lg whitespace-pre-wrap">
                {lead?.data?.notes || 'No notes available'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium opacity-70">Created At</label>
              <p className="text-lg">
                {new Date(lead?.data?.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium opacity-70">Last Updated</label>
              <p className="text-lg">
                {new Date(lead?.data?.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails; 