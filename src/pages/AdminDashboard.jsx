import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaChartLine, FaSignOutAlt, FaCog, FaDatabase, FaBell } from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0c] text-white font-sans overflow-hidden">

      {/* --- Sidebar --- */}
      <aside className="w-64 bg-white/5 backdrop-blur-2xl border-r border-white/10 p-6 flex flex-col z-20">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-black bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            BLOOMS
          </h1>
          <p className="text-[10px] text-gray-500 tracking-widest uppercase">Admin Panel</p>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem icon={<FaDatabase />} label="Dashboard" active />
          <NavItem icon={<FaUsers />} label="Users" />
          <NavItem icon={<FaChartLine />} label="Analytics" />
          <NavItem icon={<FaCog />} label="Settings" />
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all mt-auto"
        >
          <FaSignOutAlt /> <span className="text-sm font-semibold">Logout</span>
        </button>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 relative overflow-y-auto p-8 custom-scrollbar">

        {/* Background Decorative Glows */}
        <div className="absolute -top-[10%] -right-[10%] w-125 h-125 bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute -bottom-[10%] -left-[10%] w-100 h-100 bg-purple-600/10 rounded-full blur-[100px] -z-10"></div>

        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold">Welcome back, Admin</h2>
            <p className="text-gray-400 text-sm">Here's what's happening with your project today.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-all relative">
              <FaBell className="text-gray-400" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>
            <div className="h-10 w-10 rounded-full bg-linear-to-tr from-blue-500 to-purple-600 border-2 border-white/20"></div>
          </div>
        </header>

        {/* --- Stats Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Users" value="2,845" icon={<FaUsers />} growth="+12%" />
          <StatCard title="Revenue" value="$14,200" icon={<FaChartLine />} growth="+8.4%" />
          <StatCard title="Active Sessions" value="432" icon={<FaDatabase />} growth="-2%" />
        </div>

        {/* --- Recent Activity Table --- */}
        <section className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl">
          <h3 className="text-xl font-bold mb-6">Recent Registrations</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-white/10">
                  <th className="pb-4 font-semibold">User</th>
                  <th className="pb-4 font-semibold">Status</th>
                  <th className="pb-4 font-semibold">Joined Date</th>
                  <th className="pb-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <TableRow name="Arjun Mehra" email="arjun@example.com" status="Active" date="Oct 24, 2025" />
                <TableRow name="Sarah Khan" email="sarah@example.com" status="Pending" date="Oct 23, 2025" />
                <TableRow name="Rahul Verma" email="rahul@example.com" status="Active" date="Oct 22, 2025" />
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

// --- Helper Components ---

const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition-all ${active ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
    <span className="text-lg">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const StatCard = ({ title, value, icon, growth }) => (
  <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 hover:border-blue-500/30 transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className={`text-xs font-bold ${growth.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{growth}</span>
    </div>
    <h4 className="text-gray-400 text-sm font-medium">{title}</h4>
    <p className="text-2xl font-black mt-1">{value}</p>
  </div>
);

const TableRow = ({ name, email, status, date }) => (
  <tr className="border-b border-white/5 hover:bg-white/5 transition-all group">
    <td className="py-4">
      <div className="font-semibold text-white">{name}</div>
      <div className="text-[10px] text-gray-500">{email}</div>
    </td>
    <td className="py-4">
      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${status === 'Active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
        {status}
      </span>
    </td>
    <td className="py-4 text-gray-400 text-xs">{date}</td>
    <td className="py-4 text-right">
      <button className="text-blue-400 text-xs font-bold hover:underline">Edit</button>
    </td>
  </tr>
);

export default AdminDashboard;