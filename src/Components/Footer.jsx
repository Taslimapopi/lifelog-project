import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-secondary text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">LifeLog</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Capture life lessons, reflect on experiences, and grow wiser every
            day.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              
              <Link to='/' className="hover:text-white cursor-pointer">Home</Link>
            </li>
            <li>
              
              <Link to='/public-lessons' className="hover:text-white cursor-pointer">Public Lessons</Link>
            </li>
            <li>
              
              <Link to='/pricing' className="hover:text-white cursor-pointer">Upgrade</Link>
            </li>
           
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">
              Terms & Conditions
            </li>
            <li className="hover:text-white cursor-pointer">Support</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Connect With Us
          </h3>
          <div className="flex gap-4">
            <a className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition">
              <FaFacebookF />
            </a>
            <a className="p-2 bg-gray-800 rounded-full hover:bg-sky-500 transition">
              <FaTwitter />
            </a>
            <a className="p-2 bg-gray-800 rounded-full hover:bg-blue-700 transition">
              <FaLinkedinIn />
            </a>
            <a className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm">
        © {new Date().getFullYear()} LifeLog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
