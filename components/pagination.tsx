"use client";

import Link from "next/link";
import React, { useMemo } from "react";
import { MdChevronRight } from "react-icons/md";
import { MdChevronLeft } from "react-icons/md";
import { BiChevronsRight } from "react-icons/bi";
import { BiChevronsLeft } from "react-icons/bi";
import { cn } from "@/lib/utils";

type PaginationProp = {
  href: string;
  currentPage: number;
};

const Pagination = ({ href, currentPage }: PaginationProp) => {
  const paginationNumber = useMemo(() => {
    const paginationNumber = [];
    for (let i = 1; i < 501; i++) {
      paginationNumber.push(i);
    }
    return paginationNumber;
  }, []);

  return (
    <div className="flex items-center text-xs sm:text-sm gap-1">
      <Link
        href={`${href}1`}
        className="flex items-center justify-center sm:h-10 h-8 sm:w-10 w-8 rounded-full bg-zinc-800
      "
      >
        <BiChevronsLeft />
      </Link>
      <Link
        href={`${href}${Number(currentPage) - 1}`}
        className="flex items-center justify-center sm:h-10 h-8 sm:w-10 w-8 rounded-full bg-zinc-800"
      >
        <MdChevronLeft />
      </Link>
      <div className="flex items-center gap-1">
        {paginationNumber
          .filter(
            (item) =>
              item < Number(currentPage) + 3 && item > Number(currentPage) - 3
          )
          .map((item) => (
            <Link
              href={`${href}${item}`}
              key={item}
              className={cn(
                "flex items-center justify-center sm:h-10 h-8 sm:w-10 w-8 rounded-full shrink-0",
                Number(currentPage) === item ? "bg-red-500" : "bg-zinc-800"
              )}
            >
              {item}
            </Link>
          ))}
      </div>
      <Link
        href={`${href}${Number(currentPage) + 1}`}
        className="flex items-center justify-center sm:h-10 h-8 sm:w-10 w-8 rounded-full bg-zinc-800
      "
      >
        <MdChevronRight />
      </Link>
      <Link
        href={`${href}500`}
        className="flex items-center justify-center sm:h-10 h-8 sm:w-10 w-8 rounded-full bg-zinc-800
      "
      >
        <BiChevronsRight />
      </Link>
    </div>
  );
};

export default Pagination;
