import { useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import BlogPreview from './BlogPreview';

const BlogForm = ({
    formData, setFormData, allCategories, availableSubcategories,
    loadSubcategoriesByCategory, onSubmit, onCancel,
    previewMode, setPreviewMode, isEditing
}) => {

    // Category change hone par subcategories fetch karo
    useEffect(() => {
        if (formData.categoryId) {
            loadSubcategoriesByCategory(formData.categoryId);
        }
    }, [formData.categoryId]);

    const getCategoryName = (categoryId) => {
        const category = allCategories.find(c => c.id === categoryId);
        return category?.name || 'Unknown';
    };

    const getSubCategoryName = (subCategoryId) => {
        const sub = availableSubcategories.find(s => s.id === subCategoryId);
        return sub?.name || 'Unknown';
    };

    if (previewMode) {
        return (
            <BlogPreview
                formData={formData}
                getCategoryName={getCategoryName}
                getSubCategoryName={getSubCategoryName}
                onBack={() => setPreviewMode(false)}
            />
        );
    }

    return (
        <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">
                    {isEditing ? 'Edit Blog' : 'Write New Blog'}
                </h3>
                <button
                    onClick={() => setPreviewMode(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20
                             text-white rounded-lg transition-all"
                >
                    <FaEye /> Preview
                </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Blog Title"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white placeholder-gray-600 focus:outline-none focus:ring-2
                             focus:ring-blue-500/50 focus:bg-white/10 transition-all text-xl"
                    required
                />

                <div className="grid grid-cols-2 gap-4">
                    <select
                        value={formData.categoryId || ''}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                categoryId: e.target.value,
                                subCategoryId: ''
                            });
                        }}
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

                    <select
                        value={formData.subCategoryId || ''}
                        onChange={(e) => setFormData({ ...formData, subCategoryId: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                                 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50
                                 focus:bg-white/10 transition-all"
                        disabled={!formData.categoryId}
                    >
                        <option value="">Select Subcategory</option>
                        {availableSubcategories.map(sub => (
                            <option key={sub.id} value={sub.id} className="bg-gray-900">
                                {sub.name}
                            </option>
                        ))}
                    </select>
                </div>

                <textarea
                    placeholder="Write your blog content here..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows="12"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white placeholder-gray-600 focus:outline-none focus:ring-2
                             focus:ring-blue-500/50 focus:bg-white/10 transition-all resize-y"
                    required
                />

                <input
                    type="url"
                    placeholder="Featured Image URL (optional)"
                    value={formData.featuredImage}
                    onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white placeholder-gray-600 focus:outline-none focus:ring-2
                             focus:ring-blue-500/50 focus:bg-white/10 transition-all"
                />

                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Tags (comma separated)"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                                 text-white placeholder-gray-600 focus:outline-none focus:ring-2
                                 focus:ring-blue-500/50 focus:bg-white/10 transition-all"
                    />

                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                                 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50
                                 focus:bg-white/10 transition-all"
                    >
                        <option value="DRAFT">Save as Draft</option>
                        <option value="PUBLISHED">Publish Now</option>
                    </select>
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600
                                 hover:from-blue-500 hover:to-purple-500 text-white font-medium
                                 rounded-xl transition-all duration-300"
                    >
                        {isEditing ? 'Update Blog' : 'Publish Blog'}
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

export default BlogForm;