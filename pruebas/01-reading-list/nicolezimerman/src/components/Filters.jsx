import GenresFilter from "./GenresFilter.jsx";
import PagesFilter from "./PagesFilter.jsx";

export default function Filters() {
  return (
    <section className="filters">
      <GenresFilter />
      <PagesFilter />
    </section>
  );
}
