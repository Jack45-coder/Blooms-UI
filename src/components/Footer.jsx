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
    { icon: FaTwitter, label: "Twitter", url: "https://twitter.com/JazzJackey44618" },
    { icon: FaInstagram, label: "Instagram", url: "https://www.instagram.com/https.jack_____?igsh=dGcxODBhcWxvYmlm" },
    { icon: FaLinkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/jackey-94110b247/" }
  ];

  return (
    <footer className="bg-[#0a0a0c] text-white border-t border-white/5 mt-auto">
      <div className="container mx-auto px-6 py-12">
        {/* Responsive Grid System */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 lg:gap-12">

          {/* 1. Brand Section - Mobile pe full width le lega readability ke liye */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white/5 p-2 rounded-lg border border-white/10">
                <span className="text-xl">🌸</span>
              </div>
              <div>
                <h2 className="font-bold text-lg tracking-tight">Blooms</h2>
                <p className="text-[9px] text-blue-400 uppercase tracking-widest font-bold">Blog System</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed pr-4">
              A professional blog platform for creators. Share your ideas with the world.
            </p>
          </div>

          {/* 2. Quick Links - Mobile pe side me dikhega */}
          <div className="col-span-1">
            <h3 className="font-semibold text-[11px] uppercase tracking-[0.2em] mb-6 text-gray-500">Navigation</h3>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Social Links - Mobile pe ye bhi side me dikhega */}
          <div className="col-span-1">
            <h3 className="font-semibold text-[11px] uppercase tracking-[0.2em] mb-6 text-gray-500">Connect</h3>
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-blue-600/20 border border-white/10 w-9 h-9 rounded-lg flex items-center justify-center transition-all group"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                </a>
              ))}
            </div>
          </div>

          {/* 4. Newsletter - Mobile pe niche full width */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold text-[11px] uppercase tracking-[0.2em] mb-6 text-gray-500">Newsletter</h3>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500/50"
              />
              <button className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-600/10">
                Join Now
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 mt-12 mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-gray-600 font-bold tracking-widest">
          <p>© {currentYear} BLOOMS SYSTEM. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-white transition-colors">PRIVACY</Link>
            <Link to="/terms" className="hover:text-white transition-colors">TERMS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;