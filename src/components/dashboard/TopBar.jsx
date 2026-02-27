import React from 'react';
import { Menu } from 'lucide-react';

const TopBar = ({ activeTab, user, toggleSidebar}) => {
    const getTabTitle = () => {
        switch(activeTab) {
            case 'dashboard': return 'Dashboard Overview';
            case 'categories': return 'My Categories';
            case 'subcategories': return 'My Subcategories';
            case 'blogs': return 'My Blogs';
            default: return 'Dashboard';
        }
    };

    // Get greeting based on time
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className="bg-[#0a0a0c] backdrop-blur-xl border-b border-white/10 px-4 md:px-6 py-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
        
                    <button 
                        onClick={toggleSidebar}
                        className="p-2 text-white hover:bg-white/10 rounded-lg md:hidden transition-colors"
                    >
                        <Menu size={24} /> 
                        {/* Agar icon nahi toh: <span>☰</span> */}
                    </button>

                    <div>
                        <h2 className="text-xl font-semibold text-white">
                            {getTabTitle()}
                        </h2>
                        <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                            {getGreeting()}, {user?.name?.split(' ')[0] || 'User'}! 👋
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* User Info */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                        <div className="w-7 h-7 rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <span className="text-sm text-gray-300 hidden lg:block">
                            {user?.name?.split(' ')[0] || 'User'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;