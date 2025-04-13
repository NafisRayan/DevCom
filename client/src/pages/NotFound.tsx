import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <p className="mt-4 text-2xl font-semibold">Page not found</p>
        <p className="mt-2 text-base-content/70">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link to="/" className="btn btn-primary mt-8">
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 