import React from "react";
import StreamingRow from "./_components/streamingRow";
import Image from "next/image";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import dynamic from "next/dynamic";
import Card from "./_components/card";
const CommentRow = dynamic(() => import("@/components/commentRow"), {
  ssr: false,
});

export type MovieType = {
  id: string;
  title: string;
  episodeId: string;
  translations: {
    title: string;
    description: string;
    language: string;
  }[];
  image: string;
  cover: string;
  logos: {
    url: string;
    aspectRatio: number;
    width: number;
  }[];
  type: string;
  rating: number;
  releaseDate: string;
  description: string;
  genres: string[];
  duration: number;
  directors: string[];
  writers: string[];
  actors: string[];
  trailer: {
    id: string;
    site: string;
    url: string;
  };
  mappings: {
    imdb: string;
    tmdb: string;
  };
  similar: {
    id: number;
    title: string;
    image: string;
    type: string;
    rating: string;
    releaseDate: string;
  }[];
  recommendations: {
    id: number;
    title: string;
    image: string;
    type: string;
    rating: string;
    releaseDate: string;
  }[];
};

export type StreamingLinksType = {
  headers: {
    Referer: string;
  };
  sources: {
    url: string;
    quality: string;
    isM3U8: string;
  }[];
  subtitles: {
    url: string;
    lang: string;
  }[];
};

const getMovie = async (movieId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CONSUMET_URL}/meta/tmdb/info/${movieId}?type=movie`
  );
  if (!res.ok) {
    return null;
  }
  return res.json();
};

const getStreamingLinks = async (movieId: string, showId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CONSUMET_URL}/meta/tmdb/watch/${movieId}?id=${showId}`
  );
  if (!res.ok) {
    return null;
  }
  return res.json();
};

const MoviePage = async ({ params }: { params: { movieId: string } }) => {
  const { movieId } = params;
  const movie: MovieType = await getMovie(movieId);
  const streamingLinks: StreamingLinksType = await getStreamingLinks(
    movie.episodeId,
    movie.id
  );

  return (
    <div className="pt-20">
      <StreamingRow streamingLinks={streamingLinks} movie={movie} />

      <div className="flex gap-4 mt-5">
        <Image
          src={movie.image}
          alt="poster"
          width={100}
          height={100}
          priority
          className="w-[7rem] h-full shrink-0"
        />
        <div>
          <p className="text-lg">{movie.title}</p>
          <div className="flex gap-2 my-3 text-xs">
            <p className="bg-red-500 p-1 px-2">{movie.type}</p>
            <p className="flex items-center gap-1 border border-zinc-700 bg-black p-1 px-2">
              <HiMiniArrowTrendingUp className="text-green-500 mr-2" />{" "}
              {movie.rating}
            </p>
          </div>
          <p className="text-[13px] text-zinc-500">{movie.description}</p>
        </div>
      </div>

      <div className="mt-10 pt-10 border-t border-zinc-700">
        <CommentRow ep={movie.episodeId} title={movie.title} />
      </div>

      <div className="mt-10">
        <h1 className="text-lg sm:text-xl font-semibold">Similar</h1>

        {movie?.similar?.length ? (
          <div className="gridCard gap-x-2 gap-y-5 mt-3">
            {movie?.similar?.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="min-h-[40vh] flex items-center justify-center text-zinc-500">
            No similar
          </div>
        )}
      </div>

      <div className="mt-10">
        <h1 className="text-lg sm:text-xl font-semibold">Recommendations</h1>

        {movie?.recommendations?.length ? (
          <div className="gridCard gap-x-2 gap-y-5 mt-3">
            {movie?.recommendations?.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="min-h-[40vh] flex items-center justify-center text-zinc-500">
            No recommendations
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviePage;
