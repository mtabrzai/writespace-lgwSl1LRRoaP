import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { apiClient } from '../../../../api/apiClient';
import { Card } from '../../../../components/ui/src/components/Card';
import { Button } from '../../../../components/ui/src/components/Button';
import { LoadingSpinner } from '../../../../components/LoadingSpinner';
import { ErrorBoundary } from '../../../../components/ErrorBoundary';
import { formatDate } from '../../../../utils/date';
import DOMPurify from 'dompurify';

export const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(`/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch post');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await apiClient.delete(`/posts/${id}`);
      navigate('/blogs');
    } catch (err) {
      setError(err.message || 'Failed to delete post');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-medium">Error</h3>
        <p className="text-red-600 mt-2">{error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-gray-500">Post not found.</p>
          <Link to="/blogs" className="mt-4 inline-block text-blue-600 hover:text-blue-500">
            Return to blog list
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Link to="/blogs" className="text-blue-600 hover:text-blue-500 transition-colors">
            ← Back to all posts
          </Link>
          {user && (user.id === post.authorId || user.role === 'admin') && (
            <div className="flex gap-2">
              <Link to={`/blogs/${post.id}/edit`}>
                <Button variant="secondary" size="sm">
                  Edit
                </Button>
              </Link>
              <Button
                variant="danger"
                size="sm"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        <Card>
          <article>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center text-sm text-gray-500 gap-4 mb-6">
              <span>By {post.author?.name || 'Unknown'}</span>
              <span>{formatDate(post.createdAt)}</span>
              {post.updatedAt && post.updatedAt !== post.createdAt && (
                <span className="text-gray-400">(Edited {formatDate(post.updatedAt)})</span>
              )}
            </div>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content, {
                  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'blockquote', 'code', 'pre'],
                  ALLOWED_ATTR: ['href', 'title', 'src', 'alt']
                })
              }}
            />
          </article>
        </Card>
      </div>
    </ErrorBoundary>
  );
};