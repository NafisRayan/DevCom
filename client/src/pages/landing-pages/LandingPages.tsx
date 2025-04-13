import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { landingPages } from '../../services/api';

const LandingPages: React.FC = () => {
  const { data: pagesData, isLoading } = useQuery({
    queryKey: ['landing-pages'],
    queryFn: () => landingPages.getAll(),
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
        <h1 className="text-3xl font-bold">Landing Pages</h1>
        <Link to="/landing-pages/new" className="btn btn-primary">
          Create Landing Page
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pagesData?.data?.map((page: any) => (
          <div key={page._id} className="card bg-base-100 shadow-xl">
            <figure className="px-6 pt-6">
              <img
                src={page.thumbnail || 'https://placehold.co/600x400'}
                alt={page.name}
                className="rounded-xl h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {page.name}
                <span className={`badge ${
                  page.status === 'published' ? 'badge-success' :
                  page.status === 'draft' ? 'badge-warning' :
                  'badge-error'
                }`}>
                  {page.status}
                </span>
              </h2>
              <p className="text-base-content/70">{page.description}</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Views</span>
                  <span className="badge badge-neutral">{page.views || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Conversions</span>
                  <span className="badge badge-neutral">{page.conversions || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Conversion Rate</span>
                  <span className="badge badge-neutral">
                    {page.views ? ((page.conversions || 0) / page.views * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>
              <div className="card-actions justify-end mt-4">
                {page.status === 'published' && (
                  <a
                    href={page.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-ghost"
                  >
                    Visit Page
                  </a>
                )}
                <Link
                  to={`/landing-pages/${page._id}`}
                  className="btn btn-sm btn-primary"
                >
                  Edit Page
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPages; 