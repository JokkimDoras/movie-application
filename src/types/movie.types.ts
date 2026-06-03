export type Movie = {
    id: number;
    vote_average: number
    title: string;
    poster_path: string
    author:string
    content:string
    genre_ids:number[]
  };

/** TMDB list item — used for Netflix-style rows & hero */
export type TMDBMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
};
  
export type MovieResponse = {
    page: number
    results: TMDBMovie[]
    total_pages: number
    total_results: number
  }

  // ─── Types ────────────────────────────────────────────────────────────────────
export interface Genre { id: number; name: string; }
export interface ProductionCompany { id: number; logo_path: string | null; name: string; origin_country: string; }


  export interface MovieDetail {
    id: number;
    title: string;
    original_title: string;
    tagline: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    runtime: number;
    vote_average: number;
    vote_count: number;
    budget: number;
    revenue: number;
    status: string;
    genres: Genre[];
    production_companies: ProductionCompany[];
    origin_country: string[];
    original_language: string;
    popularity: number;
  }