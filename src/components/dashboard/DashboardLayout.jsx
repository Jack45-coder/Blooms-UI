import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MessageDisplay from './MessageDisplay';

const DashboardLayout = ({ children, activeTab, setActiveTab, user, message, onLogout }) => {

    // Mobile sidebar toggle state
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-white">
            {/* Sidebar with Mobile Classes */}
            <div className={`
                fixed inset-y-0 left-0 z-40 w-64 transform bg-gray-900 transition-transform duration-300 ease-in-out md:relative md:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <Sidebar
                    activeTab={activeTab}
                    setActiveTab={(tab) => {
                        setActiveTab(tab);
                        setIsSidebarOpen(false); 
                    }}
                    user={user}
                    // onLogout={onLogout}
                />
            </div>

            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            <div className="flex-1 flex flex-col overflow-hidden">
                <TopBar 
                    activeTab={activeTab} 
                    user={user} 
                    toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
                />

                {message.text && <MessageDisplay message={message} />}

                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;