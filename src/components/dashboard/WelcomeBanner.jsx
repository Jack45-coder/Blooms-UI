import React from 'react';

const WelcomeBanner = ({ user, onViewAll }) => {
    return (
        <div className="relative bg-linear-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20
                      border border-white/10 rounded-3xl p-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-2">
                    Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
                </h2>
                <p className="text-gray-300 text-lg mb-4">
                    Manage your categories, subcategories, and blogs from your personal dashboard.
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={() => onViewAll('blogs')}
                        className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl
                                 transition-all border border-white/20"
                    >
                        View My Blogs
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WelcomeBanner;