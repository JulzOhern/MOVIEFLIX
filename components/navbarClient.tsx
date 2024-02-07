"use client";

import { PiTelevisionFill } from "react-icons/pi";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { useOpenSearch, useOpenSideBar } from "@/utils/zustand";
import { FaSearch } from "react-icons/fa";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import SearchResultRow from "./searchResultRow";
import { useRouter } from "next/navigation";

type SearchMovieAndTvType = {
  results: {
    id: number;
    image: string;
    rating: number;
    releaseDate: string;
    title: string;
    type: string;
  }[];
};

const NavbarClient = () => {
  const [showResult, setShowResult] = useState(false);
  const setOpen = useOpenSideBar((state) => state.setOpen);
  const setCloseSearch = useOpenSearch((state) => state.setClose);
  const isOpenSearch = useOpenSearch((state) => state.isOpen);
  const ref = useRef<ElementRef<"input">>(null);
  const pathname = usePathname();
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.keyCode === 75) {
        e.preventDefault();
        ref.current?.focus();
      }
    };

    const handleClick = () => {
      setCloseSearch();
      setShowResult(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setCloseSearch]);

  useEffect(() => {
    return setCloseSearch();
  }, [pathname, setCloseSearch]);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["search", inputValue],
    enabled: inputValue !== "",
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CONSUMET_URL}/meta/tmdb/${inputValue}`
        );
        const data: SearchMovieAndTvType = await res.json();
        return data;
      } catch {
        throw new Error("Error");
      }
    },
  });

  const onSubmitSearch = async () => {
    if (inputValue) {
      router.push(`/search?keyword=${inputValue}`);
    }
  };

  return (
    <>
      <GiHamburgerMenu
        onClick={() => {
          setOpen();
          setCloseSearch();
        }}
        cursor="pointer"
        className="sm:scale-[1.5] lg:hidden"
      />
      <Link href="/">
        <h1 className="flex items-center gap-2 bg-white text-black rounded-lg py-1 px-3 sm:py-2">
          <PiTelevisionFill className="sm:scale-[1.5]" />
          <span className="font-bold sm:text-base text-[13px]">MOVIEFLIX</span>
        </h1>
      </Link>

      <form
        onSubmit={onSubmitSearch}
        className={cn(
          "lg:static fixed inset-x-0 top-[3.5rem] px-5 py-2 bg-zinc-900 duration-300 flex-1",
          isOpenSearch ? "block" : "hidden lg:block"
        )}
      >
        <div className="relative flex items-center flex-1 text-black lg:max-w-[25rem]">
          <FaSearch className="absolute left-3 text-zinc-500" />
          <input
            ref={ref}
            onClick={(e) => {
              e.stopPropagation();
              setShowResult(true);
            }}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowResult(true);
            }}
            type="text"
            placeholder="Search your favorite movies and tv series..."
            className="bg-white p-2 text-sm rounded w-0 flex-1 outline-none pl-11 pr-20"
          />
          <p className="absolute right-3 p-1 text-black text-xs bg-zinc-200 lg:block hidden">
            CTRL+K
          </p>

          <div className="absolute inset-x-0 top-9 text-white bg-zinc-900">
            {showResult &&
              data?.results
                .slice(0, 5)
                .map((item) => <SearchResultRow key={item.id} item={item} />)}

            {!!data?.results.length && showResult && (
              <div>
                <Link
                  href={`/search?keyword=${inputValue}`}
                  className="flex justify-center flex-1"
                >
                  <button className="flex-1 bg-red-500 p-2">All results</button>
                </Link>
              </div>
            )}

            {isLoading && showResult && (
              <div className="flex items-center justify-center p-7 bg-zinc-900">
                <Loader className="animate-spin" />
              </div>
            )}

            {isSuccess && data.results.length === 0 && showResult && (
              <div className="flex items-center justify-center p-7 bg-zinc-900">
                No result for {inputValue}
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default NavbarClient;
