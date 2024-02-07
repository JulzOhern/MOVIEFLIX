import React from "react";
import StreamingRow from "./_components/streamingRow";
import dynamic from "next/dynamic";
import Card from "./_components/card";
import Image from "next/image";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
const CommentRow = dynamic(() => import("@/components/commentRow"), {
  ssr: false,
});

export type TvInfoType = {
  id: string;
  title: string;
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
  totalEpisodes: number;
  totalSeasons: number;
  directors: string[];
  writers: string[];
  actors: string[];
  trailer: {
    url: string;
  };
  mappings: {
    imdb: string;
    tmdb: number;
  };
  similar: {
    id: number;
    title: string;
    image: string;
    type: string;
    rating: number;
    releaseDate: string;
  }[];
  recommendations: {
    id: number;
    title: string;
    image: string;
    type: string;
    rating: number;
    releaseDate: string;
  }[];
  seasons: {
    season: number;
    image: {
      mobile: string;
      hd: string;
    };
    episodes: {
      id: string;
      title: string;
      episode: number;
      season: number;
      releaseDate: string;
      description: string;
      url: string;
      img: {
        mobile: string;
        hd: string;
      };
    }[];
  }[];
  nextAiringEpisode: {
    season: number;
    episode: number;
    releaseDate: string;
    title: string;
    runtime: number;
  };
};

export type StreamingLinkType = {
  headers: {
    Referer: string;
  };
  sources: {
    url: string;
    quality: string;
    isM3U8: boolean;
  }[];
  subtitles: {
    url: string;
    lang: string;
  }[];
};

const getInfo = async (tvId: string) => {
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

const getStreamingLinks = async (
  episodeId: string | undefined,
  showId: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CONSUMET_URL}/meta/tmdb/watch/${episodeId}?id=${showId}`,
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

const TvPage = async ({
  params,
  searchParams,
}: {
  params: { tvId: string };
  searchParams: { ep: string };
}) => {
  const { tvId } = params;
  const { ep } = searchParams;
  const tvInfo: TvInfoType = await getInfo(tvId);
  const streamingLinks: StreamingLinkType = await getStreamingLinks(
    ep,
    tvInfo?.id
  );
  const seasonIndex =
    tvInfo?.seasons &&
    tvInfo?.seasons?.findIndex((item) =>
      item.episodes?.some((item) => item.id === ep)
    );
  const episode =
    tvInfo?.seasons &&
    tvInfo?.seasons[seasonIndex]?.episodes.find((item) => item.id === ep);

  return (
    <div className="pt-20">
      <StreamingRow
        streamingLinks={streamingLinks}
        tvInfo={tvInfo}
        episodes={episode}
        seasonIndex={seasonIndex}
        tvId={tvId}
      />

      {!!tvInfo && (
        <div className="flex md:flex-row flex-col gap-4 mt-5">
          <div className="md:block flex justify-center shrink-0">
            <Image
              src={tvInfo?.image}
              alt="poster"
              width={300}
              height={100}
              priority
              className="w-[9rem] h-full object-cover"
            />
          </div>
          <div>
            <p className="text-lg">{tvInfo?.title}</p>
            <div className="flex gap-2 my-3 text-xs">
              <p className="bg-red-500 p-1 px-2">{tvInfo?.type}</p>
              <p className="flex items-center gap-1 border border-zinc-700 bg-black p-1 px-2">
                <HiMiniArrowTrendingUp className="text-green-500 mr-2" />{" "}
                {tvInfo?.rating}
              </p>
            </div>
            <p className="text-[13px] text-zinc-500">{tvInfo?.description}</p>
          </div>
        </div>
      )}

      <div className="mt-10 pt-10 border-t border-zinc-700">
        <CommentRow ep={ep} title={tvInfo?.title} />
      </div>

      <div className="mt-10">
        <h1 className="text-lg sm:text-xl font-semibold">Similar</h1>

        {tvInfo?.similar?.length ? (
          <div className="gridCard gap-x-2 gap-y-5 mt-3">
            {tvInfo?.similar?.map((item) => (
              <Card key={item?.id} item={item} />
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

        {tvInfo?.recommendations?.length ? (
          <div className="gridCard gap-x-2 gap-y-5 mt-3">
            {tvInfo?.recommendations?.map((item) => (
              <Card key={item?.id} item={item} />
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

export default TvPage;
