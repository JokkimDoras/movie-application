import { useEffect, useState } from "react";
import getMovies from "../api/getMovie";
import { useParams } from "react-router";
import MovieDetailSkeleton from "../component/Skeltons/MovieDetailsSkeleton";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Genre { id: number; name: string; }
interface ProductionCompany { id: number; logo_path: string | null; name: string; origin_country: string; }

interface MovieDetail {
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

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fmt = (n: number) =>
  n > 0 ? "$" + new Intl.NumberFormat("en-US").format(n) : "N/A";

const runtime = (mins: number) =>
  `${Math.floor(mins / 60)}h ${mins % 60}m`;

const year = (date: string) => date?.split("-")[0] ?? "";

const ratingColor = (r: number) =>
  r >= 7.5 ? "#4ade80" : r >= 5 ? "#fbbf24" : "#f87171";

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 px-5 py-3.5 rounded-xl border border-white/[0.07] bg-white/[0.03]">
      <span className="text-[10px] uppercase tracking-[2.5px] text-white/35 font-medium">{label}</span>
      <span className="text-[15px] font-semibold text-white/90">{value}</span>
    </div>
  );
}

function GenreBadge({ name }: { name: string }) {
  return (
    <span className="text-[11px] tracking-widest uppercase font-semibold px-3 py-1.5 rounded-full border border-[#e0633c]/40 text-[#e0633c] bg-[#e0633c]/10">
      {name}
    </span>
  );
}

