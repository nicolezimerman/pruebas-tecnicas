import "./App.css";
import BookList from "./components/BookList";
import ReadList from "./components/ReadList";
import useFilters from "./hooks/useFilters";

/* const mappedBooks = () => {
  return booksList.library.map(({ book }) => {
    return { ...book, onReadList: false };
  });
};
 */

function App() {
  //const [books, setBooks] = useState(mappedBooks);
  const { books, addRemoveFromReadList, readList } = useFilters();

  return (
    <>
      <h1>Books List App</h1>
      <main className="main">
        <BookList
          books={books}
          addRemoveFromReadList={addRemoveFromReadList}
          readListLength={readList.length}
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
