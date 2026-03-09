import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaEye,
  FaHeart,
  FaArrowLeft,
  FaUser,
  FaExclamationTriangle,
} from "react-icons/fa";
import blogService from "../service/blogService";
import LoadingSpinner from "../components/common/LoadingSpinner";

const BlogDetailPage = () => {
  // ✅ Check karein ki aapke App.js mein path "/blog/:blogId" hai ya "/blog/:id"
  const params = useParams();
  const blogId = params.blogId || params.id;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (blogId) {
      fetchBlog();
    } else {
      console.log("Error fetch: ");
      setError("No Blog ID found in URL");
      setLoading(false);
    }
  }, [blogId]);

  const fetchBlog = async () => {
    try {
      const response = await blogService.getBlogById(blogId);
      console.log("Api Response: ", response);
      if (response && response.success && response.data) {
        setBlog(response.data);
      } else if (response && response.data) {
        setBlog(response.data);
      } else {
        setError("Blog data not found!");
      }
    } catch (err) {
      setError("Server Error: ", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Recent";
    const d = new Date(date);
    return isNaN(d.getTime())
      ? "Recent"
      : d.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  if (error || !blog)
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center max-w-md shadow-2xl">
          <FaExclamationTriangle
            size={48}
            className="text-red-500 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-white mb-2">Notice</h2>
          <p className="text-gray-400 mb-6">
            {error || "This blog post is unavailable."}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
          >
            <FaArrowLeft size={14} /> Back to Home
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
        >
          <FaArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Back to Home</span>
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-4 pb-20">
        <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 mb-10 pb-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center border-2 border-white/10 shadow-lg">
              <FaUser size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                {blog.author || "Editorial Team"}
              </p>
              <p className="text-[10px] text-blue-500 uppercase font-black tracking-widest">
                Verified Author
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 text-xs font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-5 py-3 rounded-2xl border border-white/5">
            <span className="flex items-center gap-2">
              <FaCalendarAlt className="text-blue-500" />{" "}
              {formatDate(blog.createdDTTM)}
            </span>
            <span className="flex items-center gap-2">
              <FaEye className="text-emerald-500" /> {blog.views || 0} Views
            </span>
            <span className="flex items-center gap-2">
              <FaHeart className="text-red-500" /> {blog.likes || 0}
            </span>
          </div>
        </div>

        {blog.imageUrl && (
          <div className="mb-12 rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-auto object-cover max-h-600px"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000";
              }}
            />
          </div>
        )}

        <div
          className="prose prose-invert max-w-none 
          prose-p:text-gray-300 prose-p:text-lg prose-p:leading-[1.8] prose-p:mb-8
          prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight
          prose-strong:text-blue-400 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-600/5"
        >
          <div
            dangerouslySetInnerHTML={{
              __html: blog.content || "<p>Content coming soon...</p>",
            }}
          />
        </div>
      </article>
    </div>
  );
};

export default BlogDetailPage;