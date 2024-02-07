import { TvInfoType } from "@/app/(main)/tv/[tvId]/page";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type TvCardProp = {
  item: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: string;
    poster_path: string;
    first_air_date: string;
    name: string;
    vote_average: number;
    vote_count: number;
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

const TvCard = async ({ item }: TvCardProp) => {
  const info: TvInfoType = await getInfo(item.id);
  const season = info && info?.seasons[0]?.episodes;
  const episodeId = season && season[0]?.id;

  return (
    <div className="relative">
      {item.adult && (
        <span className="bg-red-500 p-1 rounded text-sm absolute top-2 left-2">
          18+
        </span>
      )}
      <Link href={`/tv/${item.id}?ep=${episodeId}`}>
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
        <p className="text-sm text-zinc-400 p-1">{item.name}</p>
      </div>
    </div>
  );
};

export default TvCard;
