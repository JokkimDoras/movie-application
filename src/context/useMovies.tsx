import { useState,useEffect, createContext } from "react";
import type { MovieResponse } from "../types/movie.types";
type MovieListType = MovieResponse['results'];

export const MovieContext = createContext<{ movies: MovieListType } | null>(null);

const api_key:string = import.meta.env.VITE_API_KEY

export default function MovieProvider ({ children }) {
    const [movies,setMovies] = useState<MovieListType>([])

    useEffect(() => {
        const getMovies = async () => {
           const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`);
           const data:MovieResponse = await res.json();
           setMovies(data.results)
        }

        getMovies()

    },[])

    return <MovieContext.Provider value={{movies}}>
           {children}
    </MovieContext.Provider>


}