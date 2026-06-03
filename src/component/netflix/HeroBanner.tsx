import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { TMDBMovie } from "../../types/movie.types";

const IMG = "https://image.tmdb.org/t/p";

export default function HeroBanner({
  movies,
  onAddToList,
  inList,
}: {
  movies: TMDBMovie[];
  onAddToList: (movie: TMDBMovie) => void;
  inList: (id: number) => boolean;
}) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const withBackdrop = movies.filter((m) => m.backdrop_path);
  const featured = withBackdrop[index] ?? movies[0];

  useEffect(() => {
    if (withBackdrop.length <= 1) return;
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % Math.min(withBackdrop.length, 5));
        setFade(true);
      }, 400);
    }, 8000);
    return () => clearInterval(id);
  }, [withBackdrop.length]);

  if (!featured) return null;

  const year = featured.release_date?.split("-")[0] ?? "";

  return (
    <section className="relative w-full h-[72vh] min-h-[480px] max-h-[820px] overflow-hidden">
      <img
        key={featured.id}
        src={`${IMG}/original${featured.backdrop_path}`}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080810] via-[#080810]/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-[#080810]/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

      <div className="absolute bottom-[28%] left-4 md:left-12 max-w-xl md:max-w-2xl z-10 px-2">
        <p className="text-[11px] uppercase tracking-[4px] text-[#e0633c] font-semibold mb-2">
          Featured
        </p>
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-none mb-3 drop-shadow-lg"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
        >
          {featured.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-white/70 mb-4">
          <span className="text-emerald-400 font-semibold">
            {featured.vote_average.toFixed(1)} Rating
          </span>
          {year && <span>{year}</span>}
          <span className="px-2 py-0.5 border border-white/30 rounded text-[11px]">
            HD
          </span>
        </div>
        <p className="text-sm md:text-base text-white/75 line-clamp-3 md:line-clamp-4 leading-relaxed mb-6 drop-shadow">
          {featured.overview}
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => navigate(`/search/${featured.id}`)}
            className="flex items-center gap-2 px-6 py-2.5 rounded bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Play
          </button>
          <button
            type="button"
            onClick={() => navigate(`/search/${featured.id}`)}
            className="flex items-center gap-2 px-6 py-2.5 rounded bg-white/20 text-white font-semibold text-sm hover:bg-white/30 backdrop-blur-md transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            More Info
          </button>
          <button
            type="button"
            onClick={() => onAddToList(featured)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded font-semibold text-sm backdrop-blur-md transition-colors border ${
              inList(featured.id)
                ? "border-[#e0633c] text-[#e0633c] bg-[#e0633c]/15"
                : "border-white/30 text-white bg-white/10 hover:bg-white/20"
            }`}
          >
            {inList(featured.id) ? "✓ My List" : "+ My List"}
          </button>
        </div>
      </div>

      {movies.length > 1 && (
        <div className="absolute bottom-8 right-8 flex gap-1.5 z-10">
          {movies.slice(0, 5).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
