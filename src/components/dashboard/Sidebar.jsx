import React from 'react';
import { FaThLarge, FaFolder, FaFolderOpen, FaBlog, FaSignOutAlt } from 'react-icons/fa';
import SidebarItem from './SidebarItem';

const Sidebar = ({ activeTab, setActiveTab, user, onLogout }) => {
    return (
        <div className="flex flex-col w-64 h-full bg-[#0f0f12] border-r border-white/10 overflow-y-auto">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    My Dashboard
                </h1>
            </div>

            {/* --- USER INFO WITH RACING BORDER --- */}
            <div className="px-4 mb-6">
                <div className="group relative p-[1.5px] overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02]">
                    
                    {/* Always-On Animated Border Logic */}
                    <div className="absolute inset-[-400%] animate-border-slow z-0 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                        <div 
                            className="h-full w-full"
                            style={{
                                background: "conic-gradient(from 0deg, transparent 0%, transparent 40%, #3b82f6 50%, #8b5cf6 60%, transparent 70%, transparent 100%)"
                            }}
                        />
                    </div>

                    {/* Inner Content Box */}
                    <div className="relative z-10 flex items-center gap-3 p-3 bg-[#0a0a0c] rounded-[calc(1rem-1.5px)] border border-white/5">
                        {/* Avatar with Glow Effect */}
                        <div className="relative shrink-0">
                            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            {/* Status Dot */}
                            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-[#0a0a0c] rounded-full"></div>
                        </div>

                        {/* Name and Email Details */}
                        <div className='min-w-0 flex-1'>
                            <p className="text-sm font-bold text-white leading-tight truncate">
                                {user?.name || 'User'}
                            </p>
                            <p className="text-[9px] text-gray-500 uppercase tracking-tighter mt-1 truncate opacity-80">
                                {user?.email || 'jackeyjazzbgp1234@gmail.com'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <nav className="mt-2">
                <SidebarItem
                    icon={FaThLarge}
                    label="Dashboard"
                    active={activeTab === 'dashboard'}
                    onClick={() => setActiveTab('dashboard')}
                />
                <SidebarItem
                    icon={FaFolder}
                    label="My Categories"
                    active={activeTab === 'categories'}
                    onClick={() => setActiveTab('categories')}
                />
                <SidebarItem
                    icon={FaFolderOpen}
                    label="My Subcategories"
                    active={activeTab === 'subcategories'}
                    onClick={() => setActiveTab('subcategories')}
                />
                <SidebarItem
                    icon={FaBlog}
                    label="My Blogs"
                    active={activeTab === 'blogs'}
                    onClick={() => setActiveTab('blogs')}
                />
            </nav>
        </div>
    );
};

export default Sidebar;