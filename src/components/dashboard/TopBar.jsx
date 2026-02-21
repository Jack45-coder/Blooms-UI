import React from 'react';
import { Menu } from 'lucide-react';

const TopBar = ({ activeTab, user, toggleSidebar }) => {
    const getTabTitle = () => {
        switch(activeTab) {
            case 'dashboard': return 'Dashboard Overview';
            case 'categories': return 'My Categories';
            case 'subcategories': return 'My Subcategories';
            case 'blogs': return 'My Blogs';
            default: return 'Dashboard';
        }
    };

    return (
        <div className=" bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 py-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    {/* Mobile Toggle Button */}
                    <button 
                        onClick={toggleSidebar}
                        className="p-2 text-white hover:bg-white/10 rounded-lg md:hidden transition-colors"
                    >
                        <Menu size={24} /> 
                        {/* Agar icon nahi hai toh likhein: <span>☰</span> */}
                    </button>

                    <h2 className="text-xl font-semibold text-white">
                        {getTabTitle()}
                    </h2>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 hidden sm:inline">Welcome back,</span>
                    <span className="font-semibold text-white">
                        {user?.name?.split(' ')[0] || 'User'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TopBar;