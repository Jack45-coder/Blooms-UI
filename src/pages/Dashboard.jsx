import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useNavigate, Routes, Route } from 'react-router-dom';
import DashboardLayout from "../components/dashboard/DashboardLayout";
import DashboardOverview from "../components/dashboard/DashboardOverview";
import CategoryManager from "../components/categories/CategoryManager";
import SubCategoryManager from '../components/subcategories/SubCategoryManager';
import BlogManager from '../components/blogs/BlogManager';
import BlogViewModal from '../components/blogs/BlogViewModal';  // ✅ Import at top
import categoryService from '../service/categoryService';
import subcategoryService from '../service/subcategoryService';
import blogService from "../service/blogService";

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(localStorage.getItem('activeDashboardTab') || 'dashboard');
    const [loading, setLoading] = useState(false);
    const [viewingBlog, setViewingBlog] = useState(null);  // ✅ State for modal
    const [message, setMessage] = useState({ type: '', text: '' });
    const [searchParams, setSearchParams] = useSearchParams();

    const currentTab = location.pathname.split('/').pop() === 'dashboard'
                       ? 'dashboard'
                       : location.pathname.split('/').pop();

    const handleTabChange = (tabName) => {
        if(tabName === 'dashboard'){
            navigate('/dashboard');
        }else{
            navigate(`/dashboard/${tabName}`);
        }
    };

    useEffect(() => {
        const tabFromUrl = searchParams.get('tab');
        if(tabFromUrl && tabFromUrl !== activeTab){
            setActiveTab(tabFromUrl);
        }
    }, [searchParams]);

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
        localStorage.setItem('activeDashboardTab', activeTab);
    }, [activeTab]);

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("currentUser"));
        if (storedUser) {
            setUser(storedUser);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        if (user?.id) {
            loadUserData();
        }
    }, [user]);

    const loadUserData = async () => {
        setLoading(true);
        try {
            const [categoriesRes, subcategoriesRes, blogsRes] = await Promise.all([
                categoryService.getAllCategories(),
                subcategoryService.getAllSubCategories(),
                blogService.getBlogsByAuthor(user.id)
            ]);

            // Load User Categories
            if (categoriesRes?.success && categoriesRes.data) {
                const userCategories = categoriesRes.data.filter(cat => {
                    const creatorId = String(cat.createdBy || "");
                    const currentUserId = String(user.id || "");
                    return creatorId === currentUserId;
                });

                setMyCategories(userCategories);
                setAllCategories(categoriesRes.data || []);
            }

            // Load User SubCategories
            if (subcategoriesRes?.success && subcategoriesRes.data) {
                const userSubCategories = subcategoriesRes.data.filter(sCat => {
                    const creatorId = String(sCat.createdBy || "");
                    const currentUserId = String(user.id || "");
                    return creatorId === currentUserId;
                });

                setMySubcategories(userSubCategories);
                setAvailableSubcategories(subcategoriesRes.data || []);
            }

            // Load User Blogs
            if (blogsRes?.success && blogsRes.data) {
                const currentUserId = String(user.id || "");
                const userBlogs = blogsRes.data.filter(blog => {
                    const authorId = String(blog.authorId || "");
                    return authorId === currentUserId;
                });

                setMyBlogs(userBlogs);
            }

        } catch (error) {
            console.error('Error in loadUserData:', error);
            showMessage('error', 'Failed to load your data');
        } finally {
            setLoading(false);
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

    // Blog Handlers
    const handleCreateBlog = async (blogData) => {
        try {
            const response = await blogService.createBlog({
                ...blogData,
                authorId: user.id
            });

            if (response.success) {
                showMessage('success', "Blog created successfully!");
                loadUserData();
                setShowBlogForm(false);
            }
        } catch (error) {
            showMessage('error', error.message || 'Failed to create Blog');
        }
    };

    const handleUpdateBlog = async (id, blogData) => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const userId = currentUser?.id || currentUser?.authorId;

        try {
            const response = await blogService.updateBlog(id, blogData, userId);
            if (response.success) {
                showMessage('success', 'Blog updated successfully!');
                loadUserData();
                setShowBlogForm(false);
                setEditingItem(null);
            }
        } catch (error) {
            showMessage('error', 'Failed to update blog');
        }
    };

    const handleDeleteBlog = async (id) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return;

        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const userId = currentUser?.id || currentUser?.authorId;

        if (!userId) {
            alert("Session expired. Please login again.");
            return;
        }

        try {
            const response = await blogService.deleteBlog(id, userId);
            if (response.success) {
                showMessage('success', 'Blog deleted successfully!');
                loadUserData();
            }
        } catch (error) {
            setMessage('error', 'Failed to delete blog');
        }
    };

    // Blog View Handler
    const handleViewBlog = (blog) => {
        console.log('Viewing blog:', blog); // Debug
        setViewingBlog(blog);
        // Optional: Update URL with query param
        navigate(`/dashboard/blogs?view=blog&id=${blog.id}`, { replace: true });
    };

    // Close Modal Handler
    const handleCloseModal = () => {
        setViewingBlog(null);
        // Remove query params
        navigate('/dashboard/blogs', { replace: true });
    };

    // Check URL params on mount/change
    useEffect(() => {
        const viewParam = searchParams.get('view');
        const idParam = searchParams.get('id');

        if (viewParam === 'blog' && idParam && myBlogs.length > 0) {
            const blog = myBlogs.find(b => b.id === idParam);
            if (blog) {
                setViewingBlog(blog);
            }
        }
    }, [searchParams, myBlogs]);

    // SubCategory Handlers
    const handleCreateSubCategory = async (data) => {
        try {
            const response = await subcategoryService.createSubCategory({
                ...data, createdBy: user.id
            });
            if (response.success) {
                showMessage('success', 'Subcategory created!');
                loadUserData();
                setShowSubCategoryForm(false);
            }
        } catch (error) {
            setMessage('error', 'Error creating subcategory');
        }
    };

    const handleUpdateSubCategory = async (id, data) => {
        try {
            const response = await subcategoryService.updateSubCategory(id, data);
            if (response.success) {
                showMessage('success', 'Subcategory updated!');
                loadUserData();
                setShowSubCategoryForm(false);
                setEditingItem(null);
            }
        } catch (error) {
            showMessage('error', 'Error updating subcategory');
        }
    };

    const handleDeleteSubCategory = async (id) => {
        if (!window.confirm('Delete this subcategory?')) return;
        try {
            const response = await subcategoryService.deleteSubCategory(id);
            if (response.success) {
                showMessage('success', 'Subcategory deleted!');
                loadUserData();
            }
        } catch (error) {
            showMessage('error', 'Error deleting subcategory');
        }
    };

    if (!user) return <div className="text-white p-8">Loading user...</div>;

    const stats = {
        categories: myCategories.length,
        subcategories: mySubcategories.length,
        blogs: myBlogs.length
    };

    // ✅ Helper function to get category name
    const getCategoryNameForBlog = (blog) => {
        if (!blog) return 'Uncategorized';
        
        const categoryId = blog.categoryId || blog.categoryMappings?.[0]?.categoryId;
        if (!categoryId) return 'Uncategorized';
        
        const category = allCategories.find(c => c.id === categoryId);
        return category?.name || 'Uncategorized';
    };

    return (
        <DashboardLayout
            activeTab={currentTab}
            setActiveTab={handleTabChange}
            user={user}
            message={message}
        >
            <Routes>
                <Route path="/" element={
                    <DashboardOverview
                        user={user}
                        stats={stats}
                        recentBlogs={myBlogs.slice(0, 5)}
                        loading={loading}
                        onViewAll={handleTabChange}
                    />
                } />
                
                <Route path="categories" element={
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
                } />
                
                <Route path="subcategories" element={
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
                } />
                
                {/* ✅ Main Blogs Route */}
                <Route path="blogs" element={
                    <>
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
                            onView={handleViewBlog}  // ✅ Use wrapped handler
                        />
                    </>
                } />
            </Routes>

            {/* ✅ Blog View Modal - Rendered outside Routes but inside DashboardLayout */}
            {viewingBlog && (
                <BlogViewModal
                    blog={viewingBlog}
                    categoryName={getCategoryNameForBlog(viewingBlog)}
                    onClose={handleCloseModal}
                />
            )}
        </DashboardLayout>
    );
};

export default Dashboard;