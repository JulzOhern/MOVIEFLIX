import Image from "next/image";
import Link from "next/link";
import React from "react";

type MovieCardProp = {
  item: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: string[];
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
};

const MovieCard = ({ item }: MovieCardProp) => {
  return (
    <div className="relative">
      {item.adult && (
        <span className="bg-red-500 p-1 rounded text-sm absolute top-2 left-2">
          18+
        </span>
      )}
      <Link href={`/movie/${item.id}`}>
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
        <p className="text-sm text-zinc-400 p-1">{item.title}</p>
      </div>
    </div>
  );
};

export default MovieCard;
