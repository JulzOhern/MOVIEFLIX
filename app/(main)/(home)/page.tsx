import React from "react";
import Card from "@/components/card";
import TopRated from "./_components/topRated";

export type TopRatedType = {
  page: number;
  total_pages: number;
  total_results: number;
  results: {
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
  }[];
};

export type NowPlayingType = {
  dates: {
    maxinum: string;
    minimum: string;
  };
  total_pages: number;
  total_results: number;
  page: number;
  results: {
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
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[];
};

export type PopularType = {
  page: number;
  total_pages: number;
  total_results: number;
  results: {
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
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[];
};

export type UpcomingType = {
  dates: {
    maxinum: string;
    minimum: string;
  };
  total_pages: number;
  total_results: number;
  page: number;
  results: {
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
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[];
};

const getTopRated = async (type: string) => {
  const typeFormat = !type ? "movie" : type === "movie" ? "movie" : type;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_MAIN_URL}/${typeFormat}/top_rated?language=en-US&page=1`,
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

const getNowPlaying = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_MAIN_URL}/movie/now_playing?language=en-US&page=1`,
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

const getPopular = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_MAIN_URL}/movie/popular?language=en-US&page=1`,
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

const getUpcoming = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_MAIN_URL}/movie/upcoming?language=en-US&page=1`,
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

const HomePage = async ({
  searchParams,
}: {
  searchParams: { type: string };
}) => {
  const { type } = searchParams;
  const topRated: TopRatedType = await getTopRated(type);
  const nowPlaying: NowPlayingType = await getNowPlaying();
  const popular: PopularType = await getPopular();
  const upcoming: UpcomingType = await getUpcoming();

  return (
    <div className="pt-20">
      <TopRated topRated={topRated} type={type} />

      <div className="mt-5">
        <h1 className="text-xl font-semibold mb-4">Now Playing</h1>
        <div className="gridCard gap-x-2 gap-y-5">
          {nowPlaying.results.slice(0, 12).map((item) => (
            <Card key={item.id} item={item} type="movie" />
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h1 className="text-xl font-semibold mb-4">Popular</h1>
        <div className="gridCard gap-x-2 gap-y-5">
          {popular.results.slice(0, 12).map((item) => (
            <Card key={item.id} item={item} type="movie" />
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h1 className="text-xl font-semibold mb-4">Upcoming</h1>
        <div className="gridCard gap-x-2 gap-y-5">
          {upcoming.results.slice(0, 12).map((item) => (
            <Card key={item.id} item={item} type="movie" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
