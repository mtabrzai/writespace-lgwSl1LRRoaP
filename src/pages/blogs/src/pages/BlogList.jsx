import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { apiClient } from '../../../api/apiClient';
import { Card } from '../../../components/ui/src/components/Card';
import { Button } from '../../../components/ui/src/components/Button';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { formatDate } from '../../../utils/date';

export const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get('/posts');
        setPosts(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await apiClient.delete(`/posts/${postId}`);
      setPosts(posts.filter(post => post.id !== postId));
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

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          {user && (
            <Link to="/blogs/new">
              <Button variant="primary">Create New Post</Button>
            </Link>
          )}
        </div>

        {posts.length === 0 ? (
          <Card>
            <div className="text-center py-8">
              <p className="text-gray-500">No blog posts found.</p>
              {user && (
                <p className="mt-2 text-gray-500">
                  <Link to="/blogs/new" className="text-blue-600 hover:text-blue-500">
                    Create your first post
                  </Link>
                </p>
              )}
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.map(post => (
              <Card key={post.id}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Link
                        to={`/blogs/${post.id}`}
                        className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                      {user && user.id === post.authorId && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Author
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 gap-4">
                      <span>By {post.author?.name || 'Unknown'}</span>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    <p className="mt-2 text-gray-600 line-clamp-2">{post.content}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-4 sm:mt-0 sm:ml-4">
                    <Link to={`/blogs/${post.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                    {user && (user.id === post.authorId || user.role === 'admin') && (
                      <>
                        <Link to={`/blogs/${post.id}/edit`}>
                          <Button variant="secondary" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(post.id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};