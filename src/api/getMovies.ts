const API_KEY = import.meta.env.VITE_API_KEY
export default async function getMovies(id:string) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
  const data = await res.json();

  return {
    data
  }
}

