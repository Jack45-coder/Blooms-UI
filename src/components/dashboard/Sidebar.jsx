import React from 'react';
import { FaThLarge, FaFolder, FaFolderOpen, FaBlog, FaSignOutAlt } from 'react-icons/fa';
import SidebarItem from './SidebarItem';

const Sidebar = ({ activeTab, setActiveTab, user, onLogout }) => {
    return (
        <div className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    My Dashboard
                </h1>
            </div>

            {/* User Info */}
            <div className="px-6 py-4 border-y border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-linear-to-r from-blue-500 to-purple-500
                                  flex items-center justify-center text-white font-bold text-xl">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div>
                        <p className="font-semibold text-white">{user?.name || 'User'}</p>
                        <p className="text-xs text-gray-400">{user?.email || ''}</p>
                    </div>
                </div>
            </div>

            <nav className="mt-6">
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

                {/* <div className="absolute bottom-6 left-0 right-0 px-3">
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-3 px-6 py-3 w-full text-red-400
                                 hover:bg-red-500/10 rounded-xl transition-all duration-300"
                    >
                        <FaSignOutAlt />
                        <span className="font-medium">Logout</span>
                    </button>
                </div> */}
            </nav>
        </div>
    );
};

export default Sidebar;