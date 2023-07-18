import Book from "./Book";
import "./ReadList.css";

export default function ReadList({ readList, addRemoveFromReadList }) {
  return (
    <section className="reading-list-section">
      <h2 style={{ paddingLeft: "15px" }}>Read list</h2>
      <ul className="read-list">
        {readList.map((book) => (
          <li key={book.ISBN} className="bookContainer">
            <button
              className="removeButton"
              onClick={() => addRemoveFromReadList(book.ISBN)}
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
