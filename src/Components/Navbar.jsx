import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo-lifelog.png";
import useAxios from "../hooks/useAxious";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const axiosInstance = useAxios();
  const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/users/email/${user?.email}`).then((res) => {
      setCurrentUser(res.data);
    });
  }, [axiosInstance, user]);



const handleLogout = () => {
  logOut().then(() => {
    navigate('/');  // বা '/login'
  });
};

  // 1. Theme State
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  // 2. Handle toggle
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // 3. Apply theme to HTML tag
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const links = (
    <>
      <li>
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `px-4 py-2 font-semibold transition-all duration-300 rounded-lg text-white ${
              isActive ? "bg-primary text-black font-extrabold shadow-md" : "hover:bg-white/10"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/public-lessons" 
          className={({ isActive }) => 
            `px-4 py-2 font-semibold transition-all duration-300 rounded-lg text-white ${
              isActive ? "bg-primary text-black font-extrabold shadow-md" : "hover:bg-white/10"
            }`
          }
        >
          Public Lessons
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/add-lessons" 
          className={({ isActive }) => 
            `px-4 py-2 font-semibold transition-all duration-300 rounded-lg text-white ${
              isActive ? "bg-primary text-black font-extrabold shadow-md" : "hover:bg-white/10"
            }`
          }
        >
          Add Lessons
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink 
              to="/dashboard/my-lessons" 
              className={({ isActive }) => 
                `px-4 py-2 font-semibold transition-all duration-300 rounded-lg text-white ${
                  isActive ? "bg-primary text-black font-extrabold shadow-md" : "hover:bg-white/10"
                }`
              }
            >
              My Lessons
            </NavLink>
          </li>

          {/* If NOT premium → Show Upgrade */}
          {!currentUser?.isUserPremium && (
            <li>
              <NavLink 
                to="/pricing" 
                className={({ isActive }) => 
                  `px-4 py-2 font-bold transition-all duration-300 rounded-lg text-yellow-300 animate-pulse border border-yellow-300/30 ${
                    isActive ? "bg-yellow-400 text-black shadow-md" : "hover:bg-yellow-300/10"
                  }`
                }
              >
                Upgrade ⭐
              </NavLink>
            </li>
          )}

          {/* If premium → Show Premium Badge */}
          {currentUser?.isUserPremium && (
            <li className="flex justify-center items-center px-4">
              <span className="badge badge-warning font-extrabold gap-1 py-3 border-none bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-md">
                ⭐ Premium
              </span>
            </li>
          )}
        </>
      )}
    </>
  );

  
<style>{`
  .glass-navbar {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    background: rgba(var(--color-secondary-rgb), 0.92) !important;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .dropdown-glass {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    background: rgba(15, 23, 42, 0.92) !important;
    border: 1px solid rgba(255,255,255,0.1) !important;
  }

  .dropdown-glass li a,
  .dropdown-glass li button {
    color: rgba(255,255,255,0.75) !important;
  }

  .dropdown-glass li a:hover,
  .dropdown-glass li button:hover {
    background: rgba(255,255,255,0.08) !important;
    color: white !important;
  }

  .avatar-glow {
    transition: box-shadow 0.2s ease;
  }

  .avatar-glow:hover {
    box-shadow: 0 0 0 3px rgba(255,255,255,0.15);
  }
`}</style>

  return (
    
    <div className="navbar bg-secondary/95 shadow-lg sticky top-0 z-50 w-full px-4 md:px-8 glass-navbar rounded-xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-secondary/95 backdrop-blur-lg rounded-box z-[999] mt-3 w-52 p-3 shadow-2xl gap-2 border border-white/10 text-white"
          >
            {links}
          </ul>
        </div>
        
        <Link to="/" className="flex items-center gap-2.5 hover:opacity-90 transition">
          <img className="hidden sm:block w-9 h-9 rounded-full border border-white/20 shadow-md" src={logo} alt="LifeLog Logo" />
          <span className="font-black text-2xl tracking-tight text-white">LifeLog</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1">{links}</ul>
      </div>

      <div className="navbar-end gap-0.5 md:gap-3">
        {/* --- Theme Controller Start --- */}
        <label className="swap swap-rotate text-white mr-1 hover:scale-105 transition cursor-pointer">
          <input 
            type="checkbox" 
            onChange={handleToggle} 
            checked={theme === "dark"} 
          />
          {/* Sun icon */}
          <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,0.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,18.36,17ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Z"/></svg>
          {/* Moon icon */}
          <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
        </label>
        {/* --- Theme Controller End --- */}

        {user ? (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar border border-white/20 hover:border-primary transition duration-300"
            >
              <div className="w-9 rounded-full avatar-glow">
                <img alt="User Avatar" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-3 shadow-2xl border border-base-200 text-base-content gap-1 "
            >
              <li className="px-3 py-2 font-bold border-b border-base-200 text-sm">{user.displayName}</li>
              <li>
                <Link to='/auth/profile'>Profile</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="mt-2 pt-2 border-t border-base-200">
                <button onClick={handleLogout} className="btn btn-error btn-sm btn-outline btn-block text-xs font-bold">Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/auth/login" className="btn btn-ghost btn-sm text-white font-semibold">
              Login
            </Link>
            <Link to="/auth/register" className="btn btn-primary btn-sm text-black font-extrabold px-5 rounded-lg shadow-lg shadow-primary/25 hover:scale-105 transition-all">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;