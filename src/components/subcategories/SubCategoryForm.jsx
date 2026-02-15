import React from 'react';

const SubCategoryForm = ({ formData, setFormData, allCategories, onSubmit, onCancel, isEditing }) => {
    return (
        <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
                {isEditing ? 'Edit Subcategory' : 'Create New Subcategory'}
            </h3>
            <form onSubmit={onSubmit} className="space-y-4">
                <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50
                             focus:bg-white/10 transition-all"
                    required
                >
                    <option value="">Select Category</option>
                    {allCategories.map(cat => (
                        <option key={cat.id} value={cat.id} className="bg-gray-900">
                            {cat.name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Subcategory Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white placeholder-gray-600 focus:outline-none focus:ring-2
                             focus:ring-blue-500/50 focus:bg-white/10 transition-all"
                    required
                />

                <textarea
                    placeholder="Description (optional)"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white placeholder-gray-600 focus:outline-none focus:ring-2
                             focus:ring-blue-500/50 focus:bg-white/10 transition-all resize-none"
                />

                <input
                    type="url"
                    placeholder="Image URL (optional)"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white placeholder-gray-600 focus:outline-none focus:ring-2
                             focus:ring-blue-500/50 focus:bg-white/10 transition-all"
                />

                <div className="flex gap-3">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600
                                 hover:from-blue-500 hover:to-purple-500 text-white font-medium
                                 rounded-xl transition-all duration-300"
                    >
                        {isEditing ? 'Update Subcategory' : 'Create Subcategory'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white
                                 rounded-xl transition-all border border-white/20"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SubCategoryForm;