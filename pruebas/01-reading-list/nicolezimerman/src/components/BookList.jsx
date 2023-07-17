import Book from "./Book";
export default function BookList({ books, readListLength }) {
  return (
    <section className="books-list-section">
      <h2>{books.length} available books</h2>
      {readListLength > 0 && <h3>{readListLength} books in the read list</h3>}
      <ul className="books-list">
        {books.map(({ book }) => (
          <li key={book.ISBN}>
            <Book book={book} />
          </li>
        ))}
      </ul>
    </section>
  );
}
