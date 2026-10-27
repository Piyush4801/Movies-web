import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, Check, Info, Star } from 'lucide-react';
import type { Movie } from '../../types/movie';
import { useWatchlist } from '../../context/WatchlistContext';

interface MovieCardProps {
  movie: Movie;
  rank?: number;
  onOpenModal: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, rank, onOpenModal }) => {
  const navigate = useNavigate();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  const title = movie.title || movie.name || 'Untitled';
  const year = movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4);

  const handleCardClick = () => {
    onOpenModal(movie);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/watch/${movie.media_type}/${movie.id}`);
  };

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWatchlist(movie);
  };

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenModal(movie);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group relative flex items-center cursor-pointer select-none transition-all duration-300 ${
        rank ? 'flex-shrink-0 mr-4 md:mr-6' : 'flex-shrink-0'
      }`}
    >
      {/* Big Rank Number for Top 10 rows (pikamovie style) */}
      {rank !== undefined && (
        <div className="relative -mr-6 md:-mr-10 z-10 pointer-events-none">
          <span className="rank-number">{rank}</span>
        </div>
      )}

      {/* Poster Wrapper */}
      <div
        className={`relative rounded-xl overflow-hidden bg-[#141720] border border-white/5 transition-all duration-300 group-hover:scale-105 group-hover:border-white/20 group-hover:shadow-card group-hover:z-20 ${
          rank
            ? 'w-[145px] sm:w-[170px] md:w-[195px] aspect-[2/3]'
            : 'w-[145px] sm:w-[170px] md:w-[195px] aspect-[2/3]'
        }`}
      >
        {/* Poster Image */}
        <img
          src={movie.poster_path}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Bottom Shading Overlay */}
        <div className="absolute inset-0 card-shade pointer-events-none" />

        {/* Optional Logo overlay if present */}
        {movie.logo_path ? (
          <div className="absolute bottom-2.5 left-2 right-2 flex justify-center pointer-events-none z-10 px-1">
            <img
              src={movie.logo_path}
              alt={title}
              loading="lazy"
              className="max-h-10 max-w-full object-contain drop-shadow-md"
            />
          </div>
        ) : (
          <div className="absolute bottom-2 left-2 right-2 pointer-events-none z-10">
            <h4 className="text-xs font-semibold text-white drop-shadow-md truncate">
              {title}
            </h4>
            {year && <p className="text-[10px] text-slate-300">{year}</p>}
          </div>
        )}

        {/* Top Badges (Rating) */}
        {movie.vote_average > 0 && (
          <div className="absolute top-2 right-2 bg-black/65 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-bold text-amber-300 flex items-center gap-0.5 z-10">
            <Star className="w-2.5 h-2.5 fill-current" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        )}

        {/* Hover Quick Actions Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3 z-20">
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/10 backdrop-blur-md text-slate-200">
              {movie.media_type}
            </span>
            <button
              onClick={handleWatchlistClick}
              title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                inWatchlist
                  ? 'bg-[#ffd83a] text-black'
                  : 'bg-black/60 text-white hover:bg-white/20'
              }`}
            >
              {inWatchlist ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-semibold text-white line-clamp-1">{title}</p>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePlayClick}
                className="flex-1 py-1.5 px-2 rounded-lg bg-[#ffd83a] text-black font-bold text-xs flex items-center justify-center gap-1 hover:bg-[#ffdf5d] transition-colors shadow-glow-subtle"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play</span>
              </button>
              <button
                onClick={handleInfoClick}
                className="w-7 h-7 rounded-lg bg-white/15 text-white flex items-center justify-center hover:bg-white/25 transition-colors"
                title="More details"
              >
                <Info className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
