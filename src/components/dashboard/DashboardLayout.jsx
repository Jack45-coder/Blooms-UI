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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#0a0a0c] text-slate-200 pt-16">

      <aside
        className={`
          fixed top-16 bottom-0 left-0 z-50
          bg-[#0f0f12]
          transition-all duration-300
          ${isCollapsed ? "w-20" : "w-64"}
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setIsSidebarOpen(false);
          }}
          user={user}
          onLogout={onLogout}
          onCollapse={setIsCollapsed}
        />
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`
          min-h-[calc(100vh-64px)]
          transition-all duration-300
          ${isCollapsed ? "md:ml-20" : "md:ml-64"}
        `}
      >
        <header className="relative z-40 bg-[#0a0a0c] border-b border-white/10">
          <TopBar
            activeTab={activeTab}
            user={user}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </header>

        <main className="p-4 md:p-8 bg-[#0a0a0c] min-h-[calc(100vh-120px)]">
          <div className="max-w-7xl mx-auto">

            {message?.text && (
              <MessageDisplay message={message} />
            )}

            {children}

          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;