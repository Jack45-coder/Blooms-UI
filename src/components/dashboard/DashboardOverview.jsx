import React from 'react';
import StatCard from './StatCard';
import RecentBlogs from './RecentBlogs';
import WelcomeBanner from './WelcomeBanner';

const DashboardOverview = ({ user, stats, recentBlogs, loading, onViewAll }) => {
    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <WelcomeBanner user={user} onViewAll={onViewAll} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="My Categories"
                    value={stats.categories}
                    color="from-blue-500 to-cyan-500"
                    onClick={() => onViewAll('categories')}
                />
                <StatCard
                    title="My Subcategories"
                    value={stats.subcategories}
                    color="from-purple-500 to-pink-500"
                    onClick={() => onViewAll('subcategories')}
                />
                <StatCard
                    title="My Blogs"
                    value={stats.blogs}
                    color="from-green-500 to-emerald-500"
                    onClick={() => onViewAll('blogs')}
                />
            </div>

            <RecentBlogs recentBlogs={recentBlogs} onViewAll={onViewAll} />
        </div>
    );
};

export default DashboardOverview;