import booksList from "../mocks/books.json";
import { useState, useMemo } from "react";

const mappedBooks = () => {
  return booksList.library.map(({ book }) => {
    return { ...book, onReadList: false };
  });
};

export default function useBooks() {
  const [books, setBooks] = useState(mappedBooks);

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

  const readList = useMemo(() => {
    return books.filter((book) => book.onReadList);
  }, [books]);
  /* 
  const readListLength = useMemo(() => {
    return readList.length;
  }, [readList]); */

  return { books, addRemoveFromReadList, readList };
}
