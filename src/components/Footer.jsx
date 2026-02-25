import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "About", path: "/about" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms of Service", path: "/terms" },
    { label: "Contact", path: "/contact" }
  ];

  const socialLinks = [
    { icon: FaGithub, label: "Github", url: "https://github.com/Jack45-coder" },
    { icon: FaTwitter, label: "Twitter", url: "Jackey (@JazzJackey44618) / X https://share.google/aw1UEjoAmn5GC48Jy" },
    { icon: FaInstagram, label: "Instagram", url: "https://www.instagram.com/https.jack_____?igsh=dGcxODBhcWxvYmlm" },
    { icon: FaLinkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/jackey-%E2%81%A0%E2%80%BF%E2%81%A0-94110b247/" }
  ];

  return (
    /* mt-auto ensures footer stays at bottom, bg-color matched with dashboard */
    <footer className="bg-[#0a0a0c] text-white border-t border-white/5 mt-auto">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white/5 p-2 rounded-lg border border-white/10">
                <span className="text-2xl">🌸</span>
              </div>
              <div>
                <h2 className="font-bold text-xl tracking-tight">Blooms</h2>
                <p className="text-[10px] text-blue-400 uppercase tracking-widest">Blog System</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              A professional blog platform for creators. Share your ideas with the world using our advanced management tools.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-sm uppercase tracking-widest mb-6 text-gray-400">Navigation</h3>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-all">-</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-sm uppercase tracking-widest mb-6 text-gray-400">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-blue-600/20 border border-white/10 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="font-semibold text-sm uppercase tracking-widest mb-6 text-gray-400">Newsletter</h3>
            <div className="relative group">
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-all"
              />
              <button className="mt-3 w-full px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                Join Now
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 my-10"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[12px] text-gray-500 font-medium">
          <p className="mb-4 md:mb-0">
            © {currentYear} BLOOMS SYSTEM. ALL RIGHTS RESERVED.
          </p>
          <div className="flex space-x-8">
            <Link to="/privacy" className="hover:text-white transition-colors">PRIVACY</Link>
            <Link to="/terms" className="hover:text-white transition-colors">TERMS</Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">SITEMAP</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;