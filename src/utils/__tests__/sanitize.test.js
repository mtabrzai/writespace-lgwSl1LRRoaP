import { sanitizeHtml } from '../sanitizeHtml';
import DOMPurify from 'dompurify';

vi.mock('dompurify', () => ({
  default: {
    sanitize: vi.fn((html) => html),
    setConfig: vi.fn(),
  },
}));

describe('sanitizeHtml', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sanitizes HTML with default config', () => {
    const dirtyHtml = '<script>alert("xss")</script><p>Safe content</p>';
    const result = sanitizeHtml(dirtyHtml);
    expect(DOMPurify.sanitize).toHaveBeenCalledWith(dirtyHtml, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    });
    expect(result).toBe(dirtyHtml);
  });

  it('sanitizes HTML with custom config', () => {
    const dirtyHtml = '<div>Custom content</div>';
    const customConfig = { ALLOWED_TAGS: ['div'] };
    const result = sanitizeHtml(dirtyHtml, customConfig);
    expect(DOMPurify.sanitize).toHaveBeenCalledWith(dirtyHtml, customConfig);
    expect(result).toBe(dirtyHtml);
  });

  it('returns empty string when input is empty', () => {
    const result = sanitizeHtml('');
    expect(DOMPurify.sanitize).toHaveBeenCalledWith('', expect.any(Object));
    expect(result).toBe('');
  });

  it('handles null and undefined inputs', () => {
    const result1 = sanitizeHtml(null);
    const result2 = sanitizeHtml(undefined);
    expect(result1).toBe('');
    expect(result2).toBe('');
  });

  it('sanitizes HTML with additional allowed attributes', () => {
    const dirtyHtml = '<a href="https://example.com" title="Example">Link</a>';
    const customConfig = {
      ALLOWED_TAGS: ['a'],
      ALLOWED_ATTR: ['href', 'title']
    };
    const result = sanitizeHtml(dirtyHtml, customConfig);
    expect(DOMPurify.sanitize).toHaveBeenCalledWith(dirtyHtml, customConfig);
    expect(result).toBe(dirtyHtml);
  });

  it('removes disallowed tags', () => {
    const dirtyHtml = '<script>alert("xss")</script><p>Safe content</p>';
    const customConfig = { ALLOWED_TAGS: ['p'] };
    const result = sanitizeHtml(dirtyHtml, customConfig);
    expect(DOMPurify.sanitize).toHaveBeenCalledWith(dirtyHtml, customConfig);
    expect(result).toBe('<p>Safe content</p>');
  });
});