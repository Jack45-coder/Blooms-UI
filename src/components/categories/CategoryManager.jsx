import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import EmptyState from '../common/EmptyState';

const CategoryManager = ({
    categories, loading, showForm, setShowForm,
    editingItem, setEditingItem, onCreate, onUpdate, onDelete
}) => {
    const [formData, setFormData] = useState({ name: '', description: '', imageUrl: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            onUpdate(editingItem.id, formData);
        } else {
            onCreate(formData);
        }
        setFormData({ name: '', description: '', imageUrl: '' });
    };

    const handleEdit = (category) => {
        setEditingItem(category);
        setFormData({
            name: category.name,
            description: category.description || '',
            imageUrl: category.imageUrl || ''
        });
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingItem(null);
        setFormData({ name: '', description: '', imageUrl: '' });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">My Categories</h2>
                <button
                    onClick={() => {
                        setEditingItem(null);
                        setFormData({ name: '', description: '', imageUrl: '' });
                        setShowForm(!showForm);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600
                             hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all
                             duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                >
                    <FaPlus /> Add Category
                </button>
            </div>

            {showForm && (
                <CategoryForm
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isEditing={!!editingItem}
                />
            )}

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : categories.length > 0 ? (
                <CategoryList
                    categories={categories}
                    onEdit={handleEdit}
                    onDelete={onDelete}
                />
            ) : (
                <EmptyState
                    icon="📁"
                    title="No Categories Yet"
                    message="Create your first category to organize your content!"
                    actionLabel="Create Category"
                    onAction={() => setShowForm(true)}
                />
            )}
        </div>
    );
};

export default CategoryManager;