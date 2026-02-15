import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const SubCategoryCard = ({ subcategory, categoryName, onEdit, onDelete }) => {
    return (
        <div className="group relative bg-white/5 backdrop-blur-lg border border-white/10
                      rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300
                      hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
            <div className="relative h-40">
                <img
                    src={subcategory.imageUrl || 'https://via.placeholder.com/400x200?text=My+Subcategory'}
                    alt={subcategory.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
                <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full
                                   text-xs text-white border border-white/30">
                        {categoryName}
                    </span>
                </div>
                <h3 className="absolute bottom-3 left-3 text-xl font-bold text-white">
                    {subcategory.name}
                </h3>
            </div>
            <div className="p-4">
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {subcategory.description || 'No description provided'}
                </p>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(subcategory)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2
                                 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400
                                 rounded-lg transition-all"
                    >
                        <FaEdit /> Edit
                    </button>
                    <button
                        onClick={() => onDelete(subcategory.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2
                                 bg-red-500/20 hover:bg-red-500/30 text-red-400
                                 rounded-lg transition-all"
                    >
                        <FaTrash /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubCategoryCard;