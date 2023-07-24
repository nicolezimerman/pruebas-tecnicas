import { createContext, useState, useEffect, useMemo, useContext } from "react";
import booksList from "./mocks/books.json";

const LIST_BOOK_KEY = "booksList";

const mappedBooks = () => {
  const books = JSON.parse(localStorage.getItem(LIST_BOOK_KEY)) || [];

  if (books) {
    return books;
  }

  return booksList.library.map(({ book }) => {
    return { ...book, onReadList: false };
  });
};

function removeDuplicates(items) {
  return Array.from(new Set(items));
}

export const BooksContext = createContext();

export function useBooksContext() {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error("useBooksContext must be used within a BooksProvider");
  }

  return context;
}

export default function BooksProvider({ children }) {
  const [books, setBooks] = useState(() => mappedBooks());
  const [filters, setFilters] = useState({ genre: "All", maxPages: 350 });

  useEffect(() => {
    localStorage.setItem(LIST_BOOK_KEY, JSON.stringify(books));
  }, [books]);

  const removeFromReadList = (ISBN) => {
    setBooks((books) => {
      const updatedBooks = books.map((book) => {
        if (book.ISBN === ISBN) {
          return { ...book, onReadList: !book.onReadList };
        } else {
          return book;
        }
      });

      return updatedBooks;
    });
  };

  const bookListFiltered = useMemo(() => {
    return books.filter(
      (book) =>
        (book.genre === filters.genre || filters.genre === "All") &&
        book.pages < filters.maxPages
    );
  }, [filters, books]);

  const readList = useMemo(
    () => books.filter((book) => book.onReadList),
    [books]
  );

  //to check
  const readListLength = useMemo(() => readList.length, [readList]);

  const genresList = useMemo(() => {
    return removeDuplicates(books.map((book) => book.genre));
  }, [books]);

  const maxAmountPages = useMemo(() => {
    let max = 0;

    books.forEach((book) => {
      if (book.pages > max) {
        max = book.pages;
      }
    });

    return max;
  }, [books]);

  const value = useMemo(() => {
    return {
      books: bookListFiltered,
      totalBooks: books.length,
      readList,
      readListLength,
      addRemoveFromReadList: removeFromReadList,
      setBooks,
      genresList,
      maxAmountPages,
      filters,
      setFilters,
    };
  }, [
    bookListFiltered,
    books.length,
    genresList,
    maxAmountPages,
    readList,
    readListLength,
    filters,
    setFilters,
  ]);

  return (
    <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
  );
}
