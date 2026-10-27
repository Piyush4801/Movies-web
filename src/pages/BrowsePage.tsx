import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Film, Tv, Sparkles, Loader2, ArrowUpDown } from 'lucide-react';
import type { Movie, MediaType } from '../types/movie';
import { api } from '../services/api';
import { GENRES, ALL_COMBINED_MOVIES, TOP_10_HINDI_SERIES, ANIME_HITS, MORE_HINDI_MOVIES } from '../data/mockData';
import { MovieCard } from '../components/common/MovieCard';
import { MovieModal } from '../components/common/MovieModal';

export const BrowsePage: React.FC = () => {
  const location = useLocation();

  // Determine mediaType based on path
  const mediaType: MediaType = location.pathname.includes('/tv')
    ? 'tv'
    : location.pathname.includes('/anime')
    ? 'anime'
    : 'movie';

  const initialItems = mediaType === 'tv' ? TOP_10_HINDI_SERIES : (mediaType === 'anime' ? ANIME_HITS : MORE_HINDI_MOVIES);
  const [items, setItems] = useState<Movie[]>(initialItems);
  const [selectedGenre, setSelectedGenre] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('popularity.desc');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const titleConfig = {
    movie: { title: 'Movies', icon: Film, desc: 'Explore trending blockbuster movies and regional cinema.' },
    tv: { title: 'TV Shows', icon: Tv, desc: 'Binge-watch top rated serials, dramas, and mystery thrillers.' },
    anime: { title: 'Anime', icon: Sparkles, desc: 'Stream beloved Japanese anime series and feature films.' }
  }[mediaType];

  const Icon = titleConfig.icon;

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      setIsLoading(true);
      try {
        let results: Movie[] = [];
        if (mediaType === 'movie') {
          results = await api.getBrowseMovies(selectedGenre, sortBy);
        } else if (mediaType === 'tv') {
          results = await api.getBrowseTV(selectedGenre, sortBy);
        } else {
          results = await api.getAnimeList();
        }

        // Apply local sort if needed
        if (sortBy === 'vote_average.desc') {
          results = [...results].sort((a, b) => b.vote_average - a.vote_average);
        } else if (sortBy === 'release_date.desc') {
          results = [...results].sort((a, b) => {
            const dateA = a.release_date || a.first_air_date || '';
            const dateB = b.release_date || b.first_air_date || '';
            return dateB.localeCompare(dateA);
          });
        }

        if (isMounted) {
          setItems(results);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error fetching category items:', err);
        if (isMounted) setIsLoading(false);
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [mediaType, selectedGenre, sortBy]);

  return (
    <div className="w-full min-h-screen bg-[#08090b] text-white pt-24 pb-24 px-4 md:px-12 md:pl-28">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#ffd83a]/15 text-[#ffd83a] border border-[#ffd83a]/30 flex items-center justify-center">
            <Icon className="w-5 h-5" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {titleConfig.title}
          </h1>
        </div>
        <p className="text-sm text-slate-400">{titleConfig.desc}</p>
      </div>

      {/* Filter and Sort Bar */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        {/* Genre Pill Selector */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto py-1">
          {GENRES.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGenre(g.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedGenre === g.id
                  ? 'bg-[#ffd83a] text-black shadow-glow-subtle'
                  : 'bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-end md:self-auto bg-[#141722] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-300">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#ffd83a]" />
          <span className="text-slate-400">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
          >
            <option value="popularity.desc" className="bg-[#141722] text-white">Popularity</option>
            <option value="vote_average.desc" className="bg-[#141722] text-white">Highest Rated</option>
            <option value="release_date.desc" className="bg-[#141722] text-white">Newest First</option>
          </select>
        </div>
      </div>

      {/* Grid Content */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="w-8 h-8 text-[#ffd83a] animate-spin" />
            <p className="text-sm">Fetching catalog...</p>
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
            {items.map((movie) => (
              <div key={`${movie.media_type}-${movie.id}`} className="flex justify-center">
                <MovieCard
                  movie={movie}
                  onOpenModal={(m) => setSelectedMovie(m)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-lg font-medium text-slate-300 mb-2">No titles found in this category.</p>
            <button
              onClick={() => setSelectedGenre(0)}
              className="px-4 py-2 rounded-xl bg-[#ffd83a] text-black font-semibold text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Global Movie Modal */}
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
};
