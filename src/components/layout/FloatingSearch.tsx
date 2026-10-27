import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Star, Play, Film, Tv, Sparkles, Loader2 } from 'lucide-react';
import type { Movie, MediaType } from '../../types/movie';
import { api } from '../../services/api';

interface FloatingSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onSelectMovie?: (movie: Movie) => void;
}

export const FloatingSearch: React.FC<FloatingSearchProps> = ({
  isOpen,
  onClose,
  onOpen,
  onSelectMovie
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<MediaType | 'all'>('all');
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onOpen();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onOpen, onClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Debounced search
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
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, filter]);

  const handleItemClick = (movie: Movie) => {
    onClose();
    if (onSelectMovie) {
      onSelectMovie(movie);
    } else {
      navigate(`/title/${movie.media_type}/${movie.id}`);
    }
  };

  const handlePlayClick = (e: React.MouseEvent, movie: Movie) => {
    e.stopPropagation();
    onClose();
    navigate(`/watch/${movie.media_type}/${movie.id}`);
  };

  return (
    <>
      {/* Floating Centered Trigger Bar matching pikamovie */}
      <div className="absolute top-6 left-0 right-0 z-30 flex justify-center pointer-events-none px-4 md:pl-20">
        <button
          onClick={onOpen}
          aria-label="Search movies and shows"
          className="pointer-events-auto flex items-center justify-between gap-3 w-full max-w-[420px] md:max-w-[480px] px-4 py-2.5 rounded-full bg-[#161821]/70 hover:bg-[#1f2230]/85 backdrop-blur-xl border border-white/10 hover:border-white/25 text-slate-400 hover:text-white transition-all shadow-xl group"
        >
          <div className="flex items-center gap-3">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-[#ffd83a] transition-colors" />
            <span className="text-sm font-light text-slate-300">Search movies &amp; shows…</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-400">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Fullscreen / Modal Search Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center pt-8 md:pt-16 px-4 animate-in fade-in duration-200"
          onClick={onClose}
        >
          <div
            className="w-full max-w-3xl bg-[#0e1017] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input Header */}
            <div className="p-4 md:p-5 border-b border-white/10 flex items-center gap-3 bg-[#131620]">
              <Search className="w-5 h-5 text-[#ffd83a]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to search movies, series, anime, actors..."
                className="flex-1 bg-transparent border-none text-white text-base md:text-lg focus:outline-none placeholder-slate-500 font-sans"
              />
              {isLoading && <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />}
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="text-xs font-medium text-slate-400 hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="px-4 py-2.5 border-b border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar bg-[#0b0c11]">
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
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-[#ffd83a] text-black shadow-glow-subtle font-semibold'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Results Container */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
              {isLoading ? (
                <div className="py-16 flex flex-col items-center justify-center text-slate-500 gap-3">
                  <Loader2 className="w-8 h-8 text-[#ffd83a] animate-spin" />
                  <p className="text-sm">Searching titles...</p>
                </div>
              ) : results.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {results.map((movie) => (
                    <div
                      key={`${movie.media_type}-${movie.id}`}
                      onClick={() => handleItemClick(movie)}
                      className="group cursor-pointer rounded-xl bg-[#141722] hover:bg-[#1a1e2d] border border-white/5 hover:border-white/20 p-2 transition-all flex flex-col"
                    >
                      <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden bg-slate-900 mb-2">
                        <img
                          src={movie.poster_path}
                          alt={movie.title || movie.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            onClick={(e) => handlePlayClick(e, movie)}
                            title="Play Now"
                            className="w-10 h-10 rounded-full bg-[#ffd83a] text-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                          >
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </button>
                        </div>
                        {movie.vote_average > 0 && (
                          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded text-[11px] font-semibold text-amber-400">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{movie.vote_average.toFixed(1)}</span>
                          </div>
                        )}
                        <span className="absolute bottom-2 left-2 uppercase text-[9px] tracking-wider font-bold px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-slate-300">
                          {movie.media_type}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-[#ffd83a] transition-colors truncate">
                        {movie.title || movie.name}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4) || 'Trending'}
                      </p>
                    </div>
                  ))}
                </div>
              ) : query.trim() ? (
                <div className="py-16 text-center text-slate-500">
                  <p className="text-base text-slate-300 font-medium mb-1">No results found for "{query}"</p>
                  <p className="text-sm">Try searching for "Mirzapur", "C.I.D.", "Dhurandhar", or "3 Idiots"</p>
                </div>
              ) : (
                <div className="py-8">
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                    Popular Searches
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {['Reporting Live', 'C.I.D.', 'Drishyam: The Conclusion', '3 Idiots', 'Mirzapur', 'War 2', 'Animal', 'Attack on Titan'].map(
                      (tag) => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-slate-300 hover:text-white transition-colors"
                        >
                          {tag}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
