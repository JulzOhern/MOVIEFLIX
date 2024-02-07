import React from "react";
import SearchCard from "./_components/searchCard";
import Pagination from "@/components/pagination";

type SearchResultProp = {
  currentPage: number;
  hasNextPage: boolean;
  results: {
    id: number;
    title: string;
    image: string;
    type: string;
    rating: number;
    releaseDate: string;
  }[];
  totalResults: number;
  totalPages: number;
};

const getSearchResult = async (keyword: string, page: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CONSUMET_URL}/meta/tmdb/${keyword}?page=${
      page || 1
    }`,
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

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { keyword: string; page: string };
}) => {
  const { keyword, page } = searchParams;
  const searchResult: SearchResultProp = await getSearchResult(keyword, page);

  return (
    <div className="pt-20">
      <h1>Search result for {keyword}</h1>

      <div className="gridCard gap-x-2 gap-y-5 mt-4">
        {searchResult.results?.map((item) => (
          <SearchCard key={item.id} item={item} />
        ))}
      </div>

      {searchResult?.totalPages > 1 && (
        <div className="flex items-center justify-center mt-10">
          <Pagination
            href={`/search?keyword=${keyword}&page=`}
            currentPage={searchResult?.currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
