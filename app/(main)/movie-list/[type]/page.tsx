import Pagination from "@/components/pagination";
import React from "react";
import MovieCard from "./_components/movieCard";

type MovieType = {
  dates: {
    maxinum: string;
    mininum: string;
  };
  page: number;
  results: {
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
  }[];
  total_pages: number;
  total_results: number;
};

const getMovie = async (type: string, page: string) => {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_TMDB_MAIN_URL
    }/movie/${type}?language=en-US&page=${page || 1}`,
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

const MovieListPage = async ({
  params,
  searchParams,
}: {
  params: { type: string };
  searchParams: { page: string };
}) => {
  const { type } = params;
  const { page } = searchParams;
  const movie: MovieType = await getMovie(type, page);

  return (
    <div className="pt-20">
      <h1 className="text-lg">Movie {type.replaceAll("_", " ")}</h1>
      <div>
        {!movie.results.length ? (
          <div className="min-h-[80vh] flex items-center justify-center text-zinc-500">
            No results
          </div>
        ) : (
          <div className="gridCard gap-x-2 gap-y-5 mt-5">
            {movie?.results.map((item) => (
              <MovieCard key={item.id} item={item} />
            ))}
          </div>
        )}
        {movie.total_pages > 1 && (
          <div className="flex items-center justify-center mt-10">
            <Pagination
              href={`/movie-list/${type}?page=`}
              currentPage={movie?.page}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieListPage;
