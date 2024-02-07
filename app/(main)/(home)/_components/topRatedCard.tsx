import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCalendar } from "react-icons/fa";
import { BiSolidUpvote } from "react-icons/bi";
import { TvInfoType } from "../../tv/[tvId]/page";

type TopRatedCardProp = {
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
    name?: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };
  type: string;
};

const TopRatedCard = ({ item, type }: TopRatedCardProp) => {
  const [info, setInfo] = useState<TvInfoType | null>(null);
  const season = info?.seasons && info.seasons[0].episodes;
  const episodeId = season && season[0]?.id;

  useEffect(() => {
    (async () => {
      if (type !== "tv") return null;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CONSUMET_URL}/meta/tmdb/info/${item.id}?type=tv`
      );
      const data = await res.json();
      setInfo(data);
    })();
  }, [item.id, type]);

  return (
    <>
      <Link
        href={
          !type || type === "movie"
            ? `/movie/${item.id}`
            : `/tv/${item.id}?ep=${episodeId}`
        }
      >
        <div
          style={{
            background: `url(${process.env.NEXT_PUBLIC_TMDB_IMAGE_PATH}${item.backdrop_path})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
          }}
          className="relative flex items-end sm:min-h-[20rem] min-h-[17rem] w-full hover:grayscale-0 duration-300 grayscale rounded-lg"
        >
          {item.adult && (
            <span className="absolute top-2 left-2 text-sm bg-red-500 p-2 rounded">
              18+
            </span>
          )}
          <div className="flex-1 max-w-[28rem] pl-5 pr-20 space-y-2 mb-9">
            <p className="sm:text-2xl text-lg font-semibold truncate">
              {type === "movie" || !type ? item.title : item.name}
            </p>
            <p className="ellipsis text-sm">{item.overview}</p>
            <div className="flex items-center gap-5 text-sm">
              <div className="flex items-center gap-2 text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trending-up"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                  <polyline points="16 7 22 7 22 13"></polyline>
                </svg>
                <p>{item.popularity}</p>
              </div>
              <p className="flex items-center gap-2">
                <FaCalendar /> {item.release_date}
              </p>
              <p className="flex items-center gap-2">
                <BiSolidUpvote /> {item.vote_average}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default TopRatedCard;
