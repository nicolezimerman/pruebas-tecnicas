import { useContext, useState, useMemo, useEffect } from "react";
import { FiltersContext } from "../FiltersProvider";
import booksList from "../mocks/books.json";

const mappedBooks = () => {
  return booksList.library.map(({ book }) => {
    return { ...book, onReadList: false };
  });
};

const LIST_BOOK_KEY = "booksList";

export default function useFilters() {
  const [books, setBooks] = useState(mappedBooks);

  const { filters } = useContext(FiltersContext);

  const addRemoveFromReadList = (ISBN) => {
    const updatedBooks = books.map((book) => {
      if (book.ISBN === ISBN) {
        return { ...book, onReadList: !book.onReadList };
      } else {
        return book;
      }
    });
    setBooks(updatedBooks);
    //update local storage
    localStorage.setItem(LIST_BOOK_KEY, JSON.stringify(updatedBooks));
  };

  //on first load
  useEffect(() => {
    const storedBooks =
      JSON.parse(localStorage.getItem(LIST_BOOK_KEY)) ?? mappedBooks();
    setBooks(storedBooks);
    localStorage.setItem(LIST_BOOK_KEY, JSON.stringify(storedBooks));
  }, []);

  const bookListFiltered = useMemo(() => {
    return books.filter(
      (book) =>
        (book.genre === filters.genre || filters.genre === "All") &&
        book.pages < filters.maxPages
    );
  }, [filters, books]);

  const readList = useMemo(() => {
    return books.filter((book) => book.onReadList);
  }, [books]);

  /*   const readListLength = useMemo(() => {
    return readList.length;
  }, [readList]);
 */
  const genresList = useMemo(() => {
    return Array.from(new Set(books.map(({ genre }) => genre)));
  }, [books]);

  return {
    books: bookListFiltered,
    totalBooks: books.length,
    readList,
    //readListLength,
    addRemoveFromReadList,
    setBooks,
    genresList,
  };
}
