"use client";

import { cn } from "@/lib/utils";
import { StreamingLinkType, TvInfoType } from "../page";
import Artplayer from "./artplayer";
import React, { useCallback, useState } from "react";
import Link from "next/link";

type StreamingRowProp = {
  streamingLinks: StreamingLinkType;
  tvInfo: TvInfoType;
  episodes:
    | {
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
      }
    | undefined;
  seasonIndex: number;
  tvId: string;
};

const StreamingRow = ({
  streamingLinks,
  tvInfo,
  episodes,
  seasonIndex,
  tvId,
}: StreamingRowProp) => {
  const [server, setServer] = useState("art");

  const getInstance = useCallback((art: Artplayer) => {}, []);
  const [season, setSeason] = useState<number | undefined>(undefined);
  const defaultUrl = streamingLinks?.sources.find(
    (item) => item.quality === "auto"
  );
  const poster = tvInfo?.cover;

  return (
    <div>
      {server === "art" ? (
        <>
          <Artplayer
            subtitles={streamingLinks?.subtitles}
            option={{
              url: defaultUrl?.url || "",
              poster: poster || "",
              volume: 0.5,
              isLive: false,
              muted: false,
              autoplay: false,
              pip: true,
              autoSize: false,
              autoMini: false,
              screenshot: true,
              setting: true,
              loop: false,
              flip: true,
              playbackRate: true,
              aspectRatio: true,
              fullscreen: true,
              fullscreenWeb: true,
              subtitleOffset: false,
              miniProgressBar: false,
              mutex: true,
              backdrop: true,
              playsInline: false,
              autoPlayback: true,
              airplay: true,
              theme: "red",
            }}
            key={defaultUrl?.url}
            getInstance={getInstance}
          />
        </>
      ) : (
        <iframe
          src={`https://vidsrc.to/embed/tv/${tvInfo?.mappings.tmdb}`}
          frameBorder="0"
          className="aspect-video w-full max-h-[33rem]"
        />
      )}

      <div className="flex md:flex-row flex-col mt-4">
        <div className="text-zinc-600 bg-black p-5 md:rounded-l-lg text-sm md:max-w-[18rem] text-center">
          <p>
            Your are watching{" "}
            <span className="text-white font-light">
              Episode {episodes?.episode}
            </span>
          </p>
          <p>
            (If current server doesn&apos;t work please try other servers
            beside.)
          </p>
        </div>
        <div className="flex items-center gap-1 text-sm text-zinc-400 px-8 flex-1 bg-zinc-800/40 md:rounded-r-lg p-5">
          <p className="mr-4">Server:</p>
          <button
            onClick={() => setServer("art")}
            className={cn(
              "p-2 px-10",
              server === "art" ? "bg-red-500 text-white" : "bg-zinc-900/70"
            )}
          >
            Art
          </button>
          <button
            onClick={() => setServer("vidsrc")}
            className={cn(
              "p-2 px-10",
              server === "vidsrc" ? "bg-red-500 text-white" : "bg-zinc-900/70"
            )}
          >
            VidSrc
          </button>
        </div>
      </div>

      {!!tvInfo?.seasons?.length && (
        <div>
          <select
            value={season === undefined ? seasonIndex : season}
            onChange={(e) => setSeason(Number(e.target.value))}
            className="bg-zinc-800/40 text-zinc-500 mt-4 max-h-[30rem] outline-none"
          >
            {tvInfo?.seasons.map((item) => (
              <option key={item.season} value={item.season - 1}>
                Season {item.season}
              </option>
            ))}
          </select>

          <div className="gridEp gap-2 mt-4 max-h-[25rem] overflow-auto">
            {tvInfo?.seasons[
              season === undefined ? seasonIndex : season
            ]?.episodes
              .filter((item) => item.id !== undefined)
              .map((item) => (
                <Link key={item.id} href={`/tv/${tvId}?ep=${item.id}`}>
                  <button
                    className={cn(
                      "p-1 w-full text-sm sm:text-base",
                      item.id === episodes?.id
                        ? "bg-red-500 text-white"
                        : "bg-zinc-800/40 text-zinc-500"
                    )}
                  >
                    {item.episode}
                  </button>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StreamingRow;
