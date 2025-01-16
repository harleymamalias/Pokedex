import { useState } from "react";

const INITIAL_PAGE = 1;
export const usePagination = (initialPage: number = INITIAL_PAGE) => {
  const [page, setPage] = useState<number>(initialPage);

  const nextPage = () => setPage((prevPage) => prevPage + 1);
  const prevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  return {
    page,
    nextPage,
    prevPage,
    setPage,
  };
};
