import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import BlogForm from './BlogForm';
import BlogList from './BlogList';
import BlogSearch from './BlogSearch';
import EmptyState from '../common/EmptyState';
import LoadingSpinner from '../common/LoadingSpinner';

const BlogManager = ({
    blogs, allCategories, loading, showForm, setShowForm,
    editingItem, setEditingItem, selectedCategory, setSelectedCategory,
    availableSubcategories, setAvailableSubcategories,
    loadSubcategoriesByCategory, onCreate, onUpdate, onDelete, user, onView
}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        imageUrl: '',
        categoryId: '',
        subCategoryId: '',
        tags: '',
        status: 'DRAFT',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [previewMode, setPreviewMode] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const blogData = {
            title: formData.title,
            description: formData.description,
            content: formData.content,
            imageUrl: formData.imageUrl,
            status: formData.status,
            authorId: currentUser?.id || "",
            tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
            categoryMappings: [
                {
                    categoryId: formData.categoryId,
                    subCategoryIds: formData.subCategoryId ? [formData.subCategoryId] : []
                }
            ]
        };

        if (editingItem) {
            onUpdate(editingItem.id, blogData);
        } else {
            onCreate(blogData);
        }
        setShowForm(false);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            title: '', description: '', content: '', categoryId: '', subCategoryId: '',
            tags: '', status: 'DRAFT', imageUrl: ''
        });
        setSelectedCategory('');
        setPreviewMode(false);
    };

    const handleEdit = (blog) => {
        setEditingItem(blog);
        setFormData({
            title: blog.title,
            description: blog.description,
            content: blog.content,
            categoryId: blog.categoryId || blog.categoryMappings?.[0]?.categoryId,
            subCategoryId: blog.subCategoryId || blog.categoryMappings?.[0]?.subCategoryIds?.[0],
            tags: blog.tags?.join(', ') || '',
            status: blog.status,
            imageUrl: blog.imageUrl || ''
        });
        setSelectedCategory(blog.categoryId || blog.categoryMappings?.[0]?.categoryId);
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingItem(null);
        resetForm();
    };

    // Filter blogs based on search and status
    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = searchTerm === '' || 
            blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'ALL' || blog.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">My Blogs</h2>
                    <p className="text-gray-400 text-sm mt-1">
                        {blogs.length} {blogs.length === 1 ? 'blog' : 'blogs'} total
                    </p>
                </div>
                <button
                    onClick={() => {
                        setEditingItem(null);
                        resetForm();
                        setShowForm(!showForm);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600
                             hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all
                             duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] w-full sm:w-auto justify-center"
                >
                    <FaPlus /> Write New Blog
                </button>
            </div>

            {/* Search Bar - Only show when not in form mode */}
            {!showForm && blogs.length > 0 && (
                <BlogSearch
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                />
            )}

            {/* Blog Form */}
            {showForm && (
                <BlogForm
                    formData={formData}
                    setFormData={setFormData}
                    allCategories={allCategories}
                    availableSubcategories={availableSubcategories}
                    loadSubcategoriesByCategory={loadSubcategoriesByCategory}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    previewMode={previewMode}
                    setPreviewMode={setPreviewMode}
                    isEditing={!!editingItem}
                />
            )}

            {/* Blog List */}
            {loading ? (
                <LoadingSpinner />
            ) : filteredBlogs.length > 0 ? (
                <BlogList
                    blogs={filteredBlogs}
                    allCategories={allCategories}
                    onEdit={handleEdit}
                    onDelete={onDelete}
                    onView={onView}
                />
            ) : (
                <EmptyState
                    icon="📝"
                    title={searchTerm || filterStatus !== 'ALL' ? 'No matching blogs found' : 'No Blogs Yet'}
                    message={searchTerm || filterStatus !== 'ALL'
                        ? 'Try adjusting your search or filters'
                        : 'Start writing your first blog post!'}
                    actionLabel={!searchTerm && filterStatus === 'ALL' ? 'Write Your First Blog' : undefined}
                    onAction={!searchTerm && filterStatus === 'ALL' ? () => setShowForm(true) : undefined}
                />
            )}
        </div>
    );
};

export default BlogManager;