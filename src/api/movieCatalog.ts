import type { MovieResponse } from "../types/movie.types";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE = "https://api.themoviedb.org/3";

async function fetchList(url: string): Promise<MovieResponse["results"]> {
  const res = await fetch(`${BASE}${url}${url.includes("?") ? "&" : "?"}api_key=${API_KEY}`);
  const data: MovieResponse = await res.json();
  return data.results ?? [];
}

export function fetchTrending() {
  return fetchList("/trending/movie/day");
}

export function fetchPopular() {
  return fetchList("/movie/popular");
}

export function fetchTopRated() {
  return fetchList("/movie/top_rated");
}

export function fetchUpcoming() {
  return fetchList("/movie/upcoming");
}

export function fetchNowPlaying() {
  return fetchList("/movie/now_playing");
}

export function fetchByGenre(genreId: number) {
  return fetchList(
    `/discover/movie?sort_by=popularity.desc&with_genres=${genreId}`
  );
}
