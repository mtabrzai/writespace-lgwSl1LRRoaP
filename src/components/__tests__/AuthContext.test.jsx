import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';
import { apiClient } from '../../api/apiClient';
import { mockGet, mockPost } from '../../api/__mocks__/apiClient';

vi.mock('../../api/apiClient');

const TestComponent = () => {
  const { user, isLoading, error, login, register, logout } = useAuth();
  return (
    <div>
      <div data-testid="user">{user ? user.name : 'null'}</div>
      <div data-testid="isLoading">{isLoading.toString()}</div>
      <div data-testid="error">{error || 'null'}</div>
      <button onClick={() => login({ email: 'test@example.com', password: 'password' })}>Login</button>
      <button onClick={() => register({ name: 'Test User', email: 'test@example.com', password: 'password' })}>Register</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('throws an error when used outside of AuthProvider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TestComponent />)).toThrow('useAuth must be used within an AuthProvider');
    consoleError.mockRestore();
  });

  it('initializes with null user and isLoading true', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user')).toHaveTextContent('null');
    expect(screen.getByTestId('isLoading')).toHaveTextContent('true');
    expect(screen.getByTestId('error')).toHaveTextContent('null');
  });

  it('validates token on mount and sets user', async () => {
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com', role: 'user' };
    mockGet.mockResolvedValue({ data: { user: mockUser } });

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    expect(mockGet).toHaveBeenCalledWith('/auth/validate');
    expect(screen.getByTestId('user')).toHaveTextContent('Test User');
    expect(screen.getByTestId('isLoading')).toHaveTextContent('false');
  });

  it('handles token validation error', async () => {
    mockGet.mockRejectedValue(new Error('Invalid token'));

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    expect(screen.getByTestId('user')).toHaveTextContent('null');
    expect(screen.getByTestId('isLoading')).toHaveTextContent('false');
    expect(localStorage.getItem('authToken')).toBeNull();
  });

  it('successfully logs in and sets user', async () => {
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com', role: 'user' };
    const mockToken = 'test-token';
    mockPost.mockResolvedValue({ data: { user: mockUser, token: mockToken } });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText('Login').click();
    });

    expect(mockPost).toHaveBeenCalledWith('/auth/login', { email: 'test@example.com', password: 'password' });
    expect(screen.getByTestId('user')).toHaveTextContent('Test User');
    expect(localStorage.getItem('authToken')).toBe(JSON.stringify(mockToken));
  });

  it('handles login error', async () => {
    mockPost.mockRejectedValue({ response: { data: { message: 'Invalid credentials' } } });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText('Login').click();
    });

    expect(screen.getByTestId('error')).toHaveTextContent('Invalid credentials');
  });

  it('successfully registers and sets user', async () => {
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com', role: 'user' };
    const mockToken = 'test-token';
    mockPost.mockResolvedValue({ data: { user: mockUser, token: mockToken } });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText('Register').click();
    });

    expect(mockPost).toHaveBeenCalledWith('/auth/register', {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password'
    });
    expect(screen.getByTestId('user')).toHaveTextContent('Test User');
    expect(localStorage.getItem('authToken')).toBe(JSON.stringify(mockToken));
  });

  it('handles register error', async () => {
    mockPost.mockRejectedValue({ response: { data: { message: 'Email already exists' } } });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText('Register').click();
    });

    expect(screen.getByTestId('error')).toHaveTextContent('Email already exists');
  });

  it('clears user and token on logout', async () => {
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com', role: 'user' };
    mockGet.mockResolvedValue({ data: { user: mockUser } });

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    await act(async () => {
      screen.getByText('Logout').click();
    });

    expect(screen.getByTestId('user')).toHaveTextContent('null');
    expect(localStorage.getItem('authToken')).toBeNull();
  });

  it('handles storage events', async () => {
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com', role: 'user' };
    mockGet.mockResolvedValue({ data: { user: mockUser } });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'authToken',
        newValue: JSON.stringify('new-token')
      }));
    });

    expect(mockGet).toHaveBeenCalledWith('/auth/validate');
  });
});