import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { landingPages } from '../../services/api';

const LandingPageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: page, isLoading } = useQuery({
    queryKey: ['landing-pages', id],
    queryFn: () => landingPages.getById(id!),
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
        <h1 className="text-3xl font-bold">Landing Page Details</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/landing-pages')}
            className="btn btn-ghost"
          >
            Back to Pages
          </button>
          {page?.data?.status === 'published' && (
            <a
              href={page.data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Visit Page
            </a>
          )}
          <button className="btn btn-primary">Edit Page</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Page Preview */}
        <div className="lg:col-span-2">
          <div className="bg-base-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Page Preview</h2>
            <div className="aspect-video rounded-lg overflow-hidden bg-base-300">
              <img
                src={page?.data?.thumbnail || 'https://placehold.co/1200x800'}
                alt={page?.data?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium opacity-70">Name</label>
                <p className="text-lg">{page?.data?.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium opacity-70">Description</label>
                <p className="text-lg whitespace-pre-wrap">
                  {page?.data?.description}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium opacity-70">Status</label>
                <span className={`badge ml-2 ${
                  page?.data?.status === 'published' ? 'badge-success' :
                  page?.data?.status === 'draft' ? 'badge-warning' :
                  'badge-error'
                }`}>
                  {page?.data?.status}
                </span>
              </div>
              {page?.data?.url && (
                <div>
                  <label className="text-sm font-medium opacity-70">URL</label>
                  <p className="text-lg break-all">
                    <a
                      href={page.data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link-primary"
                    >
                      {page.data.url}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page Stats */}
        <div className="lg:col-span-1">
          <div className="bg-base-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Page Statistics</h2>
            <div className="stats stats-vertical shadow w-full">
              <div className="stat">
                <div className="stat-title">Total Views</div>
                <div className="stat-value">{page?.data?.views || 0}</div>
                <div className="stat-desc">↗︎ 45 (14%)</div>
              </div>

              <div className="stat">
                <div className="stat-title">Conversions</div>
                <div className="stat-value">{page?.data?.conversions || 0}</div>
                <div className="stat-desc">↗︎ 12 (9%)</div>
              </div>

              <div className="stat">
                <div className="stat-title">Conversion Rate</div>
                <div className="stat-value">
                  {page?.data?.views
                    ? ((page.data.conversions || 0) / page.data.views * 100).toFixed(1)
                    : 0}%
                </div>
                <div className="stat-desc">↗︎ 2.3% from last week</div>
              </div>
            </div>
          </div>

          <div className="bg-base-100 p-6 rounded-lg shadow mt-6">
            <h2 className="text-xl font-semibold mb-4">Page Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium opacity-70">Created At</label>
                <p className="text-lg">
                  {new Date(page?.data?.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium opacity-70">Last Updated</label>
                <p className="text-lg">
                  {new Date(page?.data?.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium opacity-70">Campaign</label>
                <p className="text-lg">{page?.data?.campaign?.name || 'None'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageDetails; 