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
      <section className="relative pt-20 pb-10 px-4 overflow-hidden border-b border-white/5">
        {/* 1. Seamless Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          {/* Navbar ke piche wala glow */}
          <div className="absolute top-0 left-1/4 w-500px h-300px bg-blue-600/20 blur-[120px] rounded-full" />
          <div className="absolute top-10 right-1/4 w-500px h-300px bg-purple-600/15 blur-[120px] rounded-full" />

          {/* Subtle Grid for depth */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-100" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">

          <h1 className="flex flex-col gap-2 mb-8 select-none">
            {/* Line 1: Main Brand */}
            <span className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none italic bg-linear-to-b from-white via-white to-white/20 bg-clip-text text-transparent opacity-90">
              BLOOM'S
            </span>

            {/* Line 2: The Action Part */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6">
              <span className="text-5xl md:text-7xl lg:text-8xl font-thin tracking-widest leading-none text-white/40 uppercase">
                Blog
              </span>
              <span className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none bg-linear-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                System.
              </span>
            </div>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-medium leading-relaxed mb-10">
            Discover amazing stories, insights, and knowledge from our community
            of writers.
          </p>

          {/* Search Bar - Modern Design */}
          <div className="max-w-2xl mx-auto group relative">
            <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative flex items-center bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl">
              <FaSearch className="ml-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search for blogs, tips, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent border-none focus:ring-0 text-white px-4 py-3 placeholder:text-gray-600"
              />
              <button className="hidden sm:block bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-xl transition-all">
                Search
              </button>
            </div>
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
    </div>
  );
};

export default Home;
