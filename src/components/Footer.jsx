import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "About", path: "/about" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms of Service", path: "/terms" },
    { label: "Contact", path: "/contact" }
  ];

  const socialLinks = [
    { icon: "📘", label: "Facebook", url: "#" },
    { icon: "🐦", label: "Twitter", url: "#" },
    { icon: "📷", label: "Instagram", url: "#" },
    { icon: "💼", label: "LinkedIn", url: "#" }
  ];

  return (
    <footer className="bg-linear-to-b from-gray-900 to-gray-950 text-white mt-auto">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white/10 p-2 rounded-lg">
                <span className="text-2xl">🌸</span>
              </div>
              <div>
                <h2 className="font-bold text-xl">Blooms</h2>
                <p className="text-xs text-gray-400">Blog Management System</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              A professional blog platform for writers, creators, and thinkers.
              Share your ideas with the world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4 text-white/90">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="mr-2 text-xs group-hover:translate-x-1 transition-transform">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4 text-white/90">Connect With Us</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                  aria-label={social.label}
                >
                  <span className="text-xl group-hover:rotate-12 transition-transform">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4 text-white/90">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-3">Subscribe to our newsletter</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg text-sm font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p className="mb-2 md:mb-0">
            © {currentYear} Blooms Blog System. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;