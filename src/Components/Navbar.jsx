import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo-lifelog.png";
import useAxios from "../hooks/useAxious";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const axiosInstance = useAxios();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/users/email/${user?.email}`).then((res) => {
      setCurrentUser(res.data);
    });
  }, [axiosInstance, user]);

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
        <NavLink to="/" className=" text-white">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/public-lessons" className=" text-white">
          Public Lessons
        </NavLink>
      </li>
      <li>
        <NavLink to="/add-lessons" className=" text-white">
          Add Lessons
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/dashboard/my-lessons" className="text-white">
              My Lessons
            </NavLink>
          </li>

          {/* If NOT premium → Show Upgrade */}
          {!currentUser?.isUserPremium && (
            <li>
              <NavLink to="/pricing" className="text-white">
                Upgrade
              </NavLink>
            </li>
          )}

          {/* If premium → Show Premium Badge */}
          {currentUser?.isUserPremium && (
            <li>
              <span className="text-yellow-400 font-bold">Premium ⭐</span>
            </li>
          )}
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-secondary shadow-sm absolute fixed top-0  z-40 max-w-11/12 mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-primary rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <img className="w-8 h-8 rounded-full" src={logo} alt="" />
        <a className="btn btn-ghost text-xl  text-white">LifeLog</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end gap-2">
        {/* --- Theme Controller Start --- */}
        <label className="swap swap-rotate text-white mr-2">
          <input 
            type="checkbox" 
            onChange={handleToggle} 
            checked={theme === "dark"} 
          />
          {/* Sun icon */}
          <svg className="swap-on fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,0.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,18.36,17ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Z"/></svg>
          {/* Moon icon */}
          <svg className="swap-off fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
        </label>
        {/* --- Theme Controller End --- */}
        {user ? (
          <div className="dropdown dropdown-end">

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>{user.displayName}</li>
              <li>
                <Link to='/auth/profile' className="justify-between">Profile</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={() => logOut()}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <div >
            <Link to="/auth/register" className="btn btn-primary mr-3 hidden md:inline-flex">
              Register
            </Link>
            <Link to="/auth/login" className="btn btn-primary mr-3">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;