import { FaEdit, FaTrash, FaCalendarAlt, FaTag, FaEye, FaArrowRight } from 'react-icons/fa';

const BlogCard = ({ blog, categoryName, onEdit, onDelete, onUpdate, onView }) => {
    return (
        <div className="group bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-3xl p-5 
                        hover:bg-slate-800/60 transition-all duration-500 hover:border-blue-500/30
                        hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
            
            {/* Background Glow Effect */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-all" />

            <div className="flex flex-col md:flex-row gap-6">
                {/* Image Section - Fixed Aspect Ratio */}
                <div className="relative shrink-0 w-full md:w-56 h-48 md:h-auto overflow-hidden rounded-2xl shadow-2xl">
                    <img
                        src={blog.featuredImage || blog.imageUrl || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=500'}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 text-[10px] font-bold rounded-full backdrop-blur-md border ${
                            blog.status === 'PUBLISHED'
                                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                        }`}>
                            {blog.status}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col">
                    <div className="mb-3">
                        <div className="flex items-center gap-2 text-[11px] font-medium text-blue-400 uppercase tracking-widest mb-2">
                            <FaTag className="text-[10px]" />
                            {categoryName || 'General'}
                        </div>
                        
                        <h3 onClick={() => onView(blog)} 
                            className="text-2xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors cursor-pointer line-clamp-2 leading-tight">
                            {blog.title}
                        </h3>
                    </div>

                    <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {blog.description || (blog.content && blog.content.replace(/<[^>]*>?/gm, '').substring(0, 120)) + '...'}
                    </p>

                    {/* Metadata Row */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
                        <span className="flex items-center gap-1.5">
                            <FaCalendarAlt className="text-slate-600" />
                            {blog.createdDTTM?.$date ? new Date(blog.createdDTTM.$date).toLocaleDateString() : 'Recent'}
                        </span>
                        {blog.views !== undefined && (
                            <span className="flex items-center gap-1.5">
                                <FaEye className="text-slate-600" />
                                {blog.views} Views
                            </span>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-700/50">
                        <div className="flex gap-2">
                            <button
                                onClick={() => onEdit(blog)}
                                className="p-2.5 bg-slate-700/50 hover:bg-blue-500/20 text-slate-300 hover:text-blue-400 rounded-xl transition-all"
                                title="Edit Blog"
                            >
                                <FaEdit size={16} />
                            </button>
                            <button
                                onClick={() => onDelete(blog.id)}
                                className="p-2.5 bg-slate-700/50 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-xl transition-all"
                                title="Delete Blog"
                            >
                                <FaTrash size={16} />
                            </button>
                        </div>

                        <button 
                            onClick={() => onView(blog)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-600/40"
                        >
                            Read Full <FaArrowRight size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;