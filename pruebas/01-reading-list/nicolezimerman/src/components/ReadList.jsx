import Book from "./Book";

export default function ReadList({ readList }) {
  return (
    <section className="reading-list-section">
      <ul className="books-list">
        {readList.map(({ book }) => (
          <li key={book.ISBN}>
            <Book book={book} />
          </li>
        ))}
      </ul>
    </section>
  );
}
