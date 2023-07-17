import { useMemo, useState } from "react";
import "./App.css";
import booksList from "./mocks/books.json";
import BookList from "./components/BookList";
import ReadList from "./components/ReadList";

function App() {
  const [books] = useState(booksList.library);
  const [readList] = useState([]);

  /*   const addToReadList = (book) => {
    setReadList((prevReadList) => [...prevReadList, book]);
  };
 */
  const readListLength = useMemo(() => {
    return readList.length;
  }, [readList]);

  return (
    <>
      <h1>Books List App</h1>
      <main className="main">
        <BookList books={books} readListLength={readListLength} />
        {readList.length > 0 && <ReadList readList={readList} />}
      </main>
    </>
  );
}

export default App;
