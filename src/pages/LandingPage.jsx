import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/src/components/Button';
import { Card } from '../components/ui/src/components/Card';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
              Write without distractions
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Writespace is a clean, minimal writing environment designed to help you focus on what matters most: your words.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Features</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to write better, faster, and with more focus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <div className="flex items-center mb-4">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <h3 className="ml-3 text-xl font-semibold text-gray-900">Distraction-Free</h3>
              </div>
              <p className="text-gray-600">
                A minimal interface that removes all distractions, allowing you to focus solely on your writing.
              </p>
            </Card>

            <Card>
              <div className="flex items-center mb-4">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="ml-3 text-xl font-semibold text-gray-900">Responsive Design</h3>
              </div>
              <p className="text-gray-600">
                Works seamlessly on any device, from desktop to mobile, so you can write wherever you are.
              </p>
            </Card>

            <Card>
              <div className="flex items-center mb-4">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <h3 className="ml-3 text-xl font-semibold text-gray-900">Organized Writing</h3>
              </div>
              <p className="text-gray-600">
                Keep your work organized with folders and tags, making it easy to find what you need.
              </p>
            </Card>

            <Card>
              <div className="flex items-center mb-4">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <h3 className="ml-3 text-xl font-semibold text-gray-900">Secure & Private</h3>
              </div>
              <p className="text-gray-600">
                Your work is private and secure, with optional encryption for sensitive documents.
              </p>
            </Card>

            <Card>
              <div className="flex items-center mb-4">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                <h3 className="ml-3 text-xl font-semibold text-gray-900">Export Options</h3>
              </div>
              <p className="text-gray-600">
                Export your writing in multiple formats including Markdown, PDF, and Word.
              </p>
            </Card>

            <Card>
              <div className="flex items-center mb-4">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <h3 className="ml-3 text-xl font-semibold text-gray-900">Fast Performance</h3>
              </div>
              <p className="text-gray-600">
                Built with performance in mind, ensuring a smooth writing experience even with large documents.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Ready to start writing?</h2>
            <p className="mt-4 text-lg text-blue-100 max-w-3xl mx-auto">
              Join thousands of writers who trust Writespace for their creative and professional work.
            </p>
            <div className="mt-8">
              <Link to="/register">
                <Button variant="secondary" size="lg">
                  Sign Up Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};