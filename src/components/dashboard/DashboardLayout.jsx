import { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import MessageDisplay from "./MessageDisplay";

const DashboardLayout = ({
  children,
  activeTab,
  setActiveTab,
  user,
  message,
  onLogout,
}) => {
  // Mobile sidebar toggle state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-[#0a0a0c] text-slate-200 overflow-hidden font-sans pt-16">
      <aside
        className={`
        fixed inset-y-0 left-0 z-100 w-64 transform transition-transform duration-300 ease-in-out bg-[#0f0f12] 
        md:relative md:translate-x-0 md:z-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setIsSidebarOpen(false);
          }}
          user={user}
        />
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-90 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-[calc(100vh-64px)] overflow-hidden">
        <header className="shrink-0 relative z-40 overflow-hidden bg-[#0a0a0c] border-b border-white/10">
          <TopBar
            activeTab={activeTab}
            user={user}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-[radial-gradient(at_top_right,rgba(29,78,216,0.1),transparent_50%)]">
          <div className="max-w-7xl mx-auto">
            {message.text && <MessageDisplay message={message} />}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
