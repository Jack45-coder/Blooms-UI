import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaEye,
  FaHeart,
  FaUser,
  FaSearch,
  FaFilter,
  FaTimes,
  FaArrowRight,
} from "react-icons/fa";
import blogService from "../service/blogService";
import categoryService from "../service/categoryService";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [featuredBlogs, setFeaturedBlogs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch all blogs
      const blogsResponse = await blogService.getAllBlogs();
      let allBlogs = [];
      if (blogsResponse?.success && blogsResponse?.data) {
        allBlogs = blogsResponse.data;
      } else if (Array.isArray(blogsResponse)) {
        allBlogs = blogsResponse;
      }

      // Filter only published blogs
      const publishedBlogs = allBlogs.filter(
        (blog) => blog.status === "PUBLISHED" || blog.status === "published",
      );

      setBlogs(publishedBlogs);

      // Set featured blogs (most viewed or recent)
      setFeaturedBlogs(publishedBlogs.slice(0, 3));

      // Fetch categories
      const categoriesResponse = await categoryService.getAllCategories();
      if (categoriesResponse?.success && categoriesResponse?.data) {
        setCategories(categoriesResponse.data);
      } else if (Array.isArray(categoriesResponse)) {
        setCategories(categoriesResponse);
      }
    } catch (error) {
      console.error("Error fetching home data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Recent";
    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return "Recent";
      return dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Recent";
    }
  };

  // Filter and sort blogs
  const getFilteredBlogs = () => {
    let filtered = [...blogs];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (blog) =>
          blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.content?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (blog) =>
          blog.categoryId === selectedCategory ||
          blog.category === selectedCategory ||
          blog.categoryMappings?.some(
            (map) => map.categoryId === selectedCategory,
          ),
      );
    }

    // Sort
    switch (sortBy) {
      case "latest":
        filtered.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0),
        );
        break;
      case "mostViewed":
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case "mostLiked":
        filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredBlogs = getFilteredBlogs();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 border-b border-white/10">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Bloom's Blog System
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover amazing stories, insights, and knowledge from our
              community of writers.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <span className="text-sm text-gray-300">Filter by:</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="mostViewed">Most Viewed</option>
              <option value="mostLiked">Most Liked</option>
            </select>
          </div>

          <div className="text-sm text-gray-400">
            {filteredBlogs.length}{" "}
            {filteredBlogs.length === 1 ? "blog" : "blogs"} found
          </div>
        </div>
      </section>

      {/* Featured Blogs Section */}
      {featuredBlogs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold mb-8">Featured Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredBlogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.id}`}
                className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-blue-600/20 to-purple-600/20 border border-white/10 hover:border-blue-500/40 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={
                      blog.imageUrl ||
                      "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=1000"
                    }
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                    {blog.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <FaEye /> {blog.views || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaHeart className="text-red-500" /> {blog.likes || 0}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Blogs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-8">All Blogs</h2>

        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.id}`}
                className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/40 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={
                      blog.imageUrl ||
                      "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=1000"
                    }
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-green-500/20 backdrop-blur-md rounded-full text-xs text-green-400 border border-green-500/30">
                      {blog.status}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-[10px] text-gray-500 mb-4">
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt className="opacity-50" />
                      {new Date(blog.createdDTTM).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaEye /> {blog.views || 0}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                    {blog.description || "No description available"}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FaUser />
                      <span>{blog.author || "Anonymous"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-400 group-hover:gap-3 transition-all">
                      Read More <FaArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
            <h3 className="text-xl font-semibold mb-2">No blogs found</h3>
            <p className="text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-white/10 p-12 text-center">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px]" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Get the latest blogs and updates delivered directly to your inbox.
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
              />
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
