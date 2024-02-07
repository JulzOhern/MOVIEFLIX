"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TvInfoType } from "../../tv/[tvId]/page";
import { useQuery } from "@tanstack/react-query";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";

type SearchCardProp = {
  item: {
    id: number;
    title: string;
    image: string;
    type: string;
    rating: number;
    releaseDate: string;
  };
};

const SearchCard = ({ item }: SearchCardProp) => {
  const { data: info } = useQuery({
    queryKey: ["tvInfo", item.id],
    enabled: item.id !== undefined,
    queryFn: async () => {
      try {
        if (item.type === "Movie") return null;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CONSUMET_URL}/meta/tmdb/info/${item.id}?type=tv`
        );
        const data: TvInfoType = await res.json();
        return data;
      } catch {
        throw new Error("Failed to fetch");
      }
    },
  });
  const season = info && info.seasons && info?.seasons[0]?.episodes;
  const episodeId = season && season[0]?.id;

  return (
    <>
      <div className="relative">
        <p className="absolute right-0 top-0 flex items-center gap-1 border border-zinc-700 bg-black p-1 px-2 text-xs">
          <HiMiniArrowTrendingUp className="text-green-500 mr-2" />{" "}
          {item.rating}
        </p>

        <Link
          href={
            item.type === "Movie"
              ? `/movie/${item.id}`
              : `/tv/${item.id}?ep=${episodeId}`
          }
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_PATH}${item.image}`}
            alt="poster"
            width={100}
            height={100}
            priority
            className="h-[12rem] w-full object-cover"
          />
        </Link>
        <div>
          <p className="text-sm text-zinc-400 p-1">{item.title}</p>
        </div>
      </div>
    </>
  );
};

export default SearchCard;
