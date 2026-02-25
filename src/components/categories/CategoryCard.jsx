import { FaEdit, FaTrash } from 'react-icons/fa';

const CategoryCard = ({ category, onEdit, onDelete }) => {
    return (
        /* Outer container: Scale effect on hover */
        <div className="group relative p-[1.5px] overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            
            {/* 1. ALWAYS-ON RACING BORDER (Non-stop rotation) */}
            <div className="absolute inset-[-400%] animate-border-slow z-0 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                <div 
                    className="h-full w-full"
                    style={{
                        background: "conic-gradient(from 0deg, transparent 0%, transparent 40%, #3b82f6 50%, #8b5cf6 60%, transparent 70%, transparent 100%)"
                    }}
                />
            </div>

            {/* 2. CARD INNER CONTENT */}
            <div className="relative z-10 h-full bg-[#0a0a0c] rounded-[calc(1rem-1px)] overflow-hidden flex flex-col border border-white/5">
                
                {/* Image Section with Overlay */}
                <div className="relative h-32 overflow-hidden">
                    <img
                        src={category.imageUrl || 'https://via.placeholder.com/400x200?text=Category'}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    {/* Gradient overlay to make title pop */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0c] to-transparent opacity-90" />
                    
                    <div className="absolute bottom-2 left-4">
                        <h3 className="text-base font-bold text-white tracking-wide group-hover:text-blue-400 transition-colors">
                            {category.name}
                        </h3>
                    </div>
                </div>

                {/* Info & Actions Section */}
                <div className="p-4 flex flex-col justify-between grow">
                    <p className="text-gray-400 text-[11px] leading-relaxed mb-4 line-clamp-2">
                        {category.description || 'Manage and organize your content effectively.'}
                    </p>
                    
                    {/* Compact Action Buttons */}
                    <div className="flex items-center gap-2 mt-auto">
                        <button
                            onClick={() => onEdit(category)}
                            className="flex-1 flex items-center justify-center gap-2 py-1.5 bg-blue-500/10 hover:bg-blue-600 text-blue-400 hover:text-white text-[10px] font-bold uppercase tracking-tighter rounded-lg border border-blue-500/20 transition-all active:scale-95"
                        >
                            <FaEdit size={12} />
                            <span>Edit</span>
                        </button>
                        
                        <button
                            onClick={() => onDelete(category.id)}
                            className="p-2 bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white rounded-lg border border-red-500/20 transition-all active:scale-95"
                            title="Delete"
                        >
                            <FaTrash size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;