import { TvInfoType } from "@/app/(main)/tv/[tvId]/page";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type TrendingCardProp = {
  item: {
    adult: boolean;
    backdrop_path: string;
    id: number;
    name: string;
    title: string;
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: string[];
    popularity: number;
    first_air_date: string;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    origin_country: string[];
  };
};

const getInfo = async (mediaType: string, tvId: number) => {
  if (mediaType !== "tv") return null;

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

const TrendingCard = async ({ item }: TrendingCardProp) => {
  const info: TvInfoType = await getInfo(item.media_type, item.id);
  const season = info && info?.seasons[0]?.episodes;
  const episodeId = season && season[0]?.id;

  return (
    <>
      <div className="relative">
        {item.adult && (
          <span className="bg-red-500 p-1 rounded text-sm absolute top-2 left-2">
            18+
          </span>
        )}
        <Link
          href={
            item.media_type === "tv"
              ? `/tv/${item.id}?ep=${episodeId}`
              : `/movie/${item.id}`
          }
        >
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
          <p className="text-sm text-zinc-400 p-1">{item.name || item.title}</p>
        </div>
      </div>
    </>
  );
};

export default TrendingCard;
