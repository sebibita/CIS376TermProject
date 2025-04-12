'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@components/Sidebar';
import Navbar from '@components/Navbar';

const EVENT_CATEGORIES = ['All', 'Security', 'Performance', 'System'];

export default function EventDashboard() {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/dbtest', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        // Ensure data is an array
        setEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events');
        setEvents([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [category, search, page]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Event Stream</h1>

          {/* Category Filters */}
          <div className="flex space-x-4 mb-4">
            {EVENT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded ${category === cat ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => {
                  setCategory(cat);
                  setPage(1);
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search events..."
            className="p-2 border rounded w-full mb-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Event List */}
          <div className="border rounded p-4 h-96 overflow-y-auto bg-white">
            {loading ? (
              <p>Loading events...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : events.length === 0 ? (
              <p>No events found</p>
            ) : (
              events.map((event, index) => (
                <div key={index} className="border-b py-2">
                  <p className="font-semibold">{event.type || 'Unknown'} - {event.severity || 'N/A'}</p>
                  <p className="text-sm text-gray-600">{event.message || 'No message'}</p>
                </div>
              ))
            )}
          </div>

          {/* Load More Button */}
          <button
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Load More
          </button>
        </main>
      </div>
    </div>
  );
}
