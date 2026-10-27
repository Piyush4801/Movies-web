import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Movie } from '../../types/movie';
import { MovieCard } from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  isRanked?: boolean;
  onOpenModal: (movie: Movie) => void;
}

export const MovieRow: React.FC<MovieRowProps> = ({
  title,
  movies,
  isRanked = false,
  onOpenModal,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section className="relative py-4 md:py-6 group/row select-none">
      {/* Row Header */}
      <div className="px-4 md:px-12 md:pl-28 mb-3 flex items-center justify-between">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          {title}
        </h2>
      </div>

      {/* Relative container for track and scroll buttons */}
      <div className="relative">
        {/* Scroll Left Button */}
        {canScrollLeft && (
          <button
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
            className="absolute left-2 md:left-24 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/10 text-white flex items-center justify-center z-30 transition-all opacity-0 group-hover/row:opacity-100 hover:scale-110 active:scale-95 shadow-xl"
          >
            <ChevronLeft className="w-6 h-6 -ml-0.5" />
          </button>
        )}

        {/* Scrollable Track */}
        <div
          ref={rowRef}
          onScroll={checkScroll}
          className="flex items-center gap-3 md:gap-4 overflow-x-auto no-scrollbar px-4 md:px-12 md:pl-28 py-2 scroll-smooth"
        >
          {movies.map((movie, idx) => (
            <MovieCard
              key={`${movie.media_type}-${movie.id}-${idx}`}
              movie={movie}
              rank={isRanked ? (movie.rank || idx + 1) : undefined}
              onOpenModal={onOpenModal}
            />
          ))}
        </div>

        {/* Scroll Right Button */}
        {canScrollRight && (
          <button
            onClick={() => handleScroll('right')}
            aria-label="Scroll right"
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/10 text-white flex items-center justify-center z-30 transition-all opacity-0 group-hover/row:opacity-100 hover:scale-110 active:scale-95 shadow-xl"
          >
            <ChevronRight className="w-6 h-6 -mr-0.5" />
          </button>
        )}
      </div>
    </section>
  );
};
