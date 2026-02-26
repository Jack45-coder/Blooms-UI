import { FaFolder, FaSitemap, FaFileAlt, FaArrowRight, FaEye, FaCalendarAlt, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DashboardOverview = ({ user, stats, recentBlogs, loading, onViewAll }) => {
    const formatDate = (date) => {
        if (!date) return 'Recent';
        try {
            const dateObj = date?.$date ? new Date(date.$date) : new Date(date);
            if (isNaN(dateObj.getTime())) return 'Recent';
            return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        } catch { return 'Recent'; }
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    const RotatingBorder = ({ color, isFast = false, alwaysVisible = false }) => (
        <div className={`absolute inset-[-500%] ${isFast ? 'animate-border-fast' : 'animate-border-slow'} z-0 
            ${alwaysVisible ? 'opacity-30' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-700`}>
            <div 
                className="h-full w-full" 
                style={{ background: `conic-gradient(from 0deg, transparent 45%, ${color} 50%, transparent 55%)` }} 
            />
        </div>
    );

    return (
        <div className="space-y-6">
            {/* 1. Welcome Section */}
            <div className="relative overflow-hidden bg-linear-to-r from-blue-600/20 via-purple-600/10 to-pink-600/20 border border-blue-500/20 rounded-2xl p-6">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-blue-400 font-medium bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">
                            {getGreeting()}
                        </span>
                        {stats.blogs > 0 && (
                            <span className="text-xs text-green-400 font-medium bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20 flex items-center gap-1">
                                <FaStar size={8} /> {stats.blogs} Active
                            </span>
                        )}
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">
                        Hello, <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
                            {user?.name || 'User'}!
                        </span>
                    </h1>
                    <p className="text-gray-400 text-sm">Your creative engine is fueled. You have new activity.</p>
                </div>
            </div>

            {/* 2. Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { title: "Total Categories", val: stats.categories, icon: <FaFolder />, col: "#3b82f6", link: "/dashboard/categories" },
                    { title: "Total Subcategories", val: stats.subcategories, icon: <FaSitemap />, col: "#a855f7", link: "/dashboard/subcategories" },
                    { title: "Total Blogs", val: stats.blogs, icon: <FaFileAlt />, col: "#22c55e", link: "/dashboard/blogs" }
                ].map((item, idx) => (
                    <div key={idx} className="group relative p-px overflow-hidden rounded-xl transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                        <RotatingBorder color={item.col} alwaysVisible={true} />
                        <div className="relative z-10 bg-[#0a0a0f] border border-gray-800 rounded-xl p-5 group-hover:bg-[#0d0d14] transition-all">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2.5 bg-white/5 rounded-lg text-white" style={{color: item.col}}>{item.icon}</div>
                                <span className="text-2xl font-bold text-white group-hover:scale-110 transition-transform">{item.val}</span>
                            </div>
                            <h3 className="text-gray-400 text-xs mb-2">{item.title}</h3>
                            <Link to={item.link} className="text-xs font-medium flex items-center gap-1 opacity-70 hover:opacity-100" style={{color: item.col}}>
                                Manage <FaArrowRight size={8} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. Recent Blogs Section - UPDATED HOVER LIGHTING ONLY */}
            <div className="group relative p-px overflow-hidden rounded-2xl">
                <RotatingBorder color="#6366f1" alwaysVisible={true} /> 
                
                <div className="relative z-10 bg-[#0a0a0f] border border-gray-800 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-white">Recent Blogs</h2>
                        <button onClick={() => onViewAll('blogs')} className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                            View All <FaArrowRight size={8} />
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-6">
                            <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
                        </div>
                    ) : recentBlogs.length > 0 ? (
                        <div className="space-y-3">
                            {recentBlogs.map((blog) => (
                                <div key={blog.id} className="group/blog relative p-px overflow-hidden rounded-lg transition-all">
                                    {/* FAST ROTATING LIGHT ON HOVER */}
                                    <div className="absolute inset-[-500%] animate-border-fast z-0 opacity-0 group-hover/blog:opacity-100 transition-opacity duration-300">
                                        <div className="h-full w-full" style={{ background: `conic-gradient(from 0deg, transparent 40%, #3b82f6 50%, #8b5cf6 55%, transparent 65%)` }} />
                                    </div>
                                    
                                    <div className="relative z-10 flex items-start gap-3 p-3 bg-[#0d0d12] rounded-lg border border-gray-800/50 transition-all group-hover/blog:bg-[#111118]">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-white/5">
                                            <img src={blog.imageUrl || 'https://via.placeholder.com/150'} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${blog.status === 'PUBLISHED' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                                                    {blog.status || 'DRAFT'}
                                                </span>
                                                <span className="text-[8px] text-gray-500 flex items-center gap-1">
                                                    <FaCalendarAlt size={6} /> {formatDate(blog.createdDTTM?.$date || blog.createdAt)}
                                                </span>
                                            </div>
                                            <h3 className="text-white text-xs font-semibold truncate group-hover/blog:text-blue-400 transition-colors">{blog.title}</h3>
                                            <p className="text-gray-500 text-[10px] mt-0.5 line-clamp-1">{blog.description || 'No description available...'}</p>
                                        </div>
                                        <button className="p-1.5 bg-white/5 hover:bg-blue-600 text-blue-400 hover:text-white rounded-lg transition-all">
                                            <FaEye size={10} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-6 text-gray-500 text-xs">No blogs discovered yet.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;