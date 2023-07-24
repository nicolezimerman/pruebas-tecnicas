import { useContext, useState, useMemo, useEffect } from "react";
import { BooksContext } from "../FiltersProvider";
import booksList from "../mocks/books.json";

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

const LIST_BOOK_KEY = "booksList";

export default function useFilters() {
  const [books, setBooks] = useState(() => mappedBooks());

  const { filters } = useContext(BooksContext);

  useEffect(() => {
    localStorage.setItem(LIST_BOOK_KEY, JSON.stringify(books));
  }, [books]);

  const addRemoveFromReadList = (ISBN) => {
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

  const readList = books.filter((book) => book.onReadList);

  //to check
  const readListLength = readList.length;

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

  console.log("books", books);

  return {
    books: bookListFiltered,
    totalBooks: books.length,
    readList,
    readListLength,
    addRemoveFromReadList,
    setBooks,
    genresList,
    maxAmountPages,
  };
}
