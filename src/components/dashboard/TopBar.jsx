import React from 'react';

const TopBar = ({ activeTab, user }) => {
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
        <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 py-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">
                    {getTabTitle()}
                </h2>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">Welcome back,</span>
                    <span className="font-semibold text-white">
                        {user?.name?.split(' ')[0] || 'User'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TopBar;