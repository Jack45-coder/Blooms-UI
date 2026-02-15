import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MessageDisplay from './MessageDisplay';

const DashboardLayout = ({ children, activeTab, setActiveTab, user, message, onLogout }) => {
    return (
        <div className="flex h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-white">
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                user={user}
                onLogout={onLogout}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <TopBar activeTab={activeTab} user={user} />

                {message.text && (
                    <MessageDisplay message={message} />
                )}

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;