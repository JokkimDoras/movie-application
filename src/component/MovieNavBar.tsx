import { useState,useRef,useEffect, useContext } from "react";
import { Link } from "react-router";
import { GenreContext } from "../context/GenreContext";

const GENRES = ["All", "Action", "Drama", "Sci-Fi", "Horror", "Comedy", "Thriller", "Animation", "Documentary"];
const NAV_LINKS = ["Discover", "Trending", "Watchlist", "Reviews"];

function FilmIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 3H6C4.343 3 3 4.343 3 6v12c0 1.657 1.343 3 3 3h12c1.657 0 3-1.343 3-3V6c0-1.657-1.343-3-3-3zM7 7h2v2H7V7zm0 4h2v2H7v-2zm0 4h2v2H7v-2zm4-8h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h4v2h-4v-2z" />
    </svg>
  );
}
interface SearchIconProps{
  focused:boolean
}
function SearchIcon({ focused }:SearchIconProps) {
  return (
    <svg
      width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke={focused ? "#e0633c" : "rgba(255,255,255,0.35)"}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="flex-shrink-0"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

interface NavLinkProps{
  label:string
  active:boolean
  onClick:() => void;
}

function NavLink({ label, active, onClick }:NavLinkProps) {
  return (
    <span
      onClick={onClick}
      className={`text-[13px] font-normal px-3.5 py-1.5 rounded-md cursor-pointer tracking-[0.3px] transition-all duration-200 select-none
        ${active
          ? "text-[#e0633c]"
          : "text-white/50 hover:text-white/90 hover:bg-white/[0.06]"
        }`}
    >
      {label}
    </span>
  );
}

interface SearchPillProps{
  value:string
  onChange:(e) => void
  onSearch:(query:string) => void
}

function SearchPill({ value, onChange, onSearch }:SearchPillProps) {
  const [focused, setFocused] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault(); // prevent browser search behavior

        inputRef.current?.focus();
        inputRef.current?.select(); // highlights existing text
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      onClick={() => document.getElementById("movie-search-input").focus()}
      className={`flex items-center gap-2 rounded-full px-3 py-[7px] cursor-text min-w-[180px] transition-all duration-200
        ${focused
          ? "bg-[rgba(224,99,60,0.06)] border border-[#e0633c]"
          : "bg-white/5 border border-white/[0.12] hover:border-[rgba(224,99,60,0.5)] hover:bg-white/[0.08]"
        }`}
    >
      <SearchIcon focused={focused} />
      <input
        ref={inputRef}
        id="movie-search-input"
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(e) => e.key === "Enter" && value.trim() && onSearch(value.trim())}
        placeholder="Search movies, shows…"
        className="bg-transparent border-none outline-none text-[13px] text-white/85 w-full placeholder:text-white/[0.28] caret-[#e0633c] font-[inherit]"
      />
      <span className="text-[11px] text-white/25 bg-white/[0.07] rounded px-1.5 py-[1px] flex-shrink-0 border border-white/10">
        ⌘K
      </span>
    </div>
  );
}

function IconButton({ children, label, showDot }) {
  return (
    <button
      aria-label={label}
      className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/[0.04] border border-white/10 cursor-pointer text-white/50 hover:bg-white/[0.09] hover:text-white/90 hover:border-white/20 transition-all duration-200 relative"
    >
      {children}
      {showDot && (
        <span className="absolute top-[7px] right-[7px] w-1.5 h-1.5 bg-[#e0633c] rounded-full border-[1.5px] border-[#0a0a0f]" />
      )}
    </button>
  );
}

// function Avatar({ initial }) {
//   return (
//     <div
//       className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-medium text-white cursor-pointer border-[1.5px] border-[rgba(224,99,60,0.4)] hover:border-[#e0633c] transition-colors duration-200 select-none"
//       style={{ background: "linear-gradient(135deg, #e0633c, #c04020)" }}
//     >
//       {initial}
//     </div>
//   );
// }

function GenreChip({ label, active, onClick }) {
  return (
    <span
      onClick={onClick}
      className={`text-[12px] font-normal px-3.5 py-[5px] rounded-full cursor-pointer tracking-[0.2px] transition-all duration-200 select-none border
        ${active
          ? "bg-[rgba(224,99,60,0.15)] border-[#e0633c] text-[#e0633c]"
          : "bg-white/5 border-white/10 text-white/45 hover:bg-[rgba(224,99,60,0.15)] hover:border-[rgba(224,99,60,0.4)] hover:text-[#e0633c]"
        }`}
    >
      {label}
    </span>
  );
}

export default function MovieNavbar() {
  const [activeLink, setActiveLink] = useState<string>("Discover");
  const { activeGenre,setActiveGenre} = useContext(GenreContext);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query) => {
    alert(`Searching for: "${query}"`);
  };


  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <style>{`
        .logo-name { font-family: 'Bebas Neue', sans-serif; }
        .navbar-root { font-family: 'DM Sans', sans-serif; }
        .nav-glow::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(224,99,60,0.6) 30%, rgba(224,99,60,0.6) 70%, transparent 100%);
        }
      `}</style>

      <div className=" sticky top-0 z-50 navbar-root rounded-xl overflow-hidden border border-white/[0.06]" style={{ background: "#0d0d15" }}>

        {/* Main navbar */}
        <nav className="nav-glow relative flex items-center justify-between h-16 px-7" style={{ background: "#0a0a0f", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>

          {/* Logo */}
          <Link to='/' className="flex items-center gap-2.5 cursor-pointer select-none">
            <div className="w-9 h-9 bg-[#e0633c] rounded-lg flex items-center justify-center flex-shrink-0">
              <FilmIcon />
            </div>
            <div className="flex flex-col leading-none">
              <span className="logo-name text-[22px] tracking-[2px] text-white">Flickr</span>
              <span className="text-[9px] tracking-[3px] uppercase text-[#e0633c] mt-[1px] font-medium">
                Find your film
              </span>
            </div>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link}
                label={link}
                active={activeLink === link}
                onClick={() => setActiveLink(link)}
              />
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2.5">
            <SearchPill
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearch={handleSearch}
            />
            <div className="w-px h-[22px] mx-0.5 bg-white/[0.08]" />
            <IconButton label="Notifications" showDot>
              <BellIcon />
            </IconButton>
          </div>
        </nav>

        {/* Genre filter row */}
        <div 
        className=
        "flex items-center flex-wrap gap-2.5 px-7 py-5"
        >
          {GENRES.map((genre) => (
            <GenreChip
              key={genre}
              label={genre}
              active={activeGenre === genre}
              onClick={() => setActiveGenre(genre)}
            />
          ))}
        </div>

      </div>
    </>
  );
}
