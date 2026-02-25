import { FaEdit, FaTrash } from 'react-icons/fa';

const CategoryCard = ({ category, onEdit, onDelete }) => {
    return (
        <div className="group relative bg-white/5 backdrop-blur-lg border border-white/10
                      rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300
                      hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <div className="relative h-40">
                <img
                    src={category.imageUrl || 'https://via.placeholder.com/400x200?text=My+Category'}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
                <h3 className="absolute bottom-3 left-3 text-xl font-bold text-white">
                    {category.name}
                </h3>
            </div>
            <div className="p-4">
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {category.description || 'No description provided'}
                </p>
                <div className="flex gap-2 shrink-0">
                    <button
                        onClick={() => onEdit(category)}
                        title="Edit Category"
                        className="p-2.5 bg-blue-500/20 hover:bg-blue-500/40 text-blue-400
                                 rounded-xl transition-all border border-blue-500/30"
                    >
                        <FaEdit size={18} />
                    </button>
                    <button
                        onClick={() => onDelete(category.id)}
                        title="Delete Category"
                        className="p-2.5 bg-red-500/20 hover:bg-red-500/40 text-red-400
                                 rounded-xl transition-all border border-red-500/30"
                    >
                        <FaTrash size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;