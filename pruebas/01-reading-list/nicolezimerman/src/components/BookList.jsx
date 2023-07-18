import Book from "./Book";
import "./BookList.css";
import Filters from "./Filters";
import useFilters from "../hooks/useFilters";
import { useContext } from "react";
import { FiltersContext } from "../FiltersProvider";

export default function BookList({
  books,
  addRemoveFromReadList,
  readListLength,
}) {
  //how to see 'readList' updated from useFilters.
  const { totalBooks } = useFilters();
  const { filters } = useContext(FiltersContext);

  return (
    <section className="books-list-section">
      <h2>{totalBooks} available books</h2>
      {readListLength > 0 && <h3>{readListLength} books in the read list</h3>}
      <h3>
        {books.length} books in the genre: {filters.genre}
      </h3>
      <Filters />
      <ul className="books-list">
        {books.map((book) => {
          const customClass = book.onReadList
            ? `book-not-available`
            : `book-available`;
          return (
            <li
              key={book.ISBN}
              onClick={() => addRemoveFromReadList(book.ISBN)}
              className={customClass}
            >
              <Book book={book} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
