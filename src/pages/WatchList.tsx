import { useContext ,useEffect} from "react"
import { GenreContext } from "../context/GenreContext"
import MovieCard from "../component/ui/MovieCard"
import { useNavigate } from "react-router"
import Button from "../component/ui/Button";


export default function WatchList() {
    const navigate = useNavigate();
    const { favouriteMovie,activeLink,setActiveLink } = useContext(GenreContext) 
    

    
      useEffect(() => {
        if (activeLink === "Trending") {
          navigate("/");
        }
      }, [activeLink, navigate]);

     

      if(favouriteMovie.length === 0) {
        return  (
            <div className="flex flex-col items-center justify-center min-h-[70vh]">
              <h1 className="text-6xl font-bold text-white/10 mb-4">Oops!</h1>
        
              <h2 className="text-2xl font-semibold text-white">
                Look Like you Never add WatchList
              </h2>
        
              <p className="mt-3 text-white/40">
                No movies were found for this WatchList.
              </p>
              <Button onClick={() => setActiveLink('Trending')} className="m-5 bg-orange-500/80 cursor-pointer">Add Watchlist</Button>
            </div>
          );
      }

    return <div className="flex flex-wrap gap-5">
        {favouriteMovie.map((movie) => {
            return <MovieCard movie={movie} key={movie.id}/>
        })}
    </div>
}