import { FaTimes, FaCalendarAlt, FaTag } from 'react-icons/fa';

const BlogViewModal = ({ blog, categoryName, onClose }) => {
    if (!blog) return null;
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm">
            <div className="bg-slate-800 border border-slate-700 w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300">
                <div className="relative h-64 shrink-0">
                    <img 
                        src={blog.featuredImage || blog.imageUrl || 'https://via.placeholder.com/800x400'} 
                        className="w-full h-full object-cover"
                        alt={blog.title}
                    />
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md">
                        <FaTimes size={20} />
                    </button>
                </div>
                <div className="p-8 overflow-y-auto">
                    <div className="flex gap-4 mb-4">
                        <span className="text-blue-400 text-xs font-bold uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                            <FaTag size={10} /> {categoryName}
                        </span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-6">{blog.title}</h2>
                    <div className="text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
            </div>
        </div>
    );
};

export default BlogViewModal;