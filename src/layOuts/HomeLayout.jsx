import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import UserChat from "../Components/chat/UserChat";

const HomeLayout = () => {
  return (
    <div className="max-w-11/12 mx-auto">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <UserChat></UserChat>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
