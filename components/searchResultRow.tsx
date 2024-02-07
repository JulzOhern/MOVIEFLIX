import { TvInfoType } from "@/app/(main)/tv/[tvId]/page";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import React from "react";

type SearchResultRowProp = {
  item: {
    id: number;
    image: string;
    rating: number;
    releaseDate: string;
    title: string;
    type: string;
  };
};

const SearchResultRow = ({ item }: SearchResultRowProp) => {
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
    <Link
      href={
        item.type === "Movie"
          ? `/movie/${item.id}`
          : `/tv/${item.id}?ep=${episodeId}`
      }
      key={item.id}
    >
      <div className="flex items-center gap-3 p-3 odd:bg-zinc-800/30 even:bg-zinc-900/80 group/item">
        <div className="shrink-0">
          <Image
            src={item.image}
            alt="poster"
            width={100}
            height={100}
            priority
            className="w-[3rem] h-[4rem] object-cover"
          />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <p className="truncate text-sm group-hover/item:text-red-500">
            {item.title}
          </p>
          <p className="truncate text-xs text-zinc-500 mb-[.4rem]">
            {item.title}
          </p>
          <div className="flex items-center gap-1">
            <p className="text-[11.5px] text-zinc-500 border border-zinc-700 p-[2px]">
              {item.type}
            </p>
            <p className="text-[11.5px] text-zinc-500 border border-zinc-700 p-[2px]">
              {item.rating}
            </p>
            <p className="text-[11.5px] text-zinc-500 border border-zinc-700 p-[2px]">
              {item.releaseDate}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultRow;
