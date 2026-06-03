import { useState, createContext, useEffect, type ReactNode } from "react";
import type { MovieDetail } from "../types/movie.types";

const WATCHLIST_KEY = "flickr_watchlist";

function loadWatchlist(): MovieDetail[] {
  try {
    const raw = localStorage.getItem(WATCHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

type GenreContextType = {
  activeGenre: string;
  setActiveGenre: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  favouriteMovie: MovieDetail[];
  setFavouriteMovie: React.Dispatch<React.SetStateAction<MovieDetail[]>>;
};

export const GenreContext = createContext<GenreContextType | null>(null);

export default function GenreProvider({ children }: { children: ReactNode }) {
  const [activeGenre, setActiveGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favouriteMovie, setFavouriteMovie] =
    useState<MovieDetail[]>(loadWatchlist);

  useEffect(() => {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(favouriteMovie));
  }, [favouriteMovie]);

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
