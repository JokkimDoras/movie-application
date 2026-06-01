import { useState,createContext } from "react";

export const GenreContext = createContext(null);

export default function GenreProvider({ children }) {
  const [activeGenre, setActiveGenre] = useState("All");

  return (
    <GenreContext.Provider
      value={{ activeGenre, setActiveGenre }}
    >
      {children}
    </GenreContext.Provider>
  );
}