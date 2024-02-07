import Pagination from "@/components/pagination";
import React from "react";
import TvCard from "./_components/tvCard";

type TvType = {
  page: number;
  results: {
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
  }[];
  total_pages: number;
  total_results: number;
};

const getTv = async (type: string, page: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_MAIN_URL}/tv/${type}?language=en-US&page=${
      page || 1
    }`,
    {
      next: { revalidate: 60 },
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

const TvListPage = async ({
  params,
  searchParams,
}: {
  params: { type: string };
  searchParams: { page: string };
}) => {
  const { type } = params;
  const { page } = searchParams;
  const tv: TvType = await getTv(type, page);

  return (
    <div>
      <div className="pt-20">
        <h1 className="text-lg">TV {type.replaceAll("_", " ")}</h1>
        <div>
          {!tv.results.length ? (
            <div className="min-h-[80vh] flex items-center justify-center text-zinc-500">
              No results
            </div>
          ) : (
            <div className="gridCard gap-x-2 gap-y-5 mt-5">
              {tv?.results.map((item) => (
                <TvCard key={item.id} item={item} />
              ))}
            </div>
          )}
          {tv.total_pages > 1 && (
            <div className="flex items-center justify-center mt-10">
              <Pagination
                href={`/tv-list/${type}?page=`}
                currentPage={tv?.page}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TvListPage;
