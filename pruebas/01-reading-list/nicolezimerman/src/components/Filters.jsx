import { useContext } from "react";
import { FiltersContext } from "../FiltersProvider.jsx";
import useFilters from "../hooks/useFilters.js";

export default function Filters() {
  const {
    filters: { genre },
    setFilters,
  } = useContext(FiltersContext);
  const { genresList } = useFilters();

  const handleChangeFilter = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      genre: event.target.value,
    }));
  };
  return (
    <section className="filters">
      <label>Choose a genre:</label>
      <select
        name="genres"
        id="genres"
        value={genre}
        onChange={handleChangeFilter}
      >
        <option value="All">All</option>
        {genresList.map((genre) => {
          return (
            <option key={genre} value={genre}>
              {genre}
            </option>
          );
        })}
      </select>
    </section>
  );
}
