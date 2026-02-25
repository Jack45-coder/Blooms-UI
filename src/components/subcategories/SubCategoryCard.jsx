import { FaEdit, FaTrash } from 'react-icons/fa';

const SubCategoryCard = ({ subcategory, categoryName, onEdit, onDelete }) => {
    return (
        /* Outer container: Scale effect and shadow bloom */
        <div className="group relative p-[1.5px] overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            
            {/* 1. ALWAYS-ON RACING BORDER (Purple/Indigo Theme) */}
            <div className="absolute inset-[-400%] animate-border-slow z-0 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                <div 
                    className="h-full w-full"
                    style={{
                        background: "conic-gradient(from 0deg, transparent 0%, transparent 40%, #8b5cf6 50%, #d946ef 60%, transparent 70%, transparent 100%)"
                    }}
                />
            </div>

            {/* 2. CARD INNER CONTENT */}
            <div className="relative z-10 h-full bg-[#0a0a0c] rounded-[calc(1rem-1px)] overflow-hidden flex flex-col border border-white/5">
                
                {/* Image Section with Category Badge */}
                <div className="relative h-36 overflow-hidden">
                    <img
                        src={subcategory.imageUrl || 'https://via.placeholder.com/400x200?text=Subcategory'}
                        alt={subcategory.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0c] via-transparent to-transparent opacity-90" />
                    
                    {/* Parent Category Badge */}
                    <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 bg-purple-500/20 backdrop-blur-md rounded-md text-[9px] font-black uppercase tracking-[0.15em] text-purple-200 border border-purple-500/30">
                            {categoryName}
                        </span>
                    </div>

                    <div className="absolute bottom-2 left-4">
                        <h3 className="text-base font-bold text-white tracking-wide group-hover:text-purple-400 transition-colors">
                            {subcategory.name}
                        </h3>
                    </div>
                </div>

                {/* Info & Actions */}
                <div className="p-4 flex flex-col justify-between grow">
                    <p className="text-gray-400 text-[11px] leading-relaxed mb-4 line-clamp-2">
                        {subcategory.description || "Detailed insights for this sub-category workspace."}
                    </p>
                    
                    {/* Compact Action Buttons */}
                    <div className="flex items-center gap-2 mt-auto">
                        <button
                            onClick={() => onEdit(subcategory)}
                            className="flex-1 flex items-center justify-center gap-2 py-1.5 bg-purple-500/10 hover:bg-purple-600 text-purple-400 hover:text-white text-[10px] font-bold uppercase tracking-tighter rounded-lg border border-purple-500/20 transition-all active:scale-95"
                        >
                            <FaEdit size={12} />
                            <span>Edit</span>
                        </button>
                        
                        <button
                            onClick={() => onDelete(subcategory.id)}
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

export default SubCategoryCard;