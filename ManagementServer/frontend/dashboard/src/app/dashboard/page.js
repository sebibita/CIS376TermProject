import EventDashboard from '@components/EventDash';
import Sidebar from '@components/Sidebar';

export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
        <EventDashboard /> {/* Render the event dashboard here */}
      </main>
    </div>
  );
}
