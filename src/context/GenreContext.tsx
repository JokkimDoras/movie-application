import { useState,createContext } from "react";

export const GenreContext = createContext(null);

export default function GenreProvider({ children }) {
  const [activeGenre, setActiveGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState<string>("");


  return (
    <GenreContext.Provider
      value={{ activeGenre, setActiveGenre,searchQuery,setSearchQuery }}
    >
      {children}
    </GenreContext.Provider>
  );
}