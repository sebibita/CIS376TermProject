'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed');
        setIsLoading(false);
        return;
      }

      // Successful registration
      router.push('/login');
    } catch (err) {
      setError('An error occurred during registration');
      setIsLoading(false);
    }
  };

  return (
    <main className="auth-page flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm p-8 auth-card rounded-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create account</h1>
          <p className="text-sm opacity-75">Join us to get started</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="auth-input"
              placeholder="Choose a username"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="auth-input"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="auth-link">Sign in instead</Link>
        </p>
      </div>
    </main>
  );
} 