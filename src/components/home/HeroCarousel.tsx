import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Info, ChevronLeft, ChevronRight, Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Movie } from '../../types/movie';
import { useWatchlist } from '../../context/WatchlistContext';

interface HeroCarouselProps {
  movies: Movie[];
  onOpenModal: (movie: Movie) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ movies, onOpenModal }) => {
  const navigate = useNavigate();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = movies.length;
  const currentMovie = movies[currentIndex] || movies[0];

  // Auto rotation every 7 seconds
  useEffect(() => {
    if (isPaused || total <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 7000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isPaused, total]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  if (!currentMovie) return null;

  const releaseYear =
    currentMovie.release_date?.slice(0, 4) ||
    currentMovie.first_air_date?.slice(0, 4) ||
    '2026';

  const mediaLabel = currentMovie.media_type === 'tv' ? 'TV Show' : 'Movie';
  const inWatchlist = isInWatchlist(currentMovie.id);

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[85vh] md:h-[90vh] min-h-[580px] max-h-[920px] overflow-hidden select-none bg-black"
    >
      {/* Background Image with Fade Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMovie.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${currentMovie.backdrop_path})`,
          }}
        />
      </AnimatePresence>

      {/* Cinematic Dark Shading Overlays */}
      <div className="absolute inset-0 hero-gradient-overlay pointer-events-none" />
      <div className="absolute inset-0 hero-gradient-left pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

      {/* Content Positioned Toward Bottom-Left */}
      <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-16 md:pl-28 max-w-4xl z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMovie.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-start gap-3 md:gap-4"
          >
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg leading-tight font-sans">
              {currentMovie.title || currentMovie.name}
            </h1>

            {/* Metadata Pills matching pikamovie */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold">
                {releaseYear}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold">
                {mediaLabel}
              </span>
              {currentMovie.vote_average > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1">
                  ★ {currentMovie.vote_average.toFixed(1)}
                </span>
              )}
              {currentMovie.genres && currentMovie.genres.length > 0 && (
                <span className="hidden sm:inline-flex text-xs text-slate-300 font-medium">
                  {currentMovie.genres.map((g) => g.name).join(' • ')}
                </span>
              )}
            </div>

            {/* Overview description */}
            <p className="text-slate-200/90 text-sm sm:text-base leading-relaxed line-clamp-3 max-w-2xl text-shadow font-normal">
              {currentMovie.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Play Button */}
              <button
                onClick={() => navigate(`/watch/${currentMovie.media_type}/${currentMovie.id}`)}
                className="flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-xl bg-[#ffd83a] hover:bg-[#ffdf5d] text-[#08090b] font-bold text-sm sm:text-base shadow-glow hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Play</span>
              </button>

              {/* More Info Button */}
              <button
                onClick={() => onOpenModal(currentMovie)}
                className="flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white font-semibold text-sm sm:text-base hover:scale-105 active:scale-95 transition-all"
              >
                <Info className="w-5 h-5" />
                <span>More Info</span>
              </button>

              {/* Watchlist Toggle */}
              <button
                onClick={() => toggleWatchlist(currentMovie)}
                title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                className={`p-3 rounded-xl border backdrop-blur-md transition-all hover:scale-105 active:scale-95 ${
                  inWatchlist
                    ? 'bg-[#ffd83a]/20 border-[#ffd83a] text-[#ffd83a]'
                    : 'bg-white/10 border-white/15 text-white hover:bg-white/20'
                }`}
              >
                {inWatchlist ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Previous Carousel Button */}
      <button
        onClick={handlePrev}
        aria-label="Previous slide"
        className="absolute left-3 md:left-24 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md border border-white/10 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-30"
      >
        <ChevronLeft className="w-6 h-6 -ml-0.5" />
      </button>

      {/* Next Carousel Button */}
      <button
        onClick={handleNext}
        aria-label="Next slide"
        className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md border border-white/10 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-30"
      >
        <ChevronRight className="w-6 h-6 -mr-0.5" />
      </button>

      {/* Pagination Indicator Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2 z-30 pointer-events-auto">
        {movies.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? 'w-7 h-2 bg-[#ffd83a] shadow-glow-subtle'
                : 'w-2 h-2 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