function RatingRing({ value }: { value: number }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const fill = (value / 10) * circ;
  const color = ratingColor(value);
  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      <svg width="80" height="80" className="-rotate-90" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5" />
        <circle
          cx="40" cy="40" r={r} fill="none"
          stroke={color} strokeWidth="5"
          strokeDasharray={`${fill} ${circ}`}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center leading-none">
        <span className="text-[18px] font-bold text-white">{value.toFixed(1)}</span>
        <span className="text-[9px] text-white/40 tracking-wider mt-0.5">/ 10</span>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MovieDetail() {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean>(true)
    const [movie, setMovie] = useState<MovieDetail | null>(null);

    const {id} = useParams()

    useEffect(() => {
        async function fetchMovie() {
          try {
            setLoading(true)
            const { data } = await getMovies(id);
            setMovie(data);
          } catch (err) {
            setLoading(false)
            console.error(err);
          }finally{
            setTimeout(() => {
                   setLoading(false)
            },500)
          }
        }
      
        fetchMovie();
      }, [id]);
      

      
      useEffect(() => {
          const t = setTimeout(() => setLoaded(true), 80);
          return () => clearTimeout(t);
        }, []);
        if (loading) {
          return <MovieDetailSkeleton/>
        }

  const imgBase = "https://image.tmdb.org/t/p";

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .detail-root { font-family: 'DM Sans', sans-serif; background: #080810; min-height: 100vh; }
        .title-font  { font-family: 'Bebas Neue', sans-serif; }
        .fade-up { opacity: 0; transform: translateY(18px); transition: opacity 0.55s ease, transform 0.55s ease; }
        .fade-up.in { opacity: 1; transform: translateY(0); }
        .delay-1 { transition-delay: 0.08s; }
        .delay-2 { transition-delay: 0.16s; }
        .delay-3 { transition-delay: 0.24s; }
        .delay-4 { transition-delay: 0.32s; }
        .delay-5 { transition-delay: 0.40s; }
      `}</style>

      <div className="detail-root text-white">

        {/* ── Backdrop hero ── */}
        <div className="relative w-full h-[520px] overflow-hidden">
          <img
            src={`${imgBase}/w1280${movie.backdrop_path}`}
            alt=""
            className="w-full h-full object-cover object-top scale-[1.04]"
            style={{ transition: "transform 6s ease", transform: loaded ? "scale(1)" : "scale(1.04)" }}
          />
          {/* layered gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080810]/95 via-[#080810]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-transparent to-[#080810]/30" />

          {/* Status chip */}
          <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 border border-white/10 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#4ade80]" />
            <span className="text-[11px] font-medium tracking-widest uppercase text-white/70">{movie.status}</span>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="max-w-6xl mx-auto px-6 -mt-52 relative z-10 pb-20">
          <div className="flex gap-10 items-end">

            {/* Poster */}
            <div className={`fade-up ${loaded ? "in" : ""} flex-shrink-0 hidden md:block`}>
              <div className="w-[210px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.8)]">
                <img
                  src={`${imgBase}/w342${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full aspect-[2/3] object-cover"
                />
              </div>
            </div>

            {/* Text block */}
            <div className="flex-1 pb-2">

              {/* Genres */}
              <div className={`fade-up delay-1 ${loaded ? "in" : ""} flex flex-wrap gap-2 mb-4`}>
                {movie.genres.map(g => <GenreBadge key={g.id} name={g.name} />)}
              </div>

              {/* Title */}
              <h1 className={`fade-up delay-2 ${loaded ? "in" : ""} title-font text-[64px] leading-none tracking-wide text-white mb-1`}>
                {movie.title}
              </h1>

              {/* Tagline */}
              {movie.tagline && (
                <p className={`fade-up delay-2 ${loaded ? "in" : ""} text-[15px] italic text-white/40 font-light mb-5`}>
                  "{movie.tagline}"
                </p>
              )}

              {/* Meta row */}
              <div className={`fade-up delay-3 ${loaded ? "in" : ""} flex items-center gap-4 text-[13px] text-white/45 mb-6`}>
                <span>{year(movie.release_date)}</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>{runtime(movie.runtime)}</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="uppercase">{movie.original_language}</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>{movie.origin_country.join(", ")}</span>
              </div>

              {/* Rating + vote count */}
              <div className={`fade-up delay-3 ${loaded ? "in" : ""} flex items-center gap-5 mb-7`}>
                <RatingRing value={movie.vote_average} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13px] text-white/50">User Score</span>
                  <span className="text-[13px] font-medium text-white/80">
                    {new Intl.NumberFormat("en-US").format(movie.vote_count)} votes
                  </span>
                </div>
              </div>

              {/* CTA buttons */}
              <div className={`fade-up delay-4 ${loaded ? "in" : ""} flex gap-3`}>
                <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#e0633c] hover:bg-[#c8552e] text-white text-[13px] font-semibold tracking-wide transition-colors duration-200 shadow-[0_4px_24px_rgba(224,99,60,0.4)]">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  Watch Trailer
                </button>
                <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 hover:border-white/30 text-white/70 hover:text-white text-[13px] font-medium tracking-wide transition-all duration-200 bg-white/[0.04]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                  Watchlist
                </button>
              </div>
            </div>
          </div>

          {/* ── Overview ── */}
          <div className={`fade-up delay-4 ${loaded ? "in" : ""} mt-12`}>
            <h3 className="text-[10px] uppercase tracking-[3px] text-white/30 font-medium mb-3">Overview</h3>
            <p className="text-[15px] text-white/65 leading-relaxed max-w-2xl font-light">
              {movie.overview}
            </p>
          </div>

          {/* ── Stats grid ── */}
          <div className={`fade-up delay-5 ${loaded ? "in" : ""} grid grid-cols-2 md:grid-cols-4 gap-3 mt-10`}>
            <StatPill label="Budget"       value={fmt(movie.budget)} />
            <StatPill label="Revenue"      value={fmt(movie.revenue)} />
            <StatPill label="Popularity"   value={movie.popularity.toFixed(0)} />
            <StatPill label="Release"      value={new Date(movie.release_date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} />
          </div>

          {/* ── Production companies ── */}
          <div className={`fade-up delay-5 ${loaded ? "in" : ""} mt-12`}>
            <h3 className="text-[10px] uppercase tracking-[3px] text-white/30 font-medium mb-5">Production</h3>
            <div className="flex flex-wrap gap-3">
              {movie.production_companies.map(c => (
                <div
                  key={c.id}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:border-white/15 transition-colors duration-200"
                >
                  {c.logo_path ? (
                    <img
                      src={`${imgBase}/w92${c.logo_path}`}
                      alt={c.name}
                      className="h-5 object-contain opacity-70 invert"
                    />
                  ) : (
                    <span className="text-[12px] font-medium text-white/60">{c.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
