import Link from 'next/link';
import { FaHome, FaCog, FaUser } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-800 p-4 border-r border-gray-700 fixed top-0 left-0">
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-white text-center">EndPoint Guard Inc.</h3>
      </div>
      <nav className="flex flex-col space-y-2">
        <Link href="/dashboard" className="flex items-center space-x-2 py-2 px-3 rounded hover:bg-gray-700 text-gray-200">
          <FaHome />
          <span>Overview</span>
        </Link>
        <Link href="/dashboard/settings" className="flex items-center space-x-2 py-2 px-3 rounded hover:bg-gray-700 text-gray-200">
          <FaCog />
          <span>Settings</span>
        </Link>
        <Link href="/dashboard/profile" className="flex items-center space-x-2 py-2 px-3 rounded hover:bg-gray-700 text-gray-200">
          <FaUser />
          <span>Profile</span>
        </Link>
        {/* Add more links as needed */}
      </nav>
    </aside>
  );
} 