import { Link } from "react-router";

interface MovieProps {
  movie: {
    id: number;
    vote_average: number;
    title: string;
    poster_path: string;
    author: string;
    content: string;
  };
}

export default function MovieCard({ movie }: MovieProps) {
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;

  const ratingColor =
    !rating ? "text-white/40 bg-white/10 border-white/10"
    : parseFloat(rating) >= 7.5 ? "text-emerald-300 bg-emerald-950/60 border-emerald-700/50"
    : parseFloat(rating) >= 5 ? "text-amber-300 bg-amber-950/60 border-amber-700/50"
    : "text-red-300 bg-red-950/60 border-red-700/50";

  return (
    <Link to={`/search/${movie.id}`} className="group block w-[160px] flex-shrink-0 focus:outline-none">
      <div className="relative flex flex-col">

        {/* Poster */}
        <div className="relative overflow-hidden rounded-xl border border-white/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="w-full aspect-[2/3] object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Rating badge */}
          <div className={`absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-[3px] rounded-full border text-[11px] font-semibold backdrop-blur-sm ${ratingColor}`}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {rating ?? "N/A"}
          </div>

          {/* View Details overlay button */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-white bg-[#e0633c] px-3.5 py-1.5 rounded-full shadow-lg">
              View Details
            </span>
          </div>
        </div>

        {/* Info below poster */}
        <div className="mt-2.5 px-0.5 flex flex-col gap-0.5">
          <h2
            className="text-[13px] font-medium text-white/90 leading-snug line-clamp-2 group-hover:text-[#e0633c] transition-colors duration-200"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {movie.title}
          </h2>
        </div>

        {/* Glow on hover */}
        <div className="absolute -inset-1 rounded-2xl bg-[#e0633c]/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10 pointer-events-none" />
      </div>
    </Link>
  );
}
