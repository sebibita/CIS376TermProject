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

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5001/test`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store', // Ensures fresh data
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
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
            ) : (
              events.map((event, index) => (
                <div key={index} className="border-b py-2">
                  <p className="font-semibold">{event.type} - {event.severity}</p>
                  <p className="text-sm text-gray-600">{event.message}</p>
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
