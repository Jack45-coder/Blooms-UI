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
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[5%] -left-[5%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-[15%] -right-[5%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse delay-700" />
        <div className="absolute bottom-[10%] left-[20%] w-[30%] h-[30%] bg-indigo-600/5 blur-[100px] rounded-full" />
      </div>

      {/* --- STICKY HEADER --- */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5">
        <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-blue-500/40 to-transparent" />
        
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6] animate-pulse" />
          <span className="text-blue-400 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">
            {categoryName || 'Article'} / Reading Mode
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyLink}
            className="hidden sm:flex text-gray-400 hover:text-white text-[10px] md:text-xs items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-blue-500/50 transition-all"
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
            
            {/* --- TITLE & DESCRIPTION SECTION --- */}
            <div className="text-center mb-16 relative">
                {/* Center Title Glow */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-32 bg-blue-500/15 blur-[80px] -z-10 rounded-full" />
                
                <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tighter mb-6 bg-linear-to-b from-white via-white to-white/30 bg-clip-text text-transparent">
                    {blog.title}
                </h1>

                {blog.description && (
                    <p className="max-w-2xl mx-auto text-gray-400 text-sm md:text-base leading-relaxed font-medium opacity-80 italic mb-8">
                        {blog.description}
                    </p>
                )}

                {/* Meta Stats Bar */}
                <div className="flex flex-wrap items-center justify-center gap-6 py-6 border-y border-white/5 bg-white/0.01 rounded-2xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-600 to-indigo-600 p-0.5 shadow-lg">
                            <div className="w-full h-full rounded-full bg-[#09090b] flex items-center justify-center text-white font-bold text-sm">
                                {currentUser?.name?.charAt(0)?.toUpperCase() || "B"}
                            </div>
                        </div>
                        <div className="text-left">
                            <p className="text-white text-xs font-bold leading-none">{currentUser?.name || "Author"}</p>
                            <p className="text-[9px] text-blue-500 uppercase font-black mt-1">Verified</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                            <FaCalendarAlt className="text-blue-500" /> {new Date().toLocaleDateString('en-GB')}
                        </span>
                        <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                            <FaEye className="text-emerald-500" /> {blog.views || 0}
                        </span>
                    </div>
                </div>
            </div>

            {/* --- FEATURED IMAGE --- */}
            {blog.imageUrl && (
              <div className="group relative rounded-3xl overflow-hidden border border-white/10 mb-20 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
                <div className="absolute inset-0 bg-linear-to-t from-[#09090b]/40 via-transparent to-transparent z-10" />
                <img 
                  src={blog.imageUrl} 
                  className="w-full h-auto max-h-600px object-cover transition-transform duration-1000 group-hover:scale-105" 
                  alt="Featured"
                />
              </div>
            )}

            {/* --- BLOG CONTENT --- */}
            <article className="prose prose-invert max-w-none">
              <div
                className="content-area prose-p:text-gray-300 prose-p:text-lg prose-p:leading-[1.8] prose-p:mb-10
                           prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight
                           prose-strong:text-blue-400 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-600/5"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </article>

            {/* --- FOOTER END SECTION --- */}
            <div className="mt-32 pt-20 border-t border-white/10 text-center relative">
              <div className="absolute top-px left-1/2 -translate-x-1/2 w-48 h-px bg-linear-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_15px_#3b82f6]" />
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-blue-600/10 border border-blue-500/20 text-blue-500 mb-6 shadow-2xl">
                <FaCheck size={28} />
              </div>
              <h4 className="text-white font-black text-2xl uppercase tracking-tighter mb-2">End of Story</h4>
              <p className="text-gray-500 text-sm">Thank you for reading. Feel free to explore more.</p>
            </div>
          </div>

          <Footer />
        </div>
      </main>

      <style >{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
      `}</style>
    </div>
  );
};

export default BlogViewModal;