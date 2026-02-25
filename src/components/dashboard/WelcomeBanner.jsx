import React from "react";

const WelcomeBanner = ({ user, onViewAll }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#16161a] p-8 md:p-12">
      {/* Background Decorative Elements */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-600/10 blur-[100px]"></div>
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-600/10 blur-[100px]"></div>

      <div className="relative z-10 max-w-2xl">
        <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium mb-4 tracking-wider uppercase">
          Workspace Overview
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
          Welcome back,{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-br from-blue-400 to-indigo-300">
            {user?.name?.split(" ")[0]}
          </span>
          !
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed mb-8">
          Manage your digital ecosystem. Monitor your categories, refine
          subcategories, and publish impactful blogs.
        </p>
        <button
          onClick={() => onViewAll("blogs")}
          className="group relative flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-blue-50 transition-all duration-300"
        >
          View My Blogs
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </button>
      </div>
    </div>
  );
};

export default WelcomeBanner;
