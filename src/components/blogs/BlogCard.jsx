import { FaEdit, FaTrash, FaCalendarAlt, FaTag, FaEye, FaArrowRight } from 'react-icons/fa';

const BlogCard = ({ blog, categoryName, onEdit, onDelete, onView }) => {
    return (
        /* Outer Container with Racing Border Logic */
        <div className="group relative p-[1.5px] overflow-hidden rounded-2rem transition-all duration-500 hover:scale-[1.01]">
            
            {/* 1. ALWAYS-ON RACING BORDER (Blue/Cyan Flow) */}
            <div className="absolute inset-[-300%] animate-border-slow z-0 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                <div 
                    className="h-full w-full"
                    style={{
                        background: "conic-gradient(from 0deg, transparent 0%, transparent 45%, #3b82f6 50%, #06b6d4 55%, transparent 60%, transparent 100%)"
                    }}
                />
            </div>

            {/* 2. INNER CONTENT BOX */}
            <div className="relative z-10 bg-[#0a0a0c]/95 backdrop-blur-xl rounded-[calc(2rem-1px)] p-4 md:p-6 overflow-hidden border border-white/5">
                
                {/* Background Decorative Glow */}
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-blue-600/5 blur-[80px] group-hover:bg-blue-600/10 transition-all" />

                <div className="flex flex-col md:flex-row gap-6 relative z-10">
                    {/* Image Section - Compact & Sharp */}
                    <div className="relative shrink-0 w-full md:w-52 h-44 md:h-40 overflow-hidden rounded-2xl shadow-xl border border-white/5">
                        <img
                            src={blog.featuredImage || blog.imageUrl || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=500'}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-2 left-2">
                            <span className={`px-2.5 py-0.5 text-[9px] font-black rounded-md backdrop-blur-md border ${
                                blog.status === 'PUBLISHED'
                                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            }`}>
                                {blog.status}
                            </span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="mb-2">
                            <div className="flex items-center gap-2 text-[9px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-1">
                                <FaTag className="text-[8px]" />
                                {categoryName || 'General'}
                            </div>
                            
                            <h3 onClick={() => onView(blog)} 
                                className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors cursor-pointer line-clamp-1 leading-tight">
                                {blog.title}
                            </h3>
                        </div>

                        <p className="text-gray-400 text-xs mb-4 line-clamp-2 leading-relaxed max-w-xl">
                            {blog.description || (blog.content && blog.content.replace(/<[^>]*>?/gm, '').substring(0, 100)) + '...'}
                        </p>

                        {/* Metadata Row */}
                        <div className="flex items-center gap-4 text-[10px] text-gray-500 mb-4">
                            <span className="flex items-center gap-1.5">
                                <FaCalendarAlt className="opacity-50" />
                                {blog.createdDTTM?.$date ? new Date(blog.createdDTTM.$date).toLocaleDateString() : 'Recent'}
                            </span>
                            {blog.views !== undefined && (
                                <span className="flex items-center gap-1.5">
                                    <FaEye className="opacity-50" />
                                    {blog.views} Views
                                </span>
                            )}
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onEdit(blog)}
                                    className="p-2 bg-white/5 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 rounded-lg border border-white/5 transition-all"
                                    title="Edit"
                                >
                                    <FaEdit size={14} />
                                </button>
                                <button
                                    onClick={() => onDelete(blog.id)}
                                    className="p-2 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg border border-white/5 transition-all"
                                    title="Delete"
                                >
                                    <FaTrash size={14} />
                                </button>
                            </div>

                            <button 
                                onClick={() => onView(blog)}
                                className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-blue-50 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-white/5"
                            >
                                Read <FaArrowRight size={10} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;