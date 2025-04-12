'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ThemeToggleButton from './ThemeToggleButton';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in (you can modify this based on your auth implementation)
    const checkLoginStatus = () => {
      // For now, we'll just check if we're on the dashboard
      const isOnDashboard = window.location.pathname.includes('/dashboard');
      setIsLoggedIn(isOnDashboard);
    };

    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    // Add any logout logic here if needed
    router.push('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link href="/">EndPoint Guard Inc.</Link>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggleButton />
          {isLoggedIn ? (
            <button 
              onClick={handleLogout}
              className="hover:text-gray-300"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="hover:text-gray-300">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
} 