import { useState, createContext } from "react";

export const GenreContext = createContext(null);

export default function GenreProvider({ children }) {
  const [activeGenre, setActiveGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favouriteMovie, setFavouriteMovie] = useState<[]>([]);

  return (
    <GenreContext.Provider
      value={{
        activeGenre,
        setActiveGenre,
        searchQuery,
        setSearchQuery,
        favouriteMovie,
        setFavouriteMovie,
      }}
    >
      {children}
    </GenreContext.Provider>
  );
}