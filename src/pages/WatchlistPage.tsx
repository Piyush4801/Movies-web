import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, Clock, Trash2 } from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';
import { MovieCard } from '../components/common/MovieCard';
import { MovieModal } from '../components/common/MovieModal';
import type { Movie } from '../types/movie';

export const WatchlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { watchlist, recentlyWatched, clearWatchlist } = useWatchlist();
  const [activeTab, setActiveTab] = useState<'watchlist' | 'history'>('watchlist');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const currentList = activeTab === 'watchlist' ? watchlist : recentlyWatched;

  return (
    <div className="w-full min-h-screen bg-[#08090b] text-white pt-24 pb-24 px-4 md:px-12 md:pl-28">
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          My Space
        </h1>
        <p className="text-sm text-slate-400">
          Manage your saved watchlist and pick up where you left off.
        </p>
      </div>

      {/* Tabs and Actions Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('watchlist')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'watchlist'
                ? 'bg-[#ffd83a] text-black shadow-glow-subtle'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Watchlist</span>
            <span className={`text-xs px-1.5 py-0.2 rounded-full ${
              activeTab === 'watchlist' ? 'bg-black/20 text-black' : 'bg-white/10 text-white'
            }`}>
              {watchlist.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'history'
                ? 'bg-[#ffd83a] text-black shadow-glow-subtle'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Recently Watched</span>
            <span className={`text-xs px-1.5 py-0.2 rounded-full ${
              activeTab === 'history' ? 'bg-black/20 text-black' : 'bg-white/10 text-white'
            }`}>
              {recentlyWatched.length}
            </span>
          </button>
        </div>

        {activeTab === 'watchlist' && watchlist.length > 0 && (
          <button
            onClick={clearWatchlist}
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 px-3 py-1.5 rounded-lg border border-rose-500/20 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Watchlist</span>
          </button>
        )}
      </div>

      {/* Movie Grid or Empty State */}
      <div className="max-w-7xl mx-auto">
        {currentList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
            {currentList.map((movie) => (
              <div key={`${movie.media_type}-${movie.id}`} className="flex justify-center">
                <MovieCard
                  movie={movie}
                  onOpenModal={(m) => setSelectedMovie(m)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center max-w-md mx-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 mb-4">
              {activeTab === 'watchlist' ? <Bookmark className="w-8 h-8" /> : <Clock className="w-8 h-8" />}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {activeTab === 'watchlist' ? 'Your Watchlist is Empty' : 'No Watch History Yet'}
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              {activeTab === 'watchlist'
                ? 'Save your favorite movies and shows to watch them whenever you want.'
                : 'Start streaming your favorite movies and shows to see your watch history here.'}
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2.5 rounded-xl bg-[#ffd83a] text-black font-bold text-sm shadow-glow hover:scale-105 active:scale-95 transition-all"
            >
              Browse Trending
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
