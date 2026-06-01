export type Movie = {
    id: number;
    vote_average: number
    title: string;
    poster_path: string
    author:string
    content:string
  };
  
export type MovieResponse = {
    page: number
    results:Movie[]
    total_pages: number
    total_results: number
  }