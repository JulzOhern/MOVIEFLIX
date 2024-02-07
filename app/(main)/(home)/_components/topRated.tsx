"use client";

import React from "react";
import { TopRatedType } from "../page";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import TopRatedCard from "./topRatedCard";
import Link from "next/link";
import { cn } from "@/lib/utils";

type TopRatedProp = {
  topRated: TopRatedType;
  type: string;
};

const TopRated = ({ topRated, type }: TopRatedProp) => {
  return (
    <Swiper>
      <div className="flex items-center absolute z-[10] top-2 right-2 bg-red-500 rounded-lg text-sm">
        <Link
          href="?type=movie"
          className={cn(
            "flex-1 p-1 rounded-l px-3",
            type === "movie" || !type ? "bg-red-500" : "bg-black"
          )}
        >
          MOVIE
        </Link>
        <Link
          href="?type=tv"
          className={cn(
            "bg-black flex-1 p-1 rounded-r px-3",
            type === "tv" && "bg-red-500"
          )}
        >
          TV
        </Link>
      </div>

      {topRated.results.map((item) => (
        <SwiperSlide key={item.id}>
          <TopRatedCard item={item} type={type} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TopRated;
