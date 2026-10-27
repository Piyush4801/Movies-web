import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Movie } from '../types/movie';

interface WatchlistContextType {
  watchlist: Movie[];
  recentlyWatched: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  toggleWatchlist: (movie: Movie) => void;
  isInWatchlist: (movieId: number) => boolean;
  addToRecentlyWatched: (movie: Movie) => void;
  clearWatchlist: () => void;
}

const defaultWatchlistContext: WatchlistContextType = {
  watchlist: [],
  recentlyWatched: [],
  addToWatchlist: () => {},
  removeFromWatchlist: () => {},
  toggleWatchlist: () => {},
  isInWatchlist: () => false,
  addToRecentlyWatched: () => {},
  clearWatchlist: () => {}
};

const WatchlistContext = createContext<WatchlistContextType>(defaultWatchlistContext);

const WATCHLIST_STORAGE_KEY = 'pikamovie_watchlist_v1';
const RECENTLY_WATCHED_KEY = 'pikamovie_recently_watched_v1';

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>(() => {
    try {
      const stored = localStorage.getItem(WATCHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [recentlyWatched, setRecentlyWatched] = useState<Movie[]>(() => {
    try {
      const stored = localStorage.getItem(RECENTLY_WATCHED_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(watchlist));
    } catch (e) {
      console.error('Failed to save watchlist to localStorage', e);
    }
  }, [watchlist]);

  useEffect(() => {
    try {
      localStorage.setItem(RECENTLY_WATCHED_KEY, JSON.stringify(recentlyWatched));
    } catch (e) {
      console.error('Failed to save recently watched to localStorage', e);
    }
  }, [recentlyWatched]);

  const addToWatchlist = (movie: Movie) => {
    setWatchlist(prev => {
      if (prev.some(item => item.id === movie.id)) return prev;
      return [movie, ...prev];
    });
  };

  const removeFromWatchlist = (movieId: number) => {
    setWatchlist(prev => prev.filter(item => item.id !== movieId));
  };

  const toggleWatchlist = (movie: Movie) => {
    if (watchlist.some(item => item.id === movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const isInWatchlist = (movieId: number) => {
    return watchlist.some(item => item.id === movieId);
  };

  const addToRecentlyWatched = (movie: Movie) => {
    setRecentlyWatched(prev => {
      const filtered = prev.filter(m => m.id !== movie.id);
      return [movie, ...filtered.slice(0, 19)]; // keep max 20
    });
  };

  const clearWatchlist = () => {
    setWatchlist([]);
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        recentlyWatched,
        addToWatchlist,
        removeFromWatchlist,
        toggleWatchlist,
        isInWatchlist,
        addToRecentlyWatched,
        clearWatchlist
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  return context || defaultWatchlistContext;
};
