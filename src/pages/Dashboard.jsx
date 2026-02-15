import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from "../components/dashboard/DashboardLayout";
import DashboardOverview from "../components/dashboard/DashboardOverview";
import CategoryManager from "../components/categories/CategoryManager";
import SubCategoryManager from '../components/subcategories/SubCategoryManager';
import BlogManager from '../components/blogs/BlogManager';
import categoryService from '../service/categoryService';
import subcategoryService from '../service/subcategoryService';
import blogService from "../service/blogService";

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // User's Own Data
    const [myCategories, setMyCategories] = useState([]);
    const [mySubcategories, setMySubcategories] = useState([]);
    const [myBlogs, setMyBlogs] = useState([]);

    // All Categories for Selection
    const [allCategories, setAllCategories] = useState([]);

    // Form States
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [showSubCategoryForm, setShowSubCategoryForm] = useState(false);
    const [showBlogForm, setShowBlogForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [availableSubcategories, setAvailableSubcategories] = useState([]);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("currentUser"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    useEffect(() => {
        if (user) {
            loadUserData();
            loadAllCategories();
        }
    }, [user]);

    const loadUserData = async () => {
        setLoading(true);
        try {
            const blogsRes = await blogService.getBlogsByAuthor(user.id);
            if (blogsRes.success) {
                setMyBlogs(blogsRes.data || []);
            }

            const categoriesRes = await categoryService.getAllCategories();
            const subcategoriesRes = await subcategoryService.getAllSubCategories();

            if (categoriesRes.success) {
                const userCategories = (categoriesRes.data || []).filter(
                    cat => cat.createdBy === user.id
                );
                setMyCategories(userCategories);
            }

            if (subcategoriesRes.success) {
                const userSubcategories = (subcategoriesRes.data || []).filter(
                    sub => sub.createdBy === user.id
                );
                setMySubcategories(userSubcategories);
            }
        } catch (error) {
            showMessage('error', 'Failed to load your data');
        } finally {
            setLoading(false);
        }
    };

    const loadAllCategories = async () => {
        try {
            const response = await categoryService.getAllCategories();
            if (response.success) {
                setAllCategories(response.data || []);
            }
        } catch (error) {
            console.error('Failed to load categories:', error);
        }
    };

    const loadSubcategoriesByCategory = async (categoryId) => {
        try {
            const response = await subcategoryService.getSubCategoriesByCategory(categoryId);
            if (response.success) {
                setAvailableSubcategories(response.data || []);
            }
        } catch (error) {
            console.error('Failed to load subcategories:', error);
        }
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    // CRUD Handlers
    const handleCreateCategory = async (categoryData) => {
        try {
            const response = await categoryService.createCategory({
                ...categoryData,
                createdBy: user.id
            });
            if (response.success) {
                showMessage('success', 'Category created successfully!');
                loadUserData();
                setShowCategoryForm(false);
            }
        } catch (error) {
            showMessage('error', error.message || 'Failed to create category');
        }
    };

    const handleUpdateCategory = async (id, categoryData) => {
        try {
            const response = await categoryService.updateCategory(id, categoryData);
            if (response.success) {
                showMessage('success', 'Category updated successfully!');
                loadUserData();
                setShowCategoryForm(false);
                setEditingItem(null);
            }
        } catch (error) {
            showMessage('error', 'Failed to update category');
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;
        try {
            const response = await categoryService.deleteCategory(id);
            if (response.success) {
                showMessage('success', 'Category deleted successfully!');
                loadUserData();
            }
        } catch (error) {
            showMessage('error', 'Failed to delete category');
        }
    };

    // Similar handlers for subcategories and blogs...

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    if (!user) return "User not found";

    const stats = {
        categories: myCategories.length,
        subcategories: mySubcategories.length,
        blogs: myBlogs.length
    };

    return (
        <DashboardLayout
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            user={user}
            message={message}
            onLogout={handleLogout}
        >
            {activeTab === 'dashboard' && (
                <DashboardOverview
                    user={user}
                    stats={stats}
                    recentBlogs={myBlogs.slice(0, 5)}
                    loading={loading}
                    onViewAll={setActiveTab}
                />
            )}

            {activeTab === 'categories' && (
                <CategoryManager
                    categories={myCategories}
                    loading={loading}
                    showForm={showCategoryForm}
                    setShowForm={setShowCategoryForm}
                    editingItem={editingItem}
                    setEditingItem={setEditingItem}
                    onCreate={handleCreateCategory}
                    onUpdate={handleUpdateCategory}
                    onDelete={handleDeleteCategory}
                />
            )}

            {activeTab === 'subcategories' && (
                <SubCategoryManager
                    subcategories={mySubcategories}
                    allCategories={allCategories}
                    loading={loading}
                    showForm={showSubCategoryForm}
                    setShowForm={setShowSubCategoryForm}
                    editingItem={editingItem}
                    setEditingItem={setEditingItem}
                    onCreate={handleCreateSubCategory}
                    onUpdate={handleUpdateSubCategory}
                    onDelete={handleDeleteSubCategory}
                />
            )}

            {activeTab === 'blogs' && (
                <BlogManager
                    blogs={myBlogs}
                    allCategories={allCategories}
                    loading={loading}
                    showForm={showBlogForm}
                    setShowForm={setShowBlogForm}
                    editingItem={editingItem}
                    setEditingItem={setEditingItem}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    availableSubcategories={availableSubcategories}
                    setAvailableSubcategories={setAvailableSubcategories}
                    loadSubcategoriesByCategory={loadSubcategoriesByCategory}
                    onCreate={handleCreateBlog}
                    onUpdate={handleUpdateBlog}
                    onDelete={handleDeleteBlog}
                    user={user}
                />
            )}
        </DashboardLayout>
    );
};

export default Dashboard;