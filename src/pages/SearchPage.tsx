import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
  overview: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const TMDB_IMG = "https://image.tmdb.org/t/p";

const SORT_OPTIONS = [
  { label: "Relevance",   value: "relevance" },
  { label: "Rating ↑",    value: "rating_desc" },
  { label: "Rating ↓",    value: "rating_asc" },
  { label: "Newest",      value: "date_desc" },
  { label: "Oldest",      value: "date_asc" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const ratingMeta = (r: number) => {
  if (r >= 7.5) return { color: "#4ade80", bg: "rgba(74,222,128,0.12)", border: "rgba(74,222,128,0.3)" };
  if (r >= 5)   return { color: "#fbbf24", bg: "rgba(251,191,36,0.12)",  border: "rgba(251,191,36,0.3)" };
  return           { color: "#f87171", bg: "rgba(248,113,113,0.12)",  border: "rgba(248,113,113,0.3)" };
};

const year = (d: string) => d?.split("-")[0] ?? "—";

// ─── Skeleton Card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02]">
      <div className="sk w-full" style={{ aspectRatio: "2/3" }} />
      <div className="p-3 flex flex-col gap-2">
        <div className="sk h-3.5 w-3/4 rounded" />
        <div className="sk h-3 w-1/2 rounded" />
      </div>
    </div>
  );
}

// ─── Movie Card ───────────────────────────────────────────────────────────────
function MovieCard({ movie, index }: { movie: Movie; index: number }) {
  const navigate = useNavigate();
  const rm = ratingMeta(movie.vote_average);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      onClick={() => navigate(`/search/${movie.id}`)}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] cursor-pointer transition-all duration-300 hover:border-white/15 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Poster */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "2/3" }}>
        {!imgLoaded && <div className="sk absolute inset-0" />}
        {movie.poster_path ? (
          <img
            src={`${TMDB_IMG}/w300${movie.poster_path}`}
            alt={movie.title}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/[0.04]">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="rgba(255,255,255,0.15)">
              <path d="M18 3H6C4.343 3 3 4.343 3 6v12c0 1.657 1.343 3 3 3h12c1.657 0 3-1.343 3-3V6c0-1.657-1.343-3-3-3zM7 7h2v2H7V7zm0 4h2v2H7v-2zm0 4h2v2H7v-2zm4-8h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h4v2h-4v-2z"/>
            </svg>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating badge */}
        {movie.vote_average > 0 && (
          <div
            className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-bold backdrop-blur-sm border"
            style={{ color: rm.color, background: rm.bg, borderColor: rm.border }}
          >
            <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            {movie.vote_average.toFixed(1)}
          </div>
        )}

        {/* Hover CTA */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span className="text-[11px] font-semibold tracking-[2px] uppercase text-white bg-[#e0633c] px-4 py-1.5 rounded-full shadow-lg">
            View Details
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-0.5">
        <h3
          className="text-[13px] font-medium text-white/85 line-clamp-1 group-hover:text-[#e0633c] transition-colors duration-200"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {movie.title}
        </h3>
        <span className="text-[11px] text-white/35">{year(movie.release_date)}</span>
      </div>

      {/* Ambient glow */}
      <div className="absolute -inset-1 rounded-2xl bg-[#e0633c]/8 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10 pointer-events-none" />
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-28 gap-5">
      <div className="w-20 h-20 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="8" y1="11" x2="14" y2="11"/><line x1="11" y1="8" x2="11" y2="14"/>
        </svg>
      </div>
      <div className="flex flex-col items-center gap-1.5 text-center">
        <p className="text-[15px] font-medium text-white/60">No results for <span className="text-white/80">"{query}"</span></p>
        <p className="text-[13px] text-white/30">Try a different title, genre, or keyword</p>
      </div>
    </div>
  );
}

