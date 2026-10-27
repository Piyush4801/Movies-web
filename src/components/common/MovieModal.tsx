import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Play, Plus, Check, Star, ExternalLink, Calendar, Film, Sparkles } from 'lucide-react';
import type { Movie } from '../../types/movie';
import { useWatchlist } from '../../context/WatchlistContext';
import { getNxshaWatchUrl } from '../../services/nxsha';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  const navigate = useNavigate();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (movie) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [movie, onClose]);

  if (!movie) return null;

  const inWatchlist = isInWatchlist(movie.id);
  const title = movie.title || movie.name || 'Untitled';
  const releaseYear =
    movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4) || '2026';
  const mediaLabel = movie.media_type === 'tv' ? 'TV Show' : (movie.media_type === 'anime' ? 'Anime' : 'Movie');

  const handlePlay = () => {
    onClose();
    navigate(`/watch/${movie.media_type}/${movie.id}`);
  };

  const handleViewDetails = () => {
    onClose();
    navigate(`/title/${movie.media_type}/${movie.id}`);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#0e1017] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Backdrop Banner Header */}
        <div className="relative h-60 sm:h-80 w-full overflow-hidden bg-slate-900">
          <img
            src={movie.backdrop_path || movie.poster_path}
            alt={title}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-[#0e1017]/50 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-white/10 z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Quick Action Buttons over banner */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePlay}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#ffd83a] hover:bg-[#ffdf5d] text-black font-bold text-sm shadow-glow transition-all hover:scale-105 active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Play Now</span>
              </button>

              <button
                onClick={() => toggleWatchlist(movie)}
                className={`p-2.5 rounded-xl border backdrop-blur-md transition-all hover:scale-105 active:scale-95 ${
                  inWatchlist
                    ? 'bg-[#ffd83a]/20 border-[#ffd83a] text-[#ffd83a]'
                    : 'bg-white/10 border-white/15 text-white hover:bg-white/20'
                }`}
                title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
              >
                {inWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>

              <a
                href={getNxshaWatchUrl(movie.media_type, movie.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/60 hover:bg-black/90 text-white text-xs font-semibold backdrop-blur-md border border-white/10 transition-all hover:scale-105"
                title="Open on web.nxsha.app"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#ffd83a]" />
                <span>Nxsha</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>

            <button
              onClick={handleViewDetails}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/10 transition-all hover:scale-105"
            >
              <span>Full Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 custom-scrollbar">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
              {title}
            </h2>

            {/* Metadata Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mt-2.5 text-xs text-slate-300">
              <span className="flex items-center gap-1 font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                <Star className="w-3.5 h-3.5 fill-current" />
                {movie.vote_average.toFixed(1)} / 10
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {releaseYear}
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full">
                <Film className="w-3.5 h-3.5 text-slate-400" />
                {mediaLabel}
              </span>
              {movie.runtime && (
                <span className="bg-white/10 px-2 py-0.5 rounded-full">
                  {movie.runtime} min
                </span>
              )}
              <span className="border border-white/20 text-[10px] font-bold px-1.5 py-0.5 rounded text-slate-300">
                HD 1080p
              </span>
            </div>
          </div>

          {/* Genres pills */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {movie.genres.map((g) => (
                <span
                  key={g.id}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-slate-300"
                >
                  {g.name}
                </span>
              ))}
            </div>
          )}

          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Synopsis
            </h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              {movie.overview}
            </p>
          </div>

          {/* Cast Preview */}
          {movie.cast && movie.cast.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Starring
              </h4>
              <div className="flex flex-wrap gap-2">
                {movie.cast.map((actor) => (
                  <div
                    key={actor.id}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs text-white"
                  >
                    <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center font-bold text-[10px] text-amber-400">
                      {actor.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{actor.name}</p>
                      <p className="text-[10px] text-slate-400">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
