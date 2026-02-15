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
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6
                     hover:bg-white/10 transition-all duration-300 text-left w-full
                     hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-400 text-sm">{title}</p>
                    <p className="text-3xl font-bold text-white mt-2">{value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${color}
                              flex items-center justify-center text-white`}>
                    <Icon size={24} />
                </div>
            </div>
        </button>
    );
};

export default StatCard;