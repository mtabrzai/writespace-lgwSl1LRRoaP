import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { apiClient } from '../../../../api/apiClient';
import { Card } from '../../../../components/ui/src/components/Card';
import { Button } from '../../../../components/ui/src/components/Button';
import { Input } from '../../../../components/ui/src/components/Input';
import { Textarea } from '../../../../components/ui/src/components/Textarea';
import { LoadingSpinner } from '../../../../components/LoadingSpinner';
import { ErrorBoundary } from '../../../../components/ErrorBoundary';
import { sanitizeHtml } from '../../../../utils/sanitizeHtml';

export const BlogForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(!!id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ title: '', content: '' });
  const [serverError, setServerError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const response = await apiClient.get(`/posts/${id}`);
        if (response.data) {
          setTitle(response.data.title);
          setContent(response.data.content);
        }
      } catch (err) {
        setServerError(err.message || 'Failed to fetch post');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const validateForm = () => {
    let valid = true;
    const newErrors = { title: '', content: '' };

    if (!title.trim()) {
      newErrors.title = 'Title is required';
      valid = false;
    } else if (title.trim().length > 100) {
      newErrors.title = 'Title must be 100 characters or less';
      valid = false;
    }

    if (!content.trim()) {
      newErrors.content = 'Content is required';
      valid = false;
    } else if (content.trim().length > 10000) {
      newErrors.content = 'Content must be 10,000 characters or less';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setServerError('');

    try {
      const sanitizedContent = sanitizeHtml(content);
      const postData = { title, content: sanitizedContent };

      if (id) {
        await apiClient.put(`/posts/${id}`, postData);
      } else {
        await apiClient.post('/posts', postData);
      }

      navigate('/blogs');
    } catch (err) {
      setServerError(err.response?.data?.message || err.message || 'Failed to save post');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {id ? 'Edit Post' : 'Create New Post'}
          </h1>
          <Link to="/blogs" className="text-blue-600 hover:text-blue-500 transition-colors">
            ← Back to all posts
          </Link>
        </div>

        {serverError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-red-800 font-medium">Error</h3>
            <p className="text-red-600 mt-2">{serverError}</p>
          </div>
        )}

        <Card>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <div className="mt-1">
                <Input
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  error={!!errors.title}
                  errorMessage={errors.title}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <div className="mt-1">
                <Textarea
                  id="content"
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  error={!!errors.content}
                  errorMessage={errors.content}
                  rows={15}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Link to="/blogs">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Saving...
                  </>
                ) : id ? 'Update Post' : 'Publish Post'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </ErrorBoundary>
  );
};