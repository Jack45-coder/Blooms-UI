import React from 'react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`group relative flex items-center gap-4 px-6 py-3 mx-3 w-[calc(100%-24px)] rounded-xl
                   transition-all duration-300 ease-in-out mb-1.5
            ${active 
                ? 'bg-white/10 text-white shadow-sm' 
                : 'text-gray-500 hover:bg-white/0.03 hover:text-gray-200'
            }`}
    >
        {/* Left Accent Line - Sirf active hone par dikhegi */}
        <div className={`absolute left-0 w-1 h-5 rounded-r-full transition-all duration-300 
            ${active ? 'bg-blue-500 opacity-100' : 'bg-transparent opacity-0'}`} 
        />

        {/* Icon - Active hone par thoda chamkega */}
        <Icon className={`text-lg transition-colors duration-300 
            ${active ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'}`} 
        />
        
        {/* Label - Simple font with slight tracking */}
        <span className={`text-sm font-medium tracking-tight transition-colors duration-300 
            ${active ? 'text-white' : 'text-gray-500 group-hover:text-gray-200'}`}>
            {label}
        </span>

        {/* Subtle Background Glow - Active state ke liye */}
        {active && (
            <div className="absolute inset-0 bg-blue-500/5 blur-xl rounded-xl -z-10" />
        )}
    </button>
);

export default SidebarItem;