import { useRef } from "react";
import type { TMDBMovie } from "../../types/movie.types";
import NetflixCard from "./NetflixCard";

export default function MovieRow({
  title,
  movies,
}: {
  title: string;
  movies: TMDBMovie[];
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  if (!movies.length) return null;

  const scroll = (dir: "left" | "right") => {
    const el = rowRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -520 : 520, behavior: "smooth" });
  };

  return (
    <section className="relative group/row mb-10 px-4 md:px-10">
      <h2 className="text-lg md:text-xl font-semibold text-white mb-3 tracking-wide">
        {title}
      </h2>

      <button
        type="button"
        onClick={() => scroll("left")}
        className="absolute left-0 top-[52px] z-20 h-[calc(100%-52px)] w-10 md:w-12 flex items-center justify-center bg-black/50 opacity-0 group-hover/row:opacity-100 hover:bg-black/70 transition-opacity duration-200 rounded-r"
        aria-label="Scroll left"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => scroll("right")}
        className="absolute right-0 top-[52px] z-20 h-[calc(100%-52px)] w-10 md:w-12 flex items-center justify-center bg-black/50 opacity-0 group-hover/row:opacity-100 hover:bg-black/70 transition-opacity duration-200 rounded-l"
        aria-label="Scroll right"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </button>

      <div
        ref={rowRef}
        className="flex gap-2 overflow-x-auto overflow-y-visible pb-4 scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {movies.map((movie) => (
          <NetflixCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
