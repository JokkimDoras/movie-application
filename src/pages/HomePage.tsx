import { useContext,useEffect } from "react";
import { MovieContext } from "../context/useMovies";
import MovieCard from "../component/ui/MovieCard";
import { GenreContext } from "../context/GenreContext";
import WatchList from "./WatchList";
import { useNavigate } from "react-router";


export default function HomePage() {
  const navigate = useNavigate()

    const{ activeGenre } = useContext(GenreContext)
    const { movies } = useContext(MovieContext)
   const { activeLink} = useContext(GenreContext)
   const { favouriteMovie} = useContext(GenreContext)
    const genreMap:Record<string,number> = {
    Horror: 27,
    Action: 28,
    Drama: 18,
    Comedy: 35,
    "Sci-Fi": 878,
  };

  // if(activeLink === 'Watchlist'){
  //   navigate('watchlist')
  // }

  useEffect(() => {
    if (activeLink === "Watchlist") {
      navigate("/watchlist");
    }
  }, [activeLink, navigate]);
  

  
  const filteredMovies =
    activeGenre === "All"
      ? movies
      : movies.filter(movie =>
          movie.genre_ids.includes(genreMap[activeGenre as keyof typeof genreMap])
        );

        if (filteredMovies.length === 0) {
            return (
              <div className="flex flex-col items-center justify-center min-h-[70vh]">
                <h1 className="text-6xl font-bold text-white/10 mb-4">Oops!</h1>
          
                <h2 className="text-2xl font-semibold text-white">
                  Nothing to watch here
                </h2>
          
                <p className="mt-3 text-white/40">
                  No movies were found for this genre.
                </p>
              </div>
            );
          }
          
          

    return <div className="flex flex-wrap gap-5">
    {filteredMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
  </div>
}