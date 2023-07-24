import Book from "./Book";
import "./ReadList.css";
import { readListAtom } from "../bookAtoms";
import { useAtom } from "jotai";

export default function ReadList() {
  const [booksState, setBooksState] = useAtom(readListAtom);

  const { readlistBooks } = booksState;

  return (
    <section className="reading-list-section">
      <h2 style={{ paddingLeft: "15px" }}>Read list</h2>
      <ul className="read-list">
        {readlistBooks.map((book) => (
          <li key={book.ISBN} className="bookContainer">
            <button
              className="removeButton"
              onClick={setBooksState({
                type: "removeFromReadList",
                payload: book.ISBN,
              })}
            >
              x
            </button>
            <Book book={book} />
          </li>
        ))}
      </ul>
    </section>
  );
}
