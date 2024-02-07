import React from "react";
import TrendingCard from "./_components/trendingCard";
import Pagination from "@/components/pagination";

export type trendingType = {
  page: number;
  results: {
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
  }[];
  total_pages: number;
  total_results: number;
};

const getTrending = async (type: string, page: string) => {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_TMDB_MAIN_URL
    }/trending/${type}/day?language=en-US&page=${page || 1}`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_ACCESS_TOKEN}`,
      },
    }
  );
  if (!res.ok) {
    return null;
  }
  return res.json();
};

const TrendingPage = async ({
  params,
  searchParams,
}: {
  params: { type: string };
  searchParams: { page: string };
}) => {
  const { type } = params;
  const { page } = searchParams;
  const trending: trendingType = await getTrending(type, page);

  return (
    <div className="pt-20">
      <h1 className="text-lg">Trending {type}</h1>
      <div>
        {!trending.results.length ? (
          <div className="min-h-[80vh] flex items-center justify-center text-zinc-500">
            No results
          </div>
        ) : (
          <div className="gridCard gap-x-2 gap-y-5 mt-5">
            {trending?.results.map((item) => (
              <TrendingCard key={item.id} item={item} />
            ))}
          </div>
        )}
        {trending.total_pages > 1 && (
          <div className="flex items-center justify-center mt-10">
            <Pagination
              href={`/trending/${type}?page=`}
              currentPage={trending?.page}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingPage;
