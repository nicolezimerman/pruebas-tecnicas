import { useMemo, useState } from "react";
import "./App.css";
import booksList from "./mocks/books.json";
import BookList from "./components/BookList";
import ReadList from "./components/ReadList";
const mappedBooks = () => {
  return booksList.library.map(({ book }) => {
    return { ...book, onReadList: false };
  });
};

function App() {
  const [books, setBooks] = useState(mappedBooks);
  //const [readList, setReadList] = useState([]);

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

    //Change readList to onReadList on same array of books.
    /** 
     * 
    const isDuplicated = readList.some(({ ISBN }) => ISBN === book.ISBN);
    if (isDuplicated) {
      return;
    }
    setReadList((prevReadList) => [...prevReadList, book]);
    */
  };

  const readList = useMemo(() => {
    return books.filter((book) => book.onReadList);
  }, [books]);

  const readListLength = useMemo(() => {
    return readList.length;
  }, [readList]);

  return (
    <>
      <h1>Books List App</h1>
      <main className="main">
        <BookList
          books={books}
          readListLength={readListLength}
          addRemoveFromReadList={addRemoveFromReadList}
        />
        {readList.length > 0 && (
          <ReadList
            readList={readList}
            addRemoveFromReadList={addRemoveFromReadList}
          />
        )}
      </main>
    </>
  );
}

export default App;
