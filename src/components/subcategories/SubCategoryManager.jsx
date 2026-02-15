import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import SubCategoryForm from './SubCategoryForm';
import SubCategoryList from './SubCategoryList';
import EmptyState from '../common/EmptyState';
import LoadingSpinner from '../common/LoadingSpinner';

const SubCategoryManager = ({
    subcategories, allCategories, loading, showForm, setShowForm,
    editingItem, setEditingItem, onCreate, onUpdate, onDelete
}) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        categoryId: '',
        imageUrl: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            onUpdate(editingItem.id, formData);
        } else {
            onCreate(formData);
        }
        setFormData({ name: '', description: '', categoryId: '', imageUrl: '' });
    };

    const handleEdit = (subcategory) => {
        setEditingItem(subcategory);
        setFormData({
            name: subcategory.name,
            description: subcategory.description || '',
            categoryId: subcategory.categoryId,
            imageUrl: subcategory.imageUrl || ''
        });
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingItem(null);
        setFormData({ name: '', description: '', categoryId: '', imageUrl: '' });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">My Subcategories</h2>
                <button
                    onClick={() => {
                        setEditingItem(null);
                        setFormData({ name: '', description: '', categoryId: '', imageUrl: '' });
                        setShowForm(!showForm);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600
                             hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all
                             duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                >
                    <FaPlus /> Add Subcategory
                </button>
            </div>

            {showForm && (
                <SubCategoryForm
                    formData={formData}
                    setFormData={setFormData}
                    allCategories={allCategories}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isEditing={!!editingItem}
                />
            )}

            {loading ? (
                <LoadingSpinner />
            ) : subcategories.length > 0 ? (
                <SubCategoryList
                    subcategories={subcategories}
                    allCategories={allCategories}
                    onEdit={handleEdit}
                    onDelete={onDelete}
                />
            ) : (
                <EmptyState
                    icon="📂"
                    title="No Subcategories Yet"
                    message="Create subcategories under your main categories!"
                    actionLabel="Create Subcategory"
                    onAction={() => setShowForm(true)}
                />
            )}
        </div>
    );
};

export default SubCategoryManager;