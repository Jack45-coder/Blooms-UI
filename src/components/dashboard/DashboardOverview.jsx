import { FaFolder, FaSitemap, FaFileAlt, FaArrowRight, FaEye, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DashboardOverview = ({ user, stats, recentBlogs, loading, onViewAll }) => {
    const formatDate = (date) => {
        if (!date) return 'Recent';
        try {
            return new Date(date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        } catch {
            return 'Recent';
        }
    };

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-linear-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-6">
                <h1 className="text-2xl font-bold text-white mb-2">
                    Hello, <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
                        {user?.name || 'User'}!
                    </span>
                </h1>
                <p className="text-gray-400">
                    Your creative engine is fueled. You have new activity in your insights panel.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Categories Card */}
                <div className="bg-[#0a0a0f] border border-gray-800 rounded-xl p-6 hover:border-blue-500/30 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-all">
                            <FaFolder className="text-blue-400 text-xl" />
                        </div>
                        <span className="text-3xl font-bold text-white">{stats.categories}</span>
                    </div>
                    <h3 className="text-gray-400 text-sm">Total Categories</h3>
                    <Link to="/dashboard/categories" className="mt-3 text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                        Manage Categories <FaArrowRight size={10} />
                    </Link>
                </div>

                {/* Subcategories Card */}
                <div className="bg-[#0a0a0f] border border-gray-800 rounded-xl p-6 hover:border-purple-500/30 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-all">
                            <FaSitemap className="text-purple-400 text-xl" />
                        </div>
                        <span className="text-3xl font-bold text-white">{stats.subcategories}</span>
                    </div>
                    <h3 className="text-gray-400 text-sm">Total Subcategories</h3>
                    <Link to="/dashboard/subcategories" className="mt-3 text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1">
                        Manage Subcategories <FaArrowRight size={10} />
                    </Link>
                </div>

                {/* Blogs Card */}
                <div className="bg-[#0a0a0f] border border-gray-800 rounded-xl p-6 hover:border-green-500/30 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-all">
                            <FaFileAlt className="text-green-400 text-xl" />
                        </div>
                        <span className="text-3xl font-bold text-white">{stats.blogs}</span>
                    </div>
                    <h3 className="text-gray-400 text-sm">Total Blogs</h3>
                    <Link to="/dashboard/blogs" className="mt-3 text-xs text-green-400 hover:text-green-300 flex items-center gap-1">
                        Manage Blogs <FaArrowRight size={10} />
                    </Link>
                </div>
            </div>

            {/* Recent Blogs Section */}
            <div className="bg-[#0a0a0f] border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Recent Blogs</h2>
                    <button 
                        onClick={() => onViewAll('blogs')}
                        className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                        View All <FaArrowRight size={12} />
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                ) : recentBlogs.length > 0 ? (
                    <div className="space-y-4">
                        {recentBlogs.map((blog) => (
                            <div key={blog.id} className="flex items-start gap-4 p-4 bg-black/20 rounded-xl border border-gray-800/50 hover:border-gray-700 transition-all">
                                {/* Blog Image */}
                                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                                    <img 
                                        src={blog.imageUrl || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=100&auto=format&fit=crop'}
                                        alt={blog.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Blog Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                            blog.status === 'PUBLISHED'
                                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                        }`}>
                                            {blog.status || 'DRAFT'}
                                        </span>
                                        <span className="text-[10px] text-gray-500 flex items-center gap-1">
                                            <FaCalendarAlt size={8} />
                                            {formatDate(blog.createdDTTM?.$date || blog.createdAt)}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-white font-medium text-sm truncate">{blog.title}</h3>
                                    
                                    <p className="text-gray-500 text-xs mt-1 line-clamp-1">
                                        {blog.description || (blog.content?.replace(/<[^>]*>?/gm, '').substring(0, 60)) + '...'}
                                    </p>
                                </div>

                                {/* View Button */}
                                <button 
                                    onClick={() => onViewAll('blogs')}
                                    className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all"
                                >
                                    <FaEye size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">No blogs yet</p>
                        <button 
                            onClick={() => onViewAll('blogs')}
                            className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-all text-sm"
                        >
                            Write Your First Blog
                        </button>
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="p-4 bg-linear-to-r from-blue-600 to-purple-600 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all">
                    📝 Write New Blog
                </button>
                <button className="p-4 bg-[#0a0a0f] border border-gray-800 rounded-xl text-gray-300 hover:border-blue-500/30 transition-all">
                    📊 View Analytics
                </button>
            </div>
        </div>
    );
};

export default DashboardOverview;