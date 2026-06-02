
interface SearchRespose {
    results:{
    }[]
}
export default async function searchMovie(query:string) {
   const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=96525b58fad95f33b6786cec803d2857&query=${query}`)
   const data:SearchRespose = await res.json();
   return data as SearchRespose

   
}

