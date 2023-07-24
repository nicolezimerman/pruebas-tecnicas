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
    console.log("update", ISBN);
    const books = get(booksAtom);
    console.log(books);

    const updatedBooks = books.map((book) => {
      console.log(`book ISBN ${book.ISBN} === ${ISBN}}`);
      if (book.ISBN === ISBN) {
        console.log("book to update", {
          ...book,
          onReadList,
        });
        return { ...book, onReadList };
      }
      return book;
    });

    console.log("updatedBooks", updatedBooks);

    set(booksAtom, updatedBooks);
  };
}

export const readListAtom = atom(
  (get) => {
    const books = get(booksAtom);
    const filters = get(bookFiltersAtom);

    console.log(
      "get executed",
      books.filter((book) => book.onReadList)
    );

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
