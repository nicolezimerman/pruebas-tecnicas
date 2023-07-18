import Book from "./Book";
import "./BookList.css";

export default function BookList({
  books,
  readListLength,
  addRemoveFromReadList,
}) {
  return (
    <section className="books-list-section">
      <h2>{books.length} available books</h2>
      {readListLength > 0 && <h3>{readListLength} books in the read list</h3>}
      <ul className="books-list">
        {books.map((book) => {
          const customClass = book.onReadList
            ? `book-not-available`
            : `book-available`;
          return (
            <li
              key={book.ISBN}
              onClick={() => addRemoveFromReadList(book.ISBN)}
              className={customClass}
            >
              <Book book={book} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
