import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const BlogCard = ({ blog, categoryName, onEdit, onDelete, onUpdate }) => {
    return (
        <div className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6
                      hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <div className="flex gap-4">
                {blog.featuredImage && (
                    <div className="shrink-0">
                        <img
                            src={blog.featuredImage}
                            alt={blog.title}
                            className="w-32 h-32 object-cover rounded-xl"
                        />
                    </div>
                )}
                <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                                    {blog.title}
                                </h3>
                                <span className={`px-3 py-1 text-xs rounded-full ${
                                    blog.status === 'PUBLISHED'
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                }`}>
                                    {blog.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-500 mb-2 flex-wrap">
                                <span>📅 {new Date(blog.createdAt).toLocaleDateString()}</span>
                                <span>👤 {categoryName}</span>
                                {blog.views && <span>👁️ {blog.views} views</span>}
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-400 mb-3 line-clamp-2">
                        {blog.content.substring(0, 150)}...
                    </p>

                    {blog.tags && blog.tags.length > 0 && (
                        <div className="flex gap-1 mb-3 flex-wrap">
                            {blog.tags.slice(0, 3).map((tag, i) => (
                                <span key={i} className="text-xs px-2 py-1 bg-white/5 rounded-full text-gray-500">
                                    #{tag}
                                </span>
                            ))}
                            {blog.tags.length > 3 && (
                                <span className="text-xs px-2 py-1 bg-white/5 rounded-full text-gray-500">
                                    +{blog.tags.length - 3} more
                                </span>
                            )}
                        </div>
                    )}

                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit(blog)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500/20
                                     hover:bg-blue-500/30 text-blue-400 rounded-lg
                                     transition-all text-sm"
                        >
                            <FaEdit /> Edit
                        </button>
                        <button
                            onClick={() => onDelete(blog.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/20
                                     hover:bg-red-500/30 text-red-400 rounded-lg
                                     transition-all text-sm"
                        >
                            <FaTrash /> Delete
                        </button>
                        {blog.status === 'DRAFT' && (
                            <button
                                onClick={() => onUpdate(blog.id, { ...blog, status: 'PUBLISHED' })}
                                className="flex items-center gap-2 px-4 py-2 bg-green-500/20
                                         hover:bg-green-500/30 text-green-400 rounded-lg
                                         transition-all text-sm"
                            >
                                Publish
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;