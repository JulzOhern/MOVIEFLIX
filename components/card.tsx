import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";

type Card = {
  item: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };
  type: string;
};

const Card = ({ item, type }: Card) => {
  return (
    <div className="relative">
      {item.adult && (
        <span className="bg-red-500 p-1 rounded-br text-sm absolute top-0 left-0">
          18+
        </span>
      )}

      <p className="absolute right-0 top-0 flex items-center gap-1 border border-zinc-700 bg-black p-1 px-2 text-xs">
        <HiMiniArrowTrendingUp className="text-green-500 mr-2" />{" "}
        {item.vote_average}
      </p>

      <Link href={`/${type}/${item.id}`}>
        <Image
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_PATH}${item.poster_path}`}
          alt="poster"
          width={100}
          height={100}
          priority
          className="h-[12rem] w-full object-cover"
        />
      </Link>
      <div>
        <p className="text-sm text-zinc-400 p-1">
          {item.title || item.original_title}
        </p>
      </div>
    </div>
  );
};

export default Card;
