import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { TvInfoType } from "../page";

type CardProp = {
  item: {
    id: number;
    title: string;
    image: string;
    type: string;
    rating: number;
    releaseDate: string;
  };
};

const getInfo = async (tvId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CONSUMET_URL}/meta/tmdb/info/${tvId}?type=tv`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  if (!res.ok) {
    return null;
  }
  return res.json();
};

const Card = async ({ item }: CardProp) => {
  const tvInfo: TvInfoType = await getInfo(item.id);
  const season = tvInfo?.seasons ? tvInfo?.seasons[0]?.episodes : null;
  const episodeId = season && season[0]?.id;

  return (
    <div className="relative">
      <span className="flex items-center gap-1 bg-black p-1 px-3 rounded-br text-sm absolute top-0 left-0">
        <TiStarFullOutline className="text-yellow-500" /> {item.rating}
      </span>

      <Link href={`/tv/${item.id}?ep=${episodeId}`}>
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
