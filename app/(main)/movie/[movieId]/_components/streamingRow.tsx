"use client";

import Artplayer from "../../../tv/[tvId]/_components/artplayer";
import React, { useCallback, useState } from "react";
import { MovieType, StreamingLinksType } from "../page";
import { cn } from "@/lib/utils";

type StreamingRowProp = {
  streamingLinks: StreamingLinksType;
  movie: MovieType;
};

const StreamingRow = ({ streamingLinks, movie }: StreamingRowProp) => {
  const getInstance = useCallback((art: Artplayer) => {}, []);
  const [server, setServer] = useState("art");
  const defaultUrl = streamingLinks?.sources.find(
    (item) => item.quality === "auto"
  );

  return (
    <div>
      {server === "art" ? (
        <Artplayer
          subtitles={streamingLinks?.subtitles}
          option={{
            url: defaultUrl?.url || "",
            poster: movie?.cover || "",
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
      ) : (
        <iframe
          src={`https://vidsrc.to/embed/tv/${movie.mappings.tmdb}`}
          frameBorder="0"
          className="aspect-video w-full max-h-[33rem]"
        />
      )}

      <div className="flex md:flex-row flex-col mt-4">
        <div className="text-zinc-600 bg-black p-5 md:rounded-l-lg text-sm md:max-w-[18rem] text-center">
          <p>
            Your are watching{" "}
            <span className="text-white font-light truncate">
              {movie.title} Movie
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
    </div>
  );
};

export default StreamingRow;