// ─── Main SearchPage ──────────────────────────────────────────────────────────
export default function SearchPage() {
  const [query, setQuery]           = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [movies, setMovies]         = useState<Movie[]>([]);
  const [loading, setLoading]       = useState(false);
  const [total, setTotal]           = useState(0);
  const [page, setPage]             = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort]             = useState("relevance");
  const [focused, setFocused]       = useState(false);
  const inputRef                    = useRef<HTMLInputElement>(null);

  // Debounce query
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(query), 420);
    return () => clearTimeout(t);
  }, [query]);

  // Reset page on new search
  useEffect(() => { setPage(1); }, [debouncedQ, sort]);

  // Fetch from TMDB
  useEffect(() => {
    if (!debouncedQ.trim()) { setMovies([]); setTotal(0); return; }

    const controller = new AbortController();
    setLoading(true);

    const TMDB_KEY = import.meta.env.VITE_API_KEY;

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(debouncedQ)}&page=${page}`,
      { signal: controller.signal }
    )
      .then(r => r.json())
      .then(data => {
        let results: Movie[] = data.results ?? [];

        if (sort === "rating_desc") results = [...results].sort((a, b) => b.vote_average - a.vote_average);
        if (sort === "rating_asc")  results = [...results].sort((a, b) => a.vote_average - b.vote_average);
        if (sort === "date_desc")   results = [...results].sort((a, b) => b.release_date?.localeCompare(a.release_date ?? "") ?? 0);
        if (sort === "date_asc")    results = [...results].sort((a, b) => a.release_date?.localeCompare(b.release_date ?? "") ?? 0);

        setMovies(results);
        setTotal(data.total_results ?? 0);
        setTotalPages(data.total_pages ?? 1);
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [debouncedQ, page, sort]);

  // ⌘K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const showSkeleton = loading;
  const showEmpty    = !loading && debouncedQ && movies.length === 0;
  const showIdle     = !debouncedQ;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        .search-root { font-family: 'DM Sans', sans-serif; }
        @keyframes shimmer {
          0%   { background-position: -800px 0; }
          100% { background-position:  800px 0; }
        }
        .sk {
          background: linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.09) 40%, rgba(255,255,255,0.04) 80%);
          background-size: 800px 100%;
          animation: shimmer 1.6s infinite linear;
          border-radius: 6px;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card-enter { animation: fadeUp 0.4s ease both; }
      `}</style>

      <div className="search-root min-h-screen" style={{ background: "#080810" }}>
        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* ── Page heading ── */}
          <div className="mb-8">
            <h1
              className="text-[48px] leading-none tracking-widest text-white mb-1"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Search Films
            </h1>
            <p className="text-[13px] text-white/35 tracking-wide">
              Millions of movies, one search away
            </p>
          </div>

          {/* ── Search bar ── */}
          <div
            className={`flex items-center gap-3 rounded-2xl px-5 py-4 border transition-all duration-200 mb-4
              ${focused
                ? "border-[#e0633c] bg-[rgba(224,99,60,0.05)] shadow-[0_0_0_4px_rgba(224,99,60,0.08)]"
                : "border-white/[0.1] bg-white/[0.03] hover:border-white/[0.18]"
              }`}
          >
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke={focused ? "#e0633c" : "rgba(255,255,255,0.3)"}
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="flex-shrink-0 transition-colors duration-200"
            >
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>

            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Search movies, directors, genres…"
              className="flex-1 bg-transparent border-none outline-none text-[15px] text-white placeholder:text-white/25 caret-[#e0633c]"
            />

            {query && (
              <button
                onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                className="text-white/30 hover:text-white/60 transition-colors duration-150 flex-shrink-0"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}

            <span className="text-[11px] text-white/20 bg-white/[0.06] border border-white/10 rounded px-1.5 py-0.5 flex-shrink-0 hidden md:block">
              ⌘K
            </span>
          </div>

          {/* ── Toolbar: result count + sort ── */}
          {debouncedQ && !showEmpty && (
            <div className="flex items-center justify-between mb-6">
              <p className="text-[13px] text-white/40">
                {loading ? (
                  <span className="sk inline-block w-28 h-3.5 rounded align-middle" />
                ) : (
                  <>
                    <span className="text-white/70 font-medium">
                      {new Intl.NumberFormat("en-US").format(total)}
                    </span>{" "}
                    results for "{debouncedQ}"
                  </>
                )}
              </p>

              {/* Sort */}
              <div className="flex items-center gap-1.5">
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setSort(opt.value)}
                    className={`text-[11px] px-3 py-1.5 rounded-full border transition-all duration-150
                      ${sort === opt.value
                        ? "text-[#e0633c] border-[#e0633c]/50 bg-[#e0633c]/10"
                        : "text-white/35 border-white/[0.08] hover:text-white/60 hover:border-white/20"
                      }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Grid ── */}
          {!showIdle && !showEmpty && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {showSkeleton
                ? Array.from({ length: 18 }).map((_, i) => <SkeletonCard key={i} />)
                : movies.map((m, i) => (
                    <div key={m.id} className="card-enter" style={{ animationDelay: `${i * 35}ms` }}>
                      <MovieCard movie={m} index={i} />
                    </div>
                  ))
              }
            </div>
          )}

          {/* ── Empty state ── */}
          {showEmpty && <EmptyState query={debouncedQ} />}

          {/* ── Idle state ── */}
          {showIdle && (
            <div className="flex flex-col items-center justify-center py-32 gap-6">
              <div
                className="w-24 h-24 rounded-2xl bg-[#e0633c]/10 border border-[#e0633c]/20 flex items-center justify-center"
                style={{ boxShadow: "0 0 60px rgba(224,99,60,0.12)" }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#e0633c" opacity="0.7">
                  <path d="M18 3H6C4.343 3 3 4.343 3 6v12c0 1.657 1.343 3 3 3h12c1.657 0 3-1.343 3-3V6c0-1.657-1.343-3-3-3zM7 7h2v2H7V7zm0 4h2v2H7v-2zm0 4h2v2H7v-2zm4-8h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h4v2h-4v-2z"/>
                </svg>
              </div>
              <div className="text-center flex flex-col gap-1.5">
                <p className="text-[17px] font-medium text-white/60">What are you in the mood for?</p>
                <p className="text-[13px] text-white/25">Search by title, director, cast, or genre</p>
              </div>
              <div className="flex gap-2 flex-wrap justify-center mt-1">
                {["Inception", "The Godfather", "A24 Horror", "Christopher Nolan"].map(s => (
                  <button
                    key={s}
                    onClick={() => { setQuery(s); inputRef.current?.focus(); }}
                    className="text-[12px] px-3.5 py-2 rounded-full border border-white/[0.08] text-white/35 hover:border-[#e0633c]/40 hover:text-[#e0633c] hover:bg-[#e0633c]/08 transition-all duration-200"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Pagination ── */}
          {!loading && movies.length > 0 && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/[0.08] text-[12px] text-white/40 hover:text-white/70 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
                Prev
              </button>

              {/* Page numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-full text-[13px] font-medium border transition-all duration-150
                      ${p === page
                        ? "bg-[#e0633c] text-white border-[#e0633c] shadow-[0_0_16px_rgba(224,99,60,0.4)]"
                        : "text-white/40 border-white/[0.08] hover:text-white/70 hover:border-white/20"
                      }`}
                  >
                    {p}
                  </button>
                );
              })}

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/[0.08] text-[12px] text-white/40 hover:text-white/70 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
              >
                Next
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
