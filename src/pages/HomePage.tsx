import { useContext, useEffect, useState, useMemo } from "react";
import { GenreContext } from "../context/GenreContext";
import type { TMDBMovie } from "../types/movie.types";
import getMovies from "../api/getMovies";
import {
  fetchTrending,
  fetchPopular,
  fetchTopRated,
  fetchUpcoming,
  fetchNowPlaying,
  fetchByGenre,
} from "../api/movieCatalog";
import HeroBanner from "../component/netflix/HeroBanner";
import MovieRow from "../component/netflix/MovieRow";

const GENRE_MAP: Record<string, number> = {
  Horror: 27,
  Action: 28,
  Drama: 18,
  Comedy: 35,
  "Sci-Fi": 878,
  Thriller: 53,
  Animation: 16,
  Documentary: 99,
};

type Catalog = {
  trending: TMDBMovie[];
  popular: TMDBMovie[];
  topRated: TMDBMovie[];
  upcoming: TMDBMovie[];
  nowPlaying: TMDBMovie[];
  genre: TMDBMovie[];
};

function HomeSkeleton() {
  return (
    <div className="bg-[#080810] min-h-screen">
      <div className="h-[72vh] min-h-[480px] bg-white/[0.04] animate-pulse" />

      <div className="px-4 md:px-10 -mt-8 md:-mt-20 space-y-10">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <div className="h-6 w-40 bg-white/10 rounded mb-4 animate-pulse" />

            <div className="flex gap-2 overflow-hidden">
              {Array.from({ length: 8 }).map((_, j) => (
                <div
                  key={j}
                  className="w-[150px] md:w-[180px] aspect-[2/3] rounded-md bg-white/[0.06] animate-pulse flex-shrink-0"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showBanner, setShowBanner] = useState(false);
  const [visible, setVisible] = useState(false);

  const { activeGenre, favouriteMovie, setFavouriteMovie } =
    useContext(GenreContext)!;

  const [loading, setLoading] = useState(true);

  const [catalog, setCatalog] = useState<Catalog>({
    trending: [],
    popular: [],
    topRated: [],
    upcoming: [],
    nowPlaying: [],
    genre: [],
  });

  const isBrowseAll = activeGenre === "All";

  useEffect(() => {
   if(!isOnline){
    setShowBanner(true);
    setTimeout(() => setVisible(true),10)
   }else if(isOnline && showBanner){
    setVisible(true);
    setTimeout(() => setVisible(false), 2000);
    setTimeout(() => setShowBanner(false), 2500);
   }
  },[isOnline])

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    async function load() {
      try {
        if (isBrowseAll) {
          const results = await Promise.allSettled([
            fetchTrending(),
            fetchPopular(),
            fetchTopRated(),
            fetchUpcoming(),
            fetchNowPlaying(),
          ]);

          if (cancelled) return;

          setCatalog({
            trending:
              results[0].status === "fulfilled" ? results[0].value : [],
            popular:
              results[1].status === "fulfilled" ? results[1].value : [],
            topRated:
              results[2].status === "fulfilled" ? results[2].value : [],
            upcoming:
              results[3].status === "fulfilled" ? results[3].value : [],
            nowPlaying:
              results[4].status === "fulfilled" ? results[4].value : [],
            genre: [],
          });

          results.forEach((result, index) => {
            if (result.status === "rejected") {
              console.error("Movie API failed:", index, result.reason);
            }
          });
        } else {
          const genreId = GENRE_MAP[activeGenre];
          const genre = genreId ? await fetchByGenre(genreId) : [];

          if (!cancelled) {
            setCatalog({
              trending: genre,
              popular: [],
              topRated: [],
              upcoming: [],
              nowPlaying: [],
              genre,
            });
          }
        }
      } catch (error) {
        console.error("Home page movie load failed:", error);

        if (!cancelled) {
          setCatalog({
            trending: [],
            popular: [],
            topRated: [],
            upcoming: [],
            nowPlaying: [],
            genre: [],
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [activeGenre, isBrowseAll]);

  const heroMovies = useMemo(() => {
    const list = isBrowseAll ? catalog.trending : catalog.genre;
    return list.slice(0, 5);
  }, [catalog, isBrowseAll]);

  const myListAsTMDB: TMDBMovie[] = useMemo(
    () =>
      favouriteMovie.map((m) => ({
        id: m.id,
        title: m.title,
        overview: m.overview,
        poster_path: m.poster_path,
        backdrop_path: m.backdrop_path,
        vote_average: m.vote_average,
        release_date: m.release_date,
        genre_ids: m.genres?.map((g) => g.id) ?? [],
      })),
    [favouriteMovie]
  );

  const inList = (id: number) => favouriteMovie.some((m) => m.id === id);

  const handleAddToList = async (movie: TMDBMovie) => {
    if (inList(movie.id)) {
      setFavouriteMovie(favouriteMovie.filter((m) => m.id !== movie.id));
      return;
    }

    try {
      const { data } = await getMovies(String(movie.id));
      setFavouriteMovie([...favouriteMovie, data]);
    } catch {
      /* ignore */
    }
  };

  if (loading) return <HomeSkeleton />;

  const hasContent = isBrowseAll
    ? catalog.trending.length > 0 ||
      catalog.popular.length > 0 ||
      catalog.topRated.length > 0 ||
      catalog.upcoming.length > 0 ||
      catalog.nowPlaying.length > 0
    : catalog.genre.length > 0;

  if (!hasContent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-[#080810] text-white">
        <h1 className="text-6xl font-bold text-white/10 mb-4">Oops!</h1>

        <h2 className="text-2xl font-semibold">Nothing to watch here</h2>

        <p className="mt-3 text-white/40">
          No movies found for {activeGenre}.
        </p>
      </div>
    );
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="bg-[#080810] min-h-screen text-white -mt-0 netflix-home">
        <HeroBanner
          movies={heroMovies}
          onAddToList={handleAddToList}
          inList={inList}
        />

        <div className="relative z-10 -mt-8 md:-mt-24 pb-16 space-y-2">
          {myListAsTMDB.length > 0 && (
            <MovieRow title="My List" movies={myListAsTMDB} />
          )}

          {isBrowseAll ? (
            <div>
              <MovieRow title="Trending Now" movies={catalog.trending} />
              <MovieRow title="Popular on Flickr" movies={catalog.popular} />
              <MovieRow title="Top Rated" movies={catalog.topRated} />
              <MovieRow title="Now Playing" movies={catalog.nowPlaying} />
              <MovieRow title="Coming Soon" movies={catalog.upcoming} />
            </div>
          ) : (
            <MovieRow title={`${activeGenre} Movies`} movies={catalog.genre} />
          )}
        </div>
        {showBanner && (
  <div className={`fixed top-8 right-6 transition-all duration-500 ease-in-out
    ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-24'}
    ${isOnline ? 'bg-green-600' : 'bg-red-500'}
    px-4 h-10 rounded-lg text-white text-sm font-medium
    flex items-center gap-2 shadow-lg z-50`}
  >
    <span>{isOnline ? '✅' : '⚠️'}</span>
    {isOnline ? 'Back online!' : 'No internet'}
  </div>
)}
      </div>
    </>
  );
}