import { useState } from "react";
import { useNavigate } from "react-router";
import type { TMDBMovie } from "../../types/movie.types";

const IMG = "https://image.tmdb.org/t/p";

export default function NetflixCard({ movie }: { movie: TMDBMovie }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const rating = movie.vote_average?.toFixed(1);
  const year = movie.release_date?.split("-")[0] ?? "";

  return (
    <div
      className="relative flex-shrink-0 cursor-pointer transition-all duration-300 ease-out"
      style={{
        width: hovered ? 220 : 180,
        zIndex: hovered ? 30 : 1,
        transform: hovered ? "scale(1.08)" : "scale(1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/search/${movie.id}`)}
    >
      <div
        className={`rounded-md overflow-hidden border transition-shadow duration-300 ${
          hovered
            ? "border-white/30 shadow-[0_12px_40px_rgba(0,0,0,0.9)]"
            : "border-transparent shadow-lg"
        }`}
      >
        <div className="relative aspect-[2/3] bg-zinc-900">
          {movie.poster_path ? (
            <img
              src={`${IMG}/w342${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/20 text-sm">
              No poster
            </div>
          )}

          {hovered && (
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-3">
              <p className="text-[13px] font-semibold text-white line-clamp-2 leading-tight">
                {movie.title}
              </p>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-white/60">
                <span className="text-emerald-400 font-medium">{rating}</span>
                {year && <span>{year}</span>}
              </div>
              <p className="text-[10px] text-white/50 line-clamp-2 mt-1.5 leading-snug">
                {movie.overview}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
