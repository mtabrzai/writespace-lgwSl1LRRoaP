/**
 * Format a date to a human-readable string
 * @param {Date|string|number} date - The date to format
 * @param {string} [format='medium'] - Format style ('short', 'medium', 'long', 'full', or custom pattern)
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'medium') => {
  if (!date) return '';

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return '';

  const options = {};

  switch (format) {
    case 'short':
      return dateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    case 'medium':
      return dateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    case 'long':
      return dateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    case 'full':
      return dateObj.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    default:
      // Custom format pattern (e.g., 'yyyy-MM-dd')
      return format
        .replace('yyyy', dateObj.getFullYear())
        .replace('MM', String(dateObj.getMonth() + 1).padStart(2, '0'))
        .replace('dd', String(dateObj.getDate()).padStart(2, '0'))
        .replace('HH', String(dateObj.getHours()).padStart(2, '0'))
        .replace('mm', String(dateObj.getMinutes()).padStart(2, '0'))
        .replace('ss', String(dateObj.getSeconds()).padStart(2, '0'));
  }
};

/**
 * Calculate the time difference between two dates
 * @param {Date|string|number} date1 - First date
 * @param {Date|string|number} date2 - Second date
 * @param {string} [unit='days'] - Unit of time ('seconds', 'minutes', 'hours', 'days', 'months', 'years')
 * @returns {number} Difference in the specified unit
 */
export const dateDiff = (date1, date2, unit = 'days') => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 0;

  const diffTime = Math.abs(d2 - d1);
  const diffSeconds = Math.ceil(diffTime / 1000);

  switch (unit) {
    case 'seconds':
      return diffSeconds;
    case 'minutes':
      return Math.ceil(diffSeconds / 60);
    case 'hours':
      return Math.ceil(diffSeconds / (60 * 60));
    case 'days':
      return Math.ceil(diffSeconds / (60 * 60 * 24));
    case 'months':
      return Math.ceil(diffSeconds / (60 * 60 * 24 * 30));
    case 'years':
      return Math.ceil(diffSeconds / (60 * 60 * 24 * 365));
    default:
      return diffSeconds;
  }
};

/**
 * Check if a date is in the past
 * @param {Date|string|number} date - The date to check
 * @returns {boolean} True if the date is in the past
 */
export const isPastDate = (date) => {
  if (!date) return false;
  const dateObj = new Date(date);
  return !isNaN(dateObj.getTime()) && dateObj < new Date();
};

/**
 * Check if a date is in the future
 * @param {Date|string|number} date - The date to check
 * @returns {boolean} True if the date is in the future
 */
export const isFutureDate = (date) => {
  if (!date) return false;
  const dateObj = new Date(date);
  return !isNaN(dateObj.getTime()) && dateObj > new Date();
};

/**
 * Add time to a date
 * @param {Date|string|number} date - The original date
 * @param {number} amount - The amount of time to add
 * @param {string} [unit='days'] - Unit of time ('seconds', 'minutes', 'hours', 'days', 'months', 'years')
 * @returns {Date} New date with time added
 */
export const addToDate = (date, amount, unit = 'days') => {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return new Date(NaN);

  switch (unit) {
    case 'seconds':
      dateObj.setSeconds(dateObj.getSeconds() + amount);
      break;
    case 'minutes':
      dateObj.setMinutes(dateObj.getMinutes() + amount);
      break;
    case 'hours':
      dateObj.setHours(dateObj.getHours() + amount);
      break;
    case 'days':
      dateObj.setDate(dateObj.getDate() + amount);
      break;
    case 'months':
      dateObj.setMonth(dateObj.getMonth() + amount);
      break;
    case 'years':
      dateObj.setFullYear(dateObj.getFullYear() + amount);
      break;
    default:
      dateObj.setDate(dateObj.getDate() + amount);
  }

  return dateObj;
};