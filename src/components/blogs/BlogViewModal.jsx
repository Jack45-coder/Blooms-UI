import {
  FaTimes,
  FaCalendarAlt,
  FaEye,
  FaLink,
  FaCheck,
  FaHeart,
  FaUserCircle,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import Footer from "../Footer"; 

const BlogViewModal = ({ blog, categoryName, onClose }) => {
  const [copied, setCopied] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const scrollContainer = document.querySelector('.custom-scrollbar');
    if (scrollContainer) scrollContainer.scrollTop = 0;
  }, [blog]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!blog) return null;

  return (
    <div className="fixed inset-0 z-100 bg-[#0d0d0f] flex flex-col animate-in fade-in duration-300 mt-16">
      
      {/* --- STICKY HEADER --- */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0d0d0f]/95 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-blue-600 rounded-full" />
          <span className="text-blue-500 font-bold text-[10px] md:text-xs uppercase tracking-widest">
            {categoryName} / Reading Mode
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyLink}
            className="text-gray-400 hover:text-white text-[10px] md:text-xs flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
          >
            {copied ? <FaCheck className="text-green-500" /> : <FaLink />}
            <span>{copied ? "Copied!" : "Copy Link"}</span>
          </button>
          <button
            onClick={onClose}
            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded-xl border border-red-500/20 transition-all"
          >
            <FaTimes size={18} />
          </button>
        </div>
      </header>

      {/* --- MAIN SCROLLABLE AREA --- */}
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="w-full flex flex-col">
          
          {/* Content Wrapper */}
          <div className="max-w-4xl w-full mx-auto px-6 md:px-8 pt-12 pb-20">
            
            {/* Title Section */}
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight mb-8">
                {blog.title}
              </h1>

              {/* Author & Meta Info */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-6 border-y border-white/5">
                <div className="flex items-center gap-3 pr-6 md:border-r border-white/10">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white border-2 border-white/10 shadow-lg font-bold">
                    {currentUser?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="text-left">
                    <p className="text-white text-sm font-bold leading-none">{currentUser?.name || "Jackey Kumar"}</p>
                    <p className="text-[10px] text-gray-500 uppercase mt-1">Contributor</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-xs font-medium text-gray-400">
                  <span className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-500" /> 
                    {new Date().toLocaleDateString('en-IN')}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaEye className="text-emerald-500" /> {blog.views || 0}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaHeart className="text-red-500" /> {blog.likes || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Blog Image */}
            {blog.imageUrl && (
              <div className="rounded-3xl overflow-hidden border border-white/10 mb-16 shadow-2xl">
                <img 
                  src={blog.imageUrl} 
                  className="w-full h-auto max-h-500px object-cover" 
                  alt="Featured"
                />
              </div>
            )}

            {/* Blog Body Text - FIXED FONTS */}
            <article className="prose prose-invert max-w-none">
              <div
                className="prose-p:text-gray-400 prose-p:text-base md:prose-p:text-lg prose-p:leading-relaxed prose-p:mb-8
                           prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                           prose-strong:text-blue-400 prose-a:text-blue-500 hover:prose-a:underline
                           prose-img:rounded-2xl prose-img:border prose-img:border-white/10
                           prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </article>

            {/* End of Content Marker */}
            <div className="mt-24 pt-16 border-t border-white/5 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-blue-500 mb-4">
                <FaCheck size={20} />
              </div>
              <h4 className="text-white font-black text-lg uppercase tracking-widest mb-2">End of Story</h4>
              <p className="text-gray-500 text-sm">Thank you for reading the Blooms Blog.</p>
            </div>
          </div>

          {/* --- REUSABLE FOOTER --- */}
          <Footer />
        </div>
      </main>

      {/* Internal Scrollbar Styling */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #222; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #333; }
      `}</style>
    </div>
  );
};

export default BlogViewModal;