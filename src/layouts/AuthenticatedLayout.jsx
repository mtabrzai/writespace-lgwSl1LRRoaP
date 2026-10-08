import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import PropTypes from 'prop-types';

export const AuthenticatedLayout = ({ className = '' }) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

AuthenticatedLayout.propTypes = {
  className: PropTypes.string,
};