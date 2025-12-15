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
    <div className="navbar bg-secondary shadow-sm fixed top-0  z-40 max-w-11/12 mx-auto">
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
      <div className="navbar-end">
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
                <Link to='/dashboard' className="justify-between">Profile</Link>
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
          <div>
            <Link to="/auth/register" className="btn btn-primary mr-3">
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
