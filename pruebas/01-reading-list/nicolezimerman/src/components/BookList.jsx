import Book from "./Book";
import "./BookList.css";
import Filters from "./Filters";
import { readListAtom, bookFiltersAtom } from "../bookAtoms";
import { useAtom, useAtomValue } from "jotai";
import clsx from "clsx";

export default function BookList() {
  const [booksState, setBooksState] = useAtom(readListAtom);
  const filters = useAtomValue(bookFiltersAtom);

  console.log(booksState);

  const { books, readlistBooks } = booksState;

  const totalBooks = books.length;

  return (
    <section className="books-list-section">
      <h2>{totalBooks} available books</h2>
      {readlistBooks.length > 0 && (
        <h3>{readlistBooks.length} books in the read list</h3>
      )}
      <h3>
        {books.length} books in the genre: {filters.genre}
      </h3>
      <Filters />
      <ul className="books-list">
        {books.map((book) => {
          return (
            <li
              key={book.ISBN}
              onClick={() =>
                setBooksState({ type: "addToReadList", payload: book.ISBN })
              }
              className={clsx(
                book.onReadList ? "book-not-available" : "book-available"
              )}
            >
              <Book book={book} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
