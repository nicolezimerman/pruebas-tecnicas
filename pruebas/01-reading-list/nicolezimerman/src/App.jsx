import "./App.css";
import BookList from "./components/BookList";
import ReadList from "./components/ReadList";

/* const mappedBooks = () => {
  return booksList.library.map(({ book }) => {
    return { ...book, onReadList: false };
  });
};
 */

function App() {
  //const [books, setBooks] = useState(mappedBooks);

  return (
    <>
      <h1>Books List App</h1>
      <main className="main">
        <BookList />
        <ReadList />
      </main>
    </>
  );
}

export default App;
