import { atom } from "jotai";
import booksList from "./mocks/books.json";

const initialBooks = booksList.library.map(({ book }) => {
  return { ...book, onReadList: false };
});

export const bookFiltersAtom = atom({
  genre: "All",
  maxPages: 350,
});

const booksAtom = atom(initialBooks);

function createSetBookReadlist(onReadList) {
  return (get, set, ISBN) => {
    const books = get(booksAtom);

    const updatedBooks = books.map((book) => {
      if (book.ISBN === ISBN) {
        return { ...book, onReadList };
      }
      return book;
    });

    set(booksAtom, updatedBooks);
  };
}

export const readListAtom = atom(
  (get) => {
    const books = get(booksAtom);
    const filters = get(bookFiltersAtom);

    return {
      books,
      readlistBooks: books.filter((book) => book.onReadList),
      filteredBooks: books.filter(
        (book) =>
          (book.genre === filters.genre || filters.genre === "All") &&
          book.pages < filters.maxPages
      ),
    };
  },
  (get, set, payload) => {
    switch (payload.type) {
      case "addToReadList":
        createSetBookReadlist(true)(get, set, payload.payload);
        break;
      case "removeFromReadList":
        createSetBookReadlist(false)(get, set, payload.payload);
        break;
      default:
        throw new Error("Invalid action type");
    }
  }
);
