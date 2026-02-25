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

    // Dynamic Gradient for each card based on the 'color' prop
    // This ensures the racing border matches the card's theme color
    const getBorderGradient = (title) => {
        switch(title) {
            case 'My Categories': return "conic-gradient(from 0deg, transparent 0%, transparent 45%, #3b82f6 50%, #60a5fa 55%, transparent 60%, transparent 100%)";
            case 'My Subcategories': return "conic-gradient(from 0deg, transparent 0%, transparent 45%, #8b5cf6 50%, #d946ef 55%, transparent 60%, transparent 100%)";
            case 'My Blogs': return "conic-gradient(from 0deg, transparent 0%, transparent 45%, #10b981 50%, #34d399 55%, transparent 60%, transparent 100%)";
            default: return "conic-gradient(from 0deg, transparent 0%, transparent 45%, #3b82f6 50%, #60a5fa 55%, transparent 60%, transparent 100%)";
        }
    };

    return (
        <button
            onClick={onClick}
            className="group relative p-[1.5px] overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.03] active:scale-95 text-left w-full h-full shadow-2xl"
        >
            {/* 1. ALWAYS-ON RACING BORDER (The Flow) */}
            <div className="absolute inset-[-400%] animate-border-slow z-0 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                <div 
                    className="h-full w-full"
                    style={{ background: getBorderGradient(title) }}
                />
            </div>

            {/* 2. INNER CONTENT BOX */}
            <div className="relative z-10 bg-[#0a0a0c]/95 backdrop-blur-xl rounded-[calc(1rem-1px)] p-5 h-full border border-white/5 overflow-hidden">
                
                {/* Soft Inner Glow matching the theme color */}
                <div className={`absolute -right-8 -top-8 w-32 h-32 bg-linear-to-br ${color} opacity-5 group-hover:opacity-15 blur-[50px] transition-all duration-700`} />

                <div className="flex items-center justify-between relative z-20">
                    <div className="space-y-1">
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                            {title.replace('My ', '')}
                        </p>
                        <div className="flex items-baseline gap-1.5">
                            <h4 className="text-3xl font-black text-white tracking-tight">
                                {value}
                            </h4>
                            <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest">Total</span>
                        </div>
                    </div>

                    {/* Icon Container with Glass Effect */}
                    <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${color} 
                                    flex items-center justify-center text-white 
                                    shadow-lg shadow-black/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        <Icon size={22} className="drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]" />
                    </div>
                </div>

                {/* Micro-Interaction Bar at bottom */}
                <div className={`mt-4 h-1 w-8 rounded-full bg-linear-to-r ${color} opacity-30 group-hover:w-full transition-all duration-700 ease-out`} />
            </div>
        </button>
    );
};

export default StatCard;