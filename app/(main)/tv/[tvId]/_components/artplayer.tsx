import { useEffect, useMemo, useRef } from "react";
import Artplayer from "artplayer";
import { playM3u8 } from "@/utils/playhls";
import artplayerPluginHlsQuality from "artplayer-plugin-hls-quality";

type PlayerProp = {
  option: {
    url: string;
    poster: string;
    volume: number;
    isLive: boolean;
    muted: boolean;
    autoplay: boolean;
    pip: boolean;
    autoSize: boolean;
    autoMini: boolean;
    screenshot: boolean;
    setting: boolean;
    loop: boolean;
    flip: boolean;
    playbackRate: boolean;
    aspectRatio: boolean;
    fullscreen: boolean;
    fullscreenWeb: boolean;
    subtitleOffset: boolean;
    miniProgressBar: boolean;
    mutex: boolean;
    backdrop: boolean;
    playsInline: boolean;
    autoPlayback: boolean;
    airplay: boolean;
    theme: string;
  };
  getInstance: any;
  subtitles:
    | {
        url: string;
        lang: string;
      }[]
    | undefined;
};

export default function Player({ option, getInstance, subtitles }: PlayerProp) {
  const artRef = useRef(null);

  const sub = useMemo(() => {
    const sub =
      subtitles?.map(({ url, lang }) => ({
        default: lang === "English - English" || lang === "English",
        html: lang,
        url,
      })) || [];

    return sub;
  }, [subtitles]);

  useEffect(() => {
    const art = new Artplayer({
      ...option,
      container: artRef.current!,
      type: "m3u8",
      customType: {
        m3u8: playM3u8,
      },
      lang: navigator.language.toLowerCase(),
      moreVideoAttr: {
        crossOrigin: "anonymous",
      },
      plugins: [
        artplayerPluginHlsQuality({
          setting: true,
          getResolution: (level) => level.height + "P",
          title: "Quality",
          auto: "Auto",
        }),
      ],
      subtitle: {
        url:
          sub?.find(
            (item) =>
              item.html === "English - English" || item.html === "English"
          )?.url || "",
        type: "srt",
        style: {
          fontSize: "20px",
        },
        encoding: "utf-8",
      },
      settings: [
        {
          width: 200,
          html: "Subtitle",
          tooltip: "English",
          selector: [
            {
              html: "Display",
              tooltip: "Show",
              switch: true,
              onSwitch: function (item) {
                item.tooltip = item.switch ? "Hide" : "Show";
                art.subtitle.show = !item.switch;
                return !item.switch;
              },
            },
            ...(sub as { default: boolean; html: string; url: string }[]),
          ],
          onSelect: function (item) {
            art.subtitle.switch(item.url, {
              name: item.html,
            });
            return item.html;
          },
        },
      ],
    });

    if (getInstance && typeof getInstance === "function") {
      getInstance(art);
    }

    return () => {
      if (art && art.destroy) {
        art.destroy(false);
      }
    };
  }, [option, getInstance, sub]);

  return <div ref={artRef} className="aspect-video max-h-[33rem] w-full"></div>;
}
