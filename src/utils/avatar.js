/**
 * Generate avatar initials from a name
 * @param {string} name - Full name
 * @param {number} [maxLength=2] - Maximum number of initials to return
 * @returns {string} Initials (uppercase)
 */
export const getInitials = (name, maxLength = 2) => {
  if (!name || typeof name !== 'string') return '';

  const parts = name.trim().split(/\s+/);
  const initials = parts
    .filter(part => part.length > 0)
    .map(part => part[0].toUpperCase())
    .slice(0, maxLength)
    .join('');

  return initials;
};

/**
 * Generate a deterministic color from a string
 * @param {string} str - Input string (e.g., email or name)
 * @returns {string} Hex color code
 */
export const stringToColor = (str) => {
  if (!str || typeof str !== 'string') return '#666666';

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 60%)`;
};

/**
 * Generate avatar URL using initials and background color
 * @param {string} name - Full name
 * @param {number} [size=40] - Avatar size in pixels
 * @returns {string} SVG data URL
 */
export const generateAvatar = (name, size = 40) => {
  const initials = getInitials(name);
  const color = stringToColor(name);
  const fontSize = Math.floor(size * 0.4);

  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <rect width="${size}" height="${size}" fill="${color}" rx="${size / 2}"/>
      <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="white" font-size="${fontSize}" font-family="Arial, sans-serif" font-weight="bold">${initials}</text>
    </svg>`
  )}`;
};