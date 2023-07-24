import { createContext, useState } from "react";

export const FiltersContext = createContext();

export default function FiltersProvider({ children }) {
  const [filters, setFilters] = useState({ genre: "All", maxPages: 350 });
  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
}
