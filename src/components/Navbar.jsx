import { Link, useLocation, useNavigate } from "react-router-dom";
import { use, useEffect, useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(storedUser);
  },[location.pathname])

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem("lastTab");
    setUser(null);
    navigate("/login")
  }

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = user 
  ? [
      { path: "/", label: "Home", icon: "🏠" },
      { path: "/dashboard", label: "Dashboard", icon: "📊" },
    ]
  : [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/login", label: "Login", icon: "🔐" },
    { path: "/register", label: "Register", icon: "📝" }
  ];

  return (
    <nav className="bg-linear-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-all duration-300">
              <span className="text-2xl">🌸</span>
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight bg-linear-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Blooms
              </h1>
              <p className="text-xs text-blue-200 hidden sm:block">Blog Management System</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2
                  ${isActive(link.path)
                    ? 'bg-white/20 text-white shadow-md'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}

          {/* Logout Button if user Logged In */}
          {user &&(
            <button 
             onClick={handleLogout}
             className="px-4 py-2 rounded-lg text-sm font-medium text-red-200 hover:bg-red-500/20 hover:text-red-100 transition-all"
            >
              Logout
            </button>
          )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-64 py-4' : 'max-h-0'}`}>
          <div className="flex flex-col space-y-2 pb-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-3
                  ${isActive(link.path)
                    ? 'bg-white/20 text-white'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;