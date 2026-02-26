import React from 'react';
import { FaEye, FaArrowRight } from 'react-icons/fa';

const RecentBlogs = ({ recentBlogs, onViewAll, onViewBlog }) => {
    return (
        <div className="bg-[#0a0a0c]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                    <h3 className="text-xl font-black text-white tracking-tight">Recent Blogs</h3>
                </div>
                <button
                    onClick={() => onViewAll('blogs')}
                    className="group flex items-center gap-2 text-xs font-bold text-blue-500 hover:text-blue-400 uppercase tracking-widest transition-all"
                >
                    View All <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {recentBlogs.length > 0 ? (
                <div className="space-y-4">
                    {recentBlogs.map((blog) => (
                        /* --- START: ROTATING BORDER WRAPPER --- */
                        <div key={blog.id} className="group relative p-[1.2px] overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02]">
                            
                            {/* The Racing Border Light */}
                            <div className="absolute inset-[-500%] animate-border-slow z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div 
                                    className="h-full w-full" 
                                    style={{ background: "conic-gradient(from 0deg, transparent 45%, #3b82f6 50%, #06b6d4 55%, transparent 60%)" }} 
                                />
                            </div>

                            {/* Inner Content Card */}
                            <div 
                                onClick={() => onViewBlog(blog)}
                                className="relative z-10 bg-[#0d0d0f] p-4 rounded-[calc(1rem-1.2px)] flex items-center justify-between cursor-pointer border border-white/5 transition-colors group-hover:bg-[#0d0d0f]/80"
                            >
                                <div className="flex items-center gap-4">
                                    {/* Blog Thumbnail */}
                                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0">
                                        <img 
                                            src={blog.imageUrl || 'https://via.placeholder.com/150'} 
                                            alt={blog.title} 
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                        />
                                    </div>
                                    
                                    <div>
                                        <h4 className="font-bold text-gray-200 group-hover:text-white transition-colors line-clamp-1">
                                            {blog.title}
                                        </h4>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">
                                            {new Date(blog.createdAt).toLocaleDateString('en-GB')} • <span className="text-blue-500">Published</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col items-end">
                                        <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-500 uppercase">
                                            <FaEye size={12} /> {blog.views || 0}
                                        </span>
                                        <span className="text-[8px] text-gray-600 font-bold uppercase tracking-tighter">Views</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        /* --- END: ROTATING BORDER WRAPPER --- */
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-2xl">
                    <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">
                        No blogs found yet.
                    </p>
                </div>
            )}
        </div>
    );
};

export default RecentBlogs;