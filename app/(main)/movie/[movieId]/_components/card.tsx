import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TiStarFullOutline } from "react-icons/ti";

type CardProp = {
  item: {
    id: number;
    title: string;
    image: string;
    type: string;
    rating: string;
    releaseDate: string;
  };
};

const Card = async ({ item }: CardProp) => {
  return (
    <div className="relative">
      <span className="flex items-center gap-1 bg-black p-1 px-3 rounded-br text-sm absolute top-0 left-0">
        <TiStarFullOutline className="text-yellow-500" /> {item.rating}
      </span>

      <Link href={`/movie/${item.id}`}>
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
  );
};

export default Card;
