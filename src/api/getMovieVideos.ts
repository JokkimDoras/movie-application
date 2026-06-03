const API_KEY = import.meta.env.VITE_API_KEY;

export default async function getMovieTrailerKey(
  id: string
): Promise<string | null> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
  );
  const data = await res.json();
  const trailer = data.results?.find(
    (v: { type: string; site: string }) =>
      v.type === "Trailer" && v.site === "YouTube"
  );
  return trailer?.key ?? null;
}
