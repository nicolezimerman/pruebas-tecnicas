import { useAtom, useAtomValue } from "jotai";
import { readListAtom, bookFiltersAtom } from "../bookAtoms.js";

function removeDuplicates(items) {
  return Array.from(new Set(items));
}

export default function GenresFilter() {
  const booksState = useAtomValue(readListAtom);
  const [filters, setFilters] = useAtom(bookFiltersAtom);
  const books = booksState.books;

  const genresList = removeDuplicates(
    books
      .map((book) => book.genre)
      .sort((genre1, genre2) => genre1.localeCompare(genre2))
  );

  const handleChangeFilter = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      genre: event.target.value,
    }));
  };

  return (
    <div>
      <label>Choose a genre:</label>
      <select
        name="genres"
        id="genres"
        value={filters.genre}
        onChange={handleChangeFilter}
      >
        <option value="All">All</option>
        {genresList.map((genre) => {
          return (
            <option key={genre} value={genre}>
              {genre}
            </option>
          );
        })}
      </select>
    </div>
  );
}
