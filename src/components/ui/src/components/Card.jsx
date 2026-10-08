import React from 'react';
import PropTypes from 'prop-types';

export const Card = ({
  children,
  className = '',
  shadow = 'md',
  padding = 'p-6',
  rounded = 'rounded-lg',
  border = true,
  ...props
}) => {
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  return (
    <div
      className={`${rounded} ${border ? 'border border-gray-200' : ''} bg-white ${padding} ${shadowClasses[shadow]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  shadow: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
  padding: PropTypes.string,
  rounded: PropTypes.string,
  border: PropTypes.bool,
};