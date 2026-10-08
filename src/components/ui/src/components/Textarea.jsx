import React from 'react';
import PropTypes from 'prop-types';

export const Textarea = ({
  value,
  onChange,
  placeholder = '',
  disabled = false,
  readOnly = false,
  className = '',
  id,
  name,
  required = false,
  autoComplete = 'off',
  autoFocus = false,
  rows = 3,
  error = false,
  errorMessage = '',
  ...props
}) => {
  const baseClasses = 'block w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm';
  const stateClasses = error
    ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500';
  const disabledClasses = 'bg-gray-50 cursor-not-allowed';
  const readOnlyClasses = 'bg-gray-50';

  return (
    <div className={`space-y-1 ${className}`}>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        id={id}
        name={name}
        required={required}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        rows={rows}
        className={`${baseClasses} ${stateClasses} ${disabled ? disabledClasses : ''} ${readOnly ? readOnlyClasses : ''}`}
        aria-invalid={error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && errorMessage && (
        <p className="mt-1 text-sm text-red-600" id={`${id}-error`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

Textarea.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  rows: PropTypes.number,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
};