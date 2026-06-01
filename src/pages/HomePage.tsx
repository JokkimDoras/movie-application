import { Link } from "react-router";
import { useContext } from "react";
import { MovieContext } from "../context/useMovies";


export default function HomePage() {

    const { movies  } = useContext(MovieContext)
    
    return <div>
        { movies.map((movie) => {
            return <div key={movie.id}>{movie.title}</div>
        })}
        <Link to='/search'>SearchPage</Link>
    </div>
}