import type { TMDBMovie } from "../types/movie.types";

const API_KEY = import.meta.env.VITE_API_KEY;

export default async function getSimilarMovies(id: string): Promise<TMDBMovie[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.results ?? [];
}
