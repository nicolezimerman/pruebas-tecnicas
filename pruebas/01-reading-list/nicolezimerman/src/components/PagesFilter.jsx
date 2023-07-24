import { useMemo } from "react";
import { useAtom, useAtomValue } from "jotai";
import { readListAtom, bookFiltersAtom } from "../bookAtoms.js";

export default function PagesFilter() {
  const booksState = useAtomValue(readListAtom);
  const [filters, setFilters] = useAtom(bookFiltersAtom);

  const books = useMemo(() => {
    return booksState.books;
  }, [booksState]);

  const maxAmountPages = useMemo(() => {
    let max = 0;

    books.forEach((book) => {
      if (book.pages > max) {
        max = book.pages;
      }
    });

    return max;
  }, [books]);

  const handleChangeFilter = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      maxPages: event.target.value,
    }));
  };

  return (
    <div>
      <label>Choose a max amount of pages:</label>
      {0}
      <input
        type="range"
        name="maxpages"
        id="maxpages"
        value={filters.maxPages}
        onChange={handleChangeFilter}
        min={0}
        max={maxAmountPages}
      ></input>
      {maxAmountPages}
    </div>
  );
}
