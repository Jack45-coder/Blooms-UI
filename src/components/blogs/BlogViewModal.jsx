import {
  FaTimes,
  FaCalendarAlt,
  FaEye,
  FaLink,
  FaCheck,
  FaHeart,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import Footer from "../Footer"; 

const BlogViewModal = ({ blog, categoryName, onClose }) => {
  const [copied, setCopied] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const scrollContainer = document.querySelector('.custom-scrollbar');
    if (scrollContainer) scrollContainer.scrollTop = 0;
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => document.body.style.overflow = 'unset';
  }, [blog]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!blog) return null;

  return (
    <div className="fixed inset-0 z-100 bg-[#09090b] flex flex-col animate-in fade-in zoom-in-95 duration-300 mt-16">
      
      {/* --- LIGHTING EFFECTS (BACKGROUND) --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>

      {/* --- STICKY HEADER WITH BORDER LIGHT --- */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5">
        {/* Animated Line at bottom of header */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-blue-500/50 to-transparent animate-border-fast" />
        
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
          <span className="text-blue-400 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">
            {categoryName || 'Article'} / Reading Mode
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyLink}
            className="text-gray-400 hover:text-white text-[10px] md:text-xs flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-blue-500/50 transition-all"
          >
            {copied ? <FaCheck className="text-green-500" /> : <FaLink />}
            <span>{copied ? "Link Copied" : "Share"}</span>
          </button>
          <button
            onClick={onClose}
            className="group bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white p-2.5 rounded-full border border-red-500/20 transition-all active:scale-95"
          >
            <FaTimes size={18} />
          </button>
        </div>
      </header>

      {/* --- MAIN SCROLLABLE AREA --- */}
      <main className="relative z-10 flex-1 overflow-y-auto custom-scrollbar">
        <div className="w-full flex flex-col">
          
          <div className="max-w-4xl w-full mx-auto px-6 md:px-8 pt-16 pb-20">
            
            {/* Title Section with Glow */}
            <div className="text-center mb-16 relative">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-500/20 blur-[60px] -z-10" />
              <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight mb-8 bg-linear-to-b from-white to-gray-500 bg-clip-text text-transparent">
                {blog.title}
              </h1>

              {/* Author Info */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-8 border-y border-white/5 relative">
                <div className="flex items-center gap-4">
                  <div className="relative p-1 rounded-full bg-linear-to-tr from-blue-600 to-purple-600">
                    <div className="w-12 h-12 rounded-full bg-[#09090b] flex items-center justify-center text-white border border-white/10 shadow-2xl font-black text-xl">
                      {currentUser?.name?.charAt(0)?.toUpperCase() || "B"}
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-white font-bold tracking-wide">{currentUser?.name || "Blooms Author"}</p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <p className="text-[10px] text-blue-400 uppercase tracking-tighter">Verified Contributor</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-lg">
                    <FaCalendarAlt className="text-blue-500" /> {new Date().toLocaleDateString('en-GB')}
                  </span>
                  <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-lg">
                    <FaEye className="text-emerald-500" /> {blog.views || 0}
                  </span>
                  <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-lg">
                    <FaHeart className="text-red-500" /> {blog.likes || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Image with Outer Glow */}
            {blog.imageUrl && (
              <div className="group relative rounded-2rem overflow-hidden border border-white/10 mb-20 shadow-[0_0_50px_rgba(59,130,246,0.15)]">
                <div className="absolute inset-0 bg-linear-to-t from-[#09090b] via-transparent to-transparent opacity-60 z-10" />
                <img 
                  src={blog.imageUrl} 
                  className="w-full h-auto max-h-600px object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt="Featured"
                />
              </div>
            )}

            {/* Blog Body Content */}
            <article className="prose prose-invert max-w-none">
              <div
                className="content-area prose-p:text-gray-300 prose-p:text-lg prose-p:leading-[1.8] prose-p:mb-10
                           prose-headings:text-white prose-headings:font-extrabold prose-headings:tracking-tight
                           prose-strong:text-blue-400 prose-strong:font-bold
                           prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-600/5 prose-blockquote:rounded-r-2xl prose-blockquote:italic
                           prose-img:rounded-3xl prose-img:shadow-2xl"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </article>

            {/* End Section */}
            <div className="mt-32 pt-20 border-t border-white/5 text-center relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1px bg-linear-to-r from-transparent via-blue-500 to-transparent" />
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-blue-600/10 border border-blue-500/20 text-blue-500 mb-6 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                <FaCheck size={28} />
              </div>
              <h4 className="text-white font-black text-2xl uppercase tracking-tighter mb-2">You're all caught up!</h4>
              <p className="text-gray-500">Liked this story? Feel free to share it with your network.</p>
            </div>
          </div>

          <Footer />
        </div>
      </main>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #09090b; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
        
        /* content-area styling for HTML from editor */
        .content-area :global(h2) { font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem; color: white; }
        .content-area :global(p) { margin-bottom: 1.5rem; color: #9ca3af; }
      `}</style>
    </div>
  );
};

export default BlogViewModal;