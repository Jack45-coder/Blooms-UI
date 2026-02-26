import React from 'react';
import { FaFolder, FaFolderOpen, FaBlog } from 'react-icons/fa';

const StatCard = ({ title, value, color, onClick }) => {
    
    // Icon selection logic
    const getIcon = () => {
        if (title.includes('Categories')) return FaFolder;
        if (title.includes('Subcategories')) return FaFolderOpen;
        if (title.includes('Blogs')) return FaBlog;
        return FaFolder;
    };

    const Icon = getIcon();

    // Conic Gradient Logic: Lighting color according to theme
    const getBorderGradient = () => {
        const themes = {
            'My Categories': "from-blue-600 via-cyan-400 to-transparent",
            'My Subcategories': "from-purple-600 via-pink-400 to-transparent",
            'My Blogs': "from-emerald-600 via-teal-400 to-transparent"
        };
        
        // Defaulting based on title, matching your CSS logic
        switch(title) {
            case 'My Categories': 
                return "conic-gradient(from 0deg, transparent 45%, #3b82f6 50%, #60a5fa 55%, transparent 60%)";
            case 'My Subcategories': 
                return "conic-gradient(from 0deg, transparent 45%, #8b5cf6 50%, #d946ef 55%, transparent 60%)";
            case 'My Blogs': 
                return "conic-gradient(from 0deg, transparent 45%, #10b981 50%, #34d399 55%, transparent 60%)";
            default: 
                return "conic-gradient(from 0deg, transparent 45%, #3b82f6 50%, transparent 60%)";
        }
    };

    return (
        <button
            onClick={onClick}
            className="group relative p-[1.5px] overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.03] active:scale-95 text-left w-full h-full shadow-2xl"
        >
            {/* 1. ALWAYS-ON RACING BORDER */}
            <div className="absolute inset-[-400%] animate-border-slow z-0 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                <div 
                    className="h-full w-full"
                    style={{ background: getBorderGradient() }}
                />
            </div>

            {/* 2. INNER CONTENT BOX */}
            <div className="relative z-10 bg-[#0a0a0c]/98 backdrop-blur-3xl rounded-[calc(1rem-1px)] p-6 h-full border border-white/5 overflow-hidden flex flex-col justify-between">
                
                {/* Soft Inner Glow */}
                <div className={`absolute -right-10 -top-10 w-32 h-32 bg-current ${color.split(' ')[0]} opacity-5 group-hover:opacity-15 blur-[60px] transition-all duration-700`} />

                <div className="flex items-center justify-between relative z-20">
                    <div className="space-y-1">
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.25em]">
                            {title.replace('My ', '')}
                        </p>
                        <div className="flex items-baseline gap-2">
                            <h4 className="text-4xl font-black text-white tracking-tighter">
                                {value}
                            </h4>
                            <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">In Database</span>
                        </div>
                    </div>

                    {/* Icon with Theme-based Glow */}
                    <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${color} 
                                    flex items-center justify-center text-white 
                                    shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 border border-white/10`}>
                        <Icon size={26} className="drop-shadow-lg" />
                    </div>
                </div>

                {/* Bottom Decorative Interaction Bar */}
                <div className="relative mt-6">
                    <div className="absolute inset-0 h-1px bg-white/5 w-full" />
                    <div className={`relative h-1 w-10 rounded-full bg-linear-to-r ${color} opacity-40 group-hover:w-full transition-all duration-700 ease-in-out`} />
                </div>
            </div>
        </button>
    );
};

export default StatCard;