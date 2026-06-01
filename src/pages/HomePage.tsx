import { useContext } from "react";
import { MovieContext } from "../context/useMovies";
import MovieCard from "../component/MovieCard";

export default function HomePage() {

    const { movies  } = useContext(MovieContext)
    
    return <div className="flex flex-wrap gap-5">
    {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
  </div>
}