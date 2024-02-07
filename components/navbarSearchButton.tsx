"use client";

import { IoClose } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import React from "react";
import { useOpenSearch, useOpenSideBar } from "@/utils/zustand";

const NavbarSearchButton = () => {
  const setCloseSideBar = useOpenSideBar((state) => state.setClose);
  const setOpen = useOpenSearch((state) => state.setOpen);
  const setClose = useOpenSearch((state) => state.setClose);
  const isOpen = useOpenSearch((state) => state.isOpen);

  return (
    <div>
      {!isOpen ? (
        <FaSearch
          onClick={(e) => {
            e.stopPropagation();
            setOpen();
            setCloseSideBar();
          }}
          className="text-zinc-500 lg:hidden"
        />
      ) : (
        <IoClose
          onClick={() => setClose()}
          className="text-zinc-500 scale-[1.3] lg:hidden"
        />
      )}
    </div>
  );
};

export default NavbarSearchButton;
