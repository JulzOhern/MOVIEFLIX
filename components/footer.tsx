"use client";

import React from "react";
import { PiTelevisionFill } from "react-icons/pi";
import { IoChevronUpSharp } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="px-5 py-10 text-white lg:ml-[18rem]">
      <div className="flex items-center justify-center mb-5">
        <button
          onClick={() => window.scroll(0, 0)}
          className="flex items-center gap-2 text-zinc-500 hover:text-white"
        >
          <IoChevronUpSharp />
          <span>BACK TO TOP</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <h1 className="flex items-center gap-2 bg-white text-black rounded-lg p-2">
          <PiTelevisionFill className="scale-[1.5]" />
          <span className="font-bold">MOVIEFLIX</span>
        </h1>
      </div>

      <div className="mt-5">
        <p className="text-zinc-400 text-sm">
          Made with practice! Disclaimer: This site does not store any files on
          its server. All contents are provided by non-affiliated third parties.
        </p>
        <p className="text-sm text-zinc-400 mt-2">
          Copyright © MOVIEFLIX All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
