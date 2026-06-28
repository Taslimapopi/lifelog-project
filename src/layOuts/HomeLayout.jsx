import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import ChatButton from "../Components/chat/ChatButton";
import { useState } from "react";
import ChatModal from "../Components/chat/ChatModal";
import useRole from "../hooks/useRole";

const HomeLayout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const {role, roleLoading} = useRole()
  
  return (
    <div className="max-w-11/12 mx-auto">
      <Navbar></Navbar>
      <Outlet></Outlet>
      {
        role !== 'admin' && (<ChatButton isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />)
      }
      

      <ChatModal isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
