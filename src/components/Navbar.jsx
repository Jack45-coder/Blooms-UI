import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaHome,
  FaChartBar,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(storedUser);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("lastTab");
    setUser(null);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = user
    ? [
        { path: "/", label: "Home", icon: FaHome },
        { path: "/dashboard", label: "Dashboard", icon: FaChartBar },
      ]
    : [
        { path: "/", label: "Home", icon: FaHome },
        { path: "/login", label: "Login", icon: FaSignInAlt },
        { path: "/register", label: "Register", icon: FaUserPlus },
      ];

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-110 bg-[#0a0a0c]/90 backdrop-blur-xl border-b border-white/5 h-16">
      
      <div className="flex justify-between items-center h-full w-full px-6 md:px-8">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3 group shrink-0">
          <div className="bg-white/5 p-2 rounded-xl border border-white/10 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-300">
            <span className="text-xl">🌸</span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-lg tracking-tight text-white group-hover:text-blue-400 transition-colors leading-none">
              Blooms
            </h1>
            <p className="text-[9px] text-gray-500 uppercase tracking-widest mt-1 hidden sm:block">
              Blog System
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2
                ${isActive(link.path)
                  ? "bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-sm shadow-blue-500/5"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
            >
              <link.icon className="w-3.5 h-3.5" />
              <span>{link.label}</span>
            </Link>
          ))}

          {user && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all flex items-center space-x-2 ml-2 border border-transparent hover:border-red-500/10"
            >
              <FaSignOutAlt className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 active:scale-95 transition-transform"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-white rounded-full transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-full h-0.5 bg-white rounded-full transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 bg-white rounded-full transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden bg-[#0a0a0c] border-b border-white/5 overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-80 py-4 px-6' : 'max-h-0'}`}>
        <div className="flex flex-col space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-4 p-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all"
            >
              <link.icon />
              <span>{link.label}</span>
            </Link>
          ))}

          {/* ✅ ONLY THIS ADDED: Mobile Logout */}
          {user && (
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center space-x-4 p-3 rounded-xl text-red-400 hover:bg-white/5 transition-all mt-1"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;