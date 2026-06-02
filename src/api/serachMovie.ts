
interface SearchRespose {
    results:{
    }[]
}
const api_key = import.meta.env.VITE_API_KEY
export default async function searchMovie(query:string) {
   const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`)
   const data:SearchRespose = await res.json();
   return data as SearchRespose

   
}

