import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sideBar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[100rem] m-auto min-h-screen text-white">
      <Navbar />
      <SideBar />
      <div className="lg:ml-[18rem] px-5 pb-20">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
