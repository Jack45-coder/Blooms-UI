import React from 'react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 px-6 py-3 mx-3 w-[calc(100%-24px)] rounded-xl
                   transition-all duration-300 ${
            active
                ? 'bg-linear-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
        }`}
    >
        <Icon className="text-lg" />
        <span className="font-medium">{label}</span>
    </button>
);

export default SidebarItem;