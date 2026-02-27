import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaFolderOpen, 
  FaExclamationTriangle,
  FaLayerGroup,
  FaNewspaper,
  FaSpinner,
  FaEye,
  FaHeart
} from "react-icons/fa";

import categoryService from "../../service/categoryService";
import subcategoryService from "../../service/subcategoryService";
import blogService from "../../service/blogService";
import BlogCard from "../blogs/BlogCard";
import SubCategoryCard from "../subcategories/SubCategoryCard";
import BlogViewModal from "../blogs/BlogViewModal";
import Footer from "../Footer"; 
import EmptyState from "../common/EmptyState";

const CategoryViewModel = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  // --- LOCAL STATE ---
  const [data, setData] = useState({ 
    category: null, 
    blogs: [], 
    subcategories: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [activeTab, setActiveTab] = useState('blogs');
  const [stats, setStats] = useState({
    totalViews: 0,
    totalLikes: 0,
    totalSubcategories: 0,
    totalBlogs: 0
  });

  // Fetch all data
  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch category details
      const categoryResponse = await categoryService.getCategoryById(categoryId);
      
      if (!categoryResponse) {
        setError("Category not found");
        return;
      }

      let categoryData;
      if (categoryResponse.success && categoryResponse.data) {
        categoryData = categoryResponse.data;
      } else if (categoryResponse.data) {
        categoryData = categoryResponse.data;
      } else {
        categoryData = categoryResponse;
      }

      if (!categoryData) {
        setError("Category data is empty");
        return;
      }
      
      // Fetch subcategories
      let subcategories = [];
      try {
        const subcatResponse = await subcategoryService.getSubCategoriesByCategory(categoryId);
        if (subcatResponse?.success && subcatResponse?.data) {
          subcategories = subcatResponse.data;
        } else if (Array.isArray(subcatResponse)) {
          subcategories = subcatResponse;
        }
      } catch (err) {
        console.warn('Could not fetch subcategories:', err);
      }

      // Fetch blogs
      let blogs = [];
      
      if (categoryData.blogs && categoryData.blogs.length > 0) {
        blogs = categoryData.blogs;
      } else {
        try {
          const allBlogsResponse = await blogService.getAllBlogs();
          
          let allBlogs = [];
          if (allBlogsResponse?.success && allBlogsResponse?.data) {
            allBlogs = allBlogsResponse.data;
          } else if (Array.isArray(allBlogsResponse)) {
            allBlogs = allBlogsResponse;
          }
          
          blogs = allBlogs.filter(blog => 
            blog.categoryId === categoryId || 
            blog.category === categoryId ||
            (blog.categoryMappings && blog.categoryMappings.some(map => map.categoryId === categoryId))
          );
        } catch (err) {
          console.warn('Could not fetch blogs:', err);
        }
      }

      // Calculate statistics
      const totalViews = blogs.reduce((sum, blog) => sum + (parseInt(blog.views) || 0), 0);
      const totalLikes = blogs.reduce((sum, blog) => sum + (parseInt(blog.likes) || 0), 0);

      setStats({
        totalViews,
        totalLikes,
        totalSubcategories: subcategories.length,
        totalBlogs: blogs.length
      });

      setData({
        category: categoryData,
        blogs: blogs,
        subcategories: subcategories
      });

    } catch (err) {
      console.error('Error fetching category data:', err);
      setError(err?.message || "Failed to load category data");
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    if (categoryId) {
      fetchAllData();
    }
  }, [categoryId, fetchAllData]);

  const handleBlogView = (blog) => {
    setSelectedBlog(blog);
  };

  const handleBlogEdit = (blog) => {
    navigate(`/dashboard/blogs?edit=${blog.id}`);
  };

  const handleBlogDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        await blogService.deleteBlog(blogId, currentUser?.id);
        fetchAllData();
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const handleSubCategoryEdit = (subcategory) => {
    navigate(`/dashboard/subcategories?edit=${subcategory.id}`);
  };

  const handleSubCategoryDelete = async (subcategoryId) => {
    if (window.confirm('Are you sure you want to delete this subcategory?')) {
      try {
        await subcategoryService.deleteSubCategory(subcategoryId);
        fetchAllData();
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050507] flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-blue-500 text-4xl mx-auto mb-4" />
          <p className="text-gray-400">Loading category details...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !data.category) {
    return (
      <div className="min-h-screen bg-[#050507] flex items-center justify-center p-6">
        <div className="bg-white/0.02 border border-red-500/20 rounded-2xl p-8 text-center max-w-md">
          <FaExclamationTriangle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
          <p className="text-gray-400 mb-6">{error || "Category not found"}</p>
          <button 
            onClick={() => navigate('/dashboard/categories')} 
            className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all"
          >
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      
      {/* Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/15 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full animate-pulse delay-1000" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        
        {/* Header with Back Button */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/dashboard/categories')} 
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <FaArrowLeft size={12} />
            <span>Back to Categories</span>
          </button>
        </div>

        {/* Category Info */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600/10 rounded-xl">
              <FaFolderOpen className="text-blue-400" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{data.category.name}</h1>
              {data.category.description && (
                <p className="text-gray-400 text-sm mt-1">{data.category.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white/0.02 border border-white/5 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{stats.totalBlogs}</div>
            <div className="text-xs text-gray-500 mt-1">Total Blogs</div>
          </div>
          <div className="bg-white/0.02 border border-white/5 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{stats.totalSubcategories}</div>
            <div className="text-xs text-gray-500 mt-1">Subcategories</div>
          </div>
          <div className="bg-white/0.02 border border-white/5 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{stats.totalViews}</div>
            <div className="text-xs text-gray-500 mt-1">Total Views</div>
          </div>
          <div className="bg-white/0.02 border border-white/5 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-pink-400">{stats.totalLikes}</div>
            <div className="text-xs text-gray-500 mt-1">Total Likes</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-6 border-b border-white/5">
          <button
            onClick={() => setActiveTab('blogs')}
            className={`pb-2 text-sm font-medium transition-colors relative ${
              activeTab === 'blogs' ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Blogs ({data.blogs.length})
            {activeTab === 'blogs' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500" />
            )}
          </button>
          
          {data.subcategories.length > 0 && (
            <button
              onClick={() => setActiveTab('subcategories')}
              className={`pb-2 text-sm font-medium transition-colors relative ${
                activeTab === 'subcategories' ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Subcategories ({data.subcategories.length})
              {activeTab === 'subcategories' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500" />
              )}
            </button>
          )}
        </div>

        {/* Content */}
        {activeTab === 'blogs' && (
          <div>
            {data.blogs.length > 0 ? (
              <div className="space-y-4">
                {data.blogs.map((blog) => (
                  <BlogCard
                    key={blog._id || blog.id}
                    blog={blog}
                    categoryName={data.category.name}
                    onEdit={handleBlogEdit}
                    onDelete={handleBlogDelete}
                    onView={handleBlogView}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FaNewspaper size={48} className="mx-auto text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No Blogs Yet</h3>
                <p className="text-gray-400 text-sm mb-4">This category doesn't have any blogs yet.</p>
                <button
                  onClick={() => navigate('/dashboard/blogs?action=create')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all text-sm"
                >
                  Create Blog
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'subcategories' && data.subcategories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.subcategories.map((subcat) => (
              <SubCategoryCard
                key={subcat._id || subcat.id}
                subcategory={subcat}
                categoryName={data.category.name}
                onEdit={handleSubCategoryEdit}
                onDelete={handleSubCategoryDelete}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* Blog View Modal */}
      {selectedBlog && (
        <BlogViewModal 
          blog={selectedBlog} 
          categoryName={data.category?.name} 
          onClose={() => setSelectedBlog(null)} 
        />
      )}
    </div>
  );
};

export default CategoryViewModel;