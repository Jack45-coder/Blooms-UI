import React from 'react';
import { FaFolder, FaFolderOpen, FaBlog } from 'react-icons/fa';

const getIcon = (title) => {
    switch(title) {
        case 'My Categories': return FaFolder;
        case 'My Subcategories': return FaFolderOpen;
        case 'My Blogs': return FaBlog;
        default: return FaFolder;
    }
};

const StatCard = ({ title, value, color, onClick }) => {
    const Icon = getIcon(title);

    return (
        <button
            onClick={onClick}
            className="group relative overflow-hidden bg-[#16161a] border border-white/5 rounded-2xl p-6
                       transition-all duration-500 text-left w-full
                       hover:border-white/20 hover:-translate-y-1 active:scale-95 shadow-2xl"
        >
            {/* Soft Background Glow on Hover */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 bg-linear-to-br ${color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />
            <div className="flex items-center justify-between relative z-10">
                <div>
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                        {title.replace('My ', '')}
                    </p>
                    <div className="flex items-baseline gap-1">
                        <p className="text-4xl font-extrabold text-white tracking-tight">
                            {value}
                        </p>
                        <span className="text-[10px] text-gray-500 font-medium">Items</span>
                    </div>
                </div>

                {/* Icon Container with Glass Effect */}
                <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${color} 
                                flex items-center justify-center text-white 
                                shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-500`}>
                    <Icon size={26} className="drop-shadow-md" />
                </div>
            </div>

            {/* Bottom Accent Line */}
            <div className={`absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-br ${color} group-hover:w-full transition-all duration-500`} />
        </button>
    );
};

export default StatCard;