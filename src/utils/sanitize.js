import DOMPurify from 'dompurify';

export const sanitizeHtml = (dirtyHtml, config) => {
  if (!dirtyHtml) return '';

  const defaultConfig = {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  };

  return DOMPurify.sanitize(dirtyHtml, config || defaultConfig);
};