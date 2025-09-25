// src/components/common/Footer.jsx
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { footerLinks } from "../../config/footerLinks";

export default function Footer() {
  return (
    <footer
      className="w-full bg-gray-900 text-gray-300 py-10 mt-auto"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {footerLinks.quick.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="hover:text-red-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Services</h4>
          <ul className="space-y-2 text-sm">
            {footerLinks.services.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="hover:text-red-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Company</h4>
          <ul className="space-y-2 text-sm">
            {footerLinks.company.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="hover:text-red-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Follow Us</h4>
          <div className="flex gap-4 text-lg">
            <a
              href="#"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-400"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-400"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-400"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-400"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="text-center mt-8 text-sm border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} BalaSabari Matrimony. All rights
        reserved.
      </div>
    </footer>
  );
}
