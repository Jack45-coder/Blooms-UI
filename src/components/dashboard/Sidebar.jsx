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

            {/* User Info */}
            <div className="mx-4 my-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-r from-blue-500 to-indigo-600
                                  flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className='truncate'>
                        <p className="text-lg font-bold text-white leading-tight">{user?.name || 'User'}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{user?.email || ''}</p>
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