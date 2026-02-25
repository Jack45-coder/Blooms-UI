import React from "react";

const WelcomeBanner = ({ user, onViewAll }) => {
  return (
    <div className="relative group overflow-hidden rounded-2xl p-[1.5px] transition-all duration-700">
      
      {/* 1. ALWAYS-ON RACING BORDER */}
      <div className="absolute inset-[-500%] animate-border-slow z-0">
        <div 
          className="h-full w-full opacity-30 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "conic-gradient(from 0deg, transparent 0%, transparent 45%, #3b82f6 50%, #8b5cf6 55%, transparent 60%, transparent 100%)"
          }}
        />
      </div>

      {/* 2. MAIN CONTENT BOX (Reduced Padding) */}
      <div className="relative z-10 w-full bg-[#0a0a0c]/95 backdrop-blur-xl rounded-2xl p-6 md:p-8 overflow-hidden border border-white/5">
        
        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]" />
        
        <div className="relative z-20 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Left Side: Text Content */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative rounded-full h-1.5 w-1.5 bg-blue-500"></span>
              </span>
              <span className="text-[9px] font-bold tracking-widest text-blue-400 uppercase">Live</span>
            </div>

            {/* Hello and Name in one line */}
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Hello, <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
                {user?.name?.split(" ")[0] || "jackey"}
              </span>!
            </h2>

            <p className="text-gray-400 text-sm md:text-base max-w-lg leading-relaxed">
              Your creative engine is fueled. You have new activity in your 
              <span className="text-white font-medium"> insights </span> panel.
            </p>
          </div>

          {/* Right Side: Action Button */}
          <div className="shrink-0">
            <button
              onClick={() => onViewAll("blogs")}
              className="group/btn relative overflow-hidden px-6 py-2.5 bg-white text-black text-sm font-bold rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 flex items-center gap-2"
            >
              <span>View Analytics</span>
              <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Small Decorative Icon */}
        <div className="absolute bottom-10px right-2 text-6xl opacity-[0.03] select-none pointer-events-none rotate-12">
          🌸
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;