import { useContext, useState, useMemo } from "react";
import { FiltersContext } from "../FiltersProvider";
import booksList from "../mocks/books.json";

const mappedBooks = () => {
  return booksList.library.map(({ book }) => {
    return { ...book, onReadList: false };
  });
};

export default function useFilters() {
  const [books, setBooks] = useState(mappedBooks);

  const { filters } = useContext(FiltersContext);

  const bookListFiltered = useMemo(() => {
    return books.filter(
      (book) => book.genre === filters.genre || filters.genre === "All"
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

  const addRemoveFromReadList = (ISBN) => {
    setBooks((prevBooks) => {
      return prevBooks.map((book) => {
        if (book.ISBN === ISBN) {
          return { ...book, onReadList: !book.onReadList };
        } else {
          return book;
        }
      });
    });
  };

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
