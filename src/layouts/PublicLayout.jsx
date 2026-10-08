import React from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PublicLayout = ({ className = '' }) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <Outlet />
    </div>
  );
};

PublicLayout.propTypes = {
  className: PropTypes.string,
};