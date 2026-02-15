import React, { useState } from 'react';
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
    loadSubcategoriesByCategory, onCreate, onUpdate, onDelete, user
}) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        categoryId: '',
        subCategoryId: '',
        tags: '',
        status: 'DRAFT',
        featuredImage: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [previewMode, setPreviewMode] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const blogData = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            authorId: user.id
        };

        if (editingItem) {
            onUpdate(editingItem.id, blogData);
        } else {
            onCreate(blogData);
        }

        resetForm();
    };

    const resetForm = () => {
        setFormData({
            title: '', content: '', categoryId: '', subCategoryId: '',
            tags: '', status: 'DRAFT', featuredImage: ''
        });
        setSelectedCategory('');
        setPreviewMode(false);
    };

    const handleEdit = (blog) => {
        setEditingItem(blog);
        setFormData({
            title: blog.title,
            content: blog.content,
            categoryId: blog.categoryId,
            subCategoryId: blog.subCategoryId,
            tags: blog.tags?.join(', ') || '',
            status: blog.status,
            featuredImage: blog.featuredImage || ''
        });
        setSelectedCategory(blog.categoryId);
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingItem(null);
        resetForm();
    };

    // Filter blogs based on search and status
    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            blog.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'ALL' || blog.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">My Blogs</h2>
                <button
                    onClick={() => {
                        setEditingItem(null);
                        resetForm();
                        setShowForm(!showForm);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600
                             hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all
                             duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                >
                    <FaPlus /> Write New Blog
                </button>
            </div>

            {!showForm && blogs.length > 0 && (
                <BlogSearch
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                />
            )}

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

            {loading ? (
                <LoadingSpinner />
            ) : filteredBlogs.length > 0 ? (
                <BlogList
                    blogs={filteredBlogs}
                    allCategories={allCategories}
                    availableSubcategories={availableSubcategories}
                    onEdit={handleEdit}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
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