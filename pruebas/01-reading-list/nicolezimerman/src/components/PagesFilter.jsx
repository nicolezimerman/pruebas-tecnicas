import { useContext } from "react";
import { FiltersContext } from "../FiltersProvider.jsx";

export default function PagesFilter() {
  const {
    filters: { maxPages },
    setFilters,
  } = useContext(FiltersContext);

  const handleChangeFilter = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      maxPages: event.target.value,
    }));
  };

  return (
    <div>
      <label>Choose a max amount of pages:</label>
      {0}
      <input
        type="range"
        name="maxpages"
        id="maxpages"
        value={maxPages}
        onChange={handleChangeFilter}
        min={0}
        max={1000}
      ></input>
      {maxPages}
    </div>
  );
}
