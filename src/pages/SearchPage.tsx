import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Film, Tv, Loader2 } from 'lucide-react';
import type { Movie, MediaType } from '../types/movie';
import { api } from '../services/api';
import { MovieCard } from '../components/common/MovieCard';
import { MovieModal } from '../components/common/MovieModal';

export const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<MediaType | 'all'>('all');
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const data = await api.search(query, filter);
        setResults(data);
      } catch (err) {
        console.error('Search page error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, filter]);

  return (
    <div className="w-full min-h-screen bg-[#08090b] text-white pt-24 pb-24 px-4 md:px-12 md:pl-28">
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          Search
        </h1>
        <p className="text-sm text-slate-400">
          Search across thousands of movies, TV shows, and anime.
        </p>
      </div>

      {/* Main Search Input */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ffd83a]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, genre, or keyword..."
            autoFocus
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#121520] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd83a] text-lg font-sans shadow-xl"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {[
          { id: 'all', label: 'All Results', icon: Sparkles },
          { id: 'movie', label: 'Movies', icon: Film },
          { id: 'tv', label: 'TV Shows', icon: Tv },
          { id: 'anime', label: 'Anime', icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as MediaType | 'all')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-[#ffd83a] text-black shadow-glow-subtle font-bold'
                  : 'bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="w-8 h-8 text-[#ffd83a] animate-spin" />
            <p className="text-sm">Searching titles...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
            {results.map((movie) => (
              <div key={`${movie.media_type}-${movie.id}`} className="flex justify-center">
                <MovieCard
                  movie={movie}
                  onOpenModal={(m) => setSelectedMovie(m)}
                />
              </div>
            ))}
          </div>
        ) : query.trim() ? (
          <div className="py-24 text-center">
            <p className="text-lg font-medium text-slate-300 mb-2">No results found for "{query}"</p>
            <p className="text-sm text-slate-500">Try searching with a different title or keyword.</p>
          </div>
        ) : (
          <div className="py-12">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Trending Searches
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {[
                'Reporting Live',
                'C.I.D.',
                'Drishyam: The Conclusion',
                '3 Idiots',
                'Mirzapur',
                'War 2',
                'Animal',
                'Ok Jaanu',
                'Attack on Titan',
                'Demon Slayer'
              ].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-sm text-slate-300 hover:text-white transition-all hover:scale-105"
                >
                  {tag}
                </button>
              ))}
            </div>
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
