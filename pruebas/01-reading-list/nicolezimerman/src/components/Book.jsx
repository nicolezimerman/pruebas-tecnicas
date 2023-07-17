export default function Book({ book: { title, cover } }) {
  return <img className="book" alt={title} src={cover} />;
}
