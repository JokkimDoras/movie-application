import { useState,createContext } from "react";

export const GenreContext = createContext(null);

export default function GenreProvider({ children }) {
  const [activeGenre, setActiveGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [ favouriteMovie,setFavouriteMovie ] = useState<[]>([])
  const [activeLink, setActiveLink] = useState<string>("Discover");
  
  return (
    <GenreContext.Provider
      value={{ activeGenre, setActiveGenre,searchQuery,setSearchQuery,favouriteMovie,setFavouriteMovie,activeLink,setActiveLink }}
    >
      {children}
    </GenreContext.Provider>
  );
}