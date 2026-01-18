import { NavLink } from "react-router-dom";
import logo from "../../assets/logo3.png";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* BRAND */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="ReviClash"
              className="h-10 w-auto object-contain"
            />
            <span className="text-xl font-bold text-white">ReviClash</span>
          </div>
          <p className="text-sm leading-relaxed">
            Practice better. Compete smarter.  
            ReviClash helps you master coding through contests & analytics.
          </p>

          <div className="flex gap-4 pt-2">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Linkedin className="w-5 h-5 hover:text-white transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <Twitter className="w-5 h-5 hover:text-white transition" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Github className="w-5 h-5 hover:text-white transition" />
            </a>
            <a href="mailto:reviclash@gmail.com">
              <Mail className="w-5 h-5 hover:text-white transition" />
            </a>
          </div>
        </div>

        {/* PRODUCT */}
        <div>
          <h4 className="text-white font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><NavLink to="/explore" className="hover:text-white">Explore</NavLink></li>
            <li><NavLink to="/collections" className="hover:text-white">Collections</NavLink></li>
            <li><NavLink to="/contests" className="hover:text-white">Contests</NavLink></li>
            <li><NavLink to="/stats" className="hover:text-white">Stats</NavLink></li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><NavLink to="/about" className="hover:text-white">About</NavLink></li>
            <li><NavLink to="/careers" className="hover:text-white">Careers</NavLink></li>
            <li><NavLink to="/blog" className="hover:text-white">Blog</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-white">Contact</NavLink></li>
          </ul>
        </div>

        {/* LEGAL */}
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><NavLink to="/privacy" className="hover:text-white">Privacy Policy</NavLink></li>
            <li><NavLink to="/terms" className="hover:text-white">Terms of Service</NavLink></li>
            <li><NavLink to="/cookies" className="hover:text-white">Cookies</NavLink></li>
          </ul>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} ReviClash. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
