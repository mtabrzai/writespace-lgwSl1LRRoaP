import React from 'react';
import PropTypes from 'prop-types';
import { generateAvatar } from '../utils/avatar';

export const Avatar = ({ name, src, size = 'md', className = '', role }) => {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  };

  const roleColors = {
    admin: 'ring-2 ring-red-500',
    editor: 'ring-2 ring-blue-500',
    viewer: 'ring-2 ring-gray-300',
  };

  const avatarContent = src ? (
    <img
      src={src}
      alt={`${name}'s avatar`}
      className={`object-cover rounded-full ${sizeClasses[size]} ${roleColors[role] || ''} ${className}`}
    />
  ) : (
    <div
      className={`flex items-center justify-center rounded-full ${sizeClasses[size]} ${roleColors[role] || ''} ${className}`}
      style={{ backgroundColor: generateAvatar(name, parseInt(sizeClasses[size].split(' ')[0].slice(1)) }}
      aria-label={`${name}'s avatar`}
    >
      <span className="font-medium text-white">
        {name ? name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() : '?'}
      </span>
    </div>
  );

  return avatarContent;
};

Avatar.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
  role: PropTypes.oneOf(['admin', 'editor', 'viewer']),
};