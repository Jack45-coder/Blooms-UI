import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Layout = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-linear-to-b from-gray-50 to-gray-100">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main
        id="main-content"
        className="flex-1 transition-all duration-300"
      >
        <div className="min-h-[60vh]">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      {!isDashboard && <Footer />}

      {/* Back to Top Button - Appears on scroll */}
      <BackToTopButton />
    </div>
  );
};

// Back to Top Button Component
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return isVisible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
      aria-label="Back to top"
    >
      <span className="text-2xl">↑</span>
    </button>
  ) : null;
};

export default Layout;