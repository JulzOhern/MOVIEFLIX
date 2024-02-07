"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { FaFire } from "react-icons/fa";
import { TbMovie } from "react-icons/tb";
import { PiTelevisionBold } from "react-icons/pi";
import { useOpenSideBar } from "@/utils/zustand";
import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";

const SideBar = () => {
  const { type } = useParams();
  const pathname = usePathname();
  const isOpen = useOpenSideBar((state) => state.isOpen);
  const setClose = useOpenSideBar((state) => state.setClose);

  const trendingLinks = [
    {
      href: "all",
      name: "All",
    },
    {
      href: "movie",
      name: "Movie",
    },
    {
      href: "tv",
      name: "TV",
    },
  ];
  const movieListLink = [
    {
      href: "now_playing",
      name: "Now Playing",
    },
    {
      href: "popular",
      name: "Popular",
    },
    {
      href: "top_rated",
      name: "Top Rated",
    },
    {
      href: "upcoming",
      name: "Upcoming",
    },
  ];
  const tvSeriesListLink = [
    {
      href: "airing_today",
      name: "Airing Today",
    },
    {
      href: "on_the_air",
      name: "On The Air",
    },
    {
      href: "popular",
      name: "Popular",
    },
    {
      href: "top_rated",
      name: "Top Rated",
    },
  ];

  useEffect(() => {
    return setClose();
  }, [pathname, setClose]);

  return (
    <div
      className={cn(
        "fixed inset-y-0 lg:w-[18rem] bg-zinc-900 z-[100] border-r border-zinc-800 overflow-auto duration-300 mt-16",
        isOpen ? "w-[18rem]" : "w-0"
      )}
    >
      <div className="mt-4">
        <h1 className="flex items-center gap-x-2 text-lg px-5 whitespace-nowrap">
          <FaFire className="shrink-0" /> Trending
        </h1>
        <ul className="mt-2">
          {trendingLinks.map((item, index) => (
            <Link key={index} href={`/trending/${item.href}`}>
              <li
                className={cn(
                  "p-2 px-5 whitespace-nowrap",
                  type === item.href && pathname.startsWith("/trending")
                    ? "bg-red-600/60"
                    : "hover:bg-zinc-600/40"
                )}
              >
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h1 className="flex items-center gap-x-2 text-lg px-5 whitespace-nowrap">
          <TbMovie className="shrink-0" /> Movie List
        </h1>
        <ul className="mt-2">
          {movieListLink.map((item, index) => (
            <Link key={index} href={`/movie-list/${item.href}`}>
              <li
                className={cn(
                  "p-2 px-5 whitespace-nowrap",
                  type === item.href && pathname.startsWith("/movie-list")
                    ? "bg-red-600"
                    : "hover:bg-zinc-600/40"
                )}
              >
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h1 className="flex items-center gap-x-2 text-lg px-5 whitespace-nowrap">
          <PiTelevisionBold className="shrink-0" /> TV Series List
        </h1>
        <ul className="mt-2">
          {tvSeriesListLink.map((item, index) => (
            <Link key={index} href={`/tv-list/${item.href}`}>
              <li
                className={cn(
                  "p-2 px-5 whitespace-nowrap",
                  type === item.href && pathname.startsWith("/tv-list")
                    ? "bg-red-600"
                    : "hover:bg-zinc-600/40"
                )}
              >
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
