import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Movie } from '../types/movie';
import { HeroCarousel } from '../components/home/HeroCarousel';
import { MovieRow } from '../components/common/MovieRow';
import { MovieModal } from '../components/common/MovieModal';
import { Loader2, Film } from 'lucide-react';
import {
  HERO_MOVIES,
  TOP_10_HINDI_MOVIES,
  TOP_10_HINDI_SERIES,
  MORE_HINDI_MOVIES,
  NEW_AND_SOUTH_RELEASES,
  ANIME_HITS
} from '../data/mockData';

export const HomePage: React.FC = () => {
  const [heroMovies, setHeroMovies] = useState<Movie[]>(HERO_MOVIES);
  const [top10Movies, setTop10Movies] = useState<Movie[]>(TOP_10_HINDI_MOVIES);
  const [top10Series, setTop10Series] = useState<Movie[]>(TOP_10_HINDI_SERIES);
  const [moreMovies, setMoreMovies] = useState<Movie[]>(MORE_HINDI_MOVIES);
  const [newReleases, setNewReleases] = useState<Movie[]>(NEW_AND_SOUTH_RELEASES);
  const [animeHits, setAnimeHits] = useState<Movie[]>(ANIME_HITS);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const [hero, topM, topS, moreM, newR, anime] = await Promise.all([
          api.getHeroMovies(),
          api.getTop10HindiMovies(),
          api.getTop10HindiSeries(),
          api.getMoreHindiMovies(),
          api.getNewReleases(),
          api.getAnimeList()
        ]);

        if (isMounted) {
          setHeroMovies(hero);
          setTop10Movies(topM);
          setTop10Series(topS);
          setMoreMovies(moreM);
          setNewReleases(newR);
          setAnimeHits(anime);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to load homepage data', err);
        if (isMounted) setIsLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#08090b] text-white">
        <Loader2 className="w-10 h-10 text-[#ffd83a] animate-spin mb-3" />
        <p className="text-sm text-slate-400 font-medium">Loading Movies.web...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#08090b] text-white pb-24">
      {/* Hero Carousel */}
      <HeroCarousel
        movies={heroMovies}
        onOpenModal={(movie) => setSelectedMovie(movie)}
      />

      {/* Rows overlapping the bottom gradient of hero */}
      <div className="-mt-12 md:-mt-20 relative z-20 space-y-4 md:space-y-6">
        {/* Top 10 Hindi Movies */}
        <MovieRow
          title="Top 10 Hindi Movies"
          movies={top10Movies}
          isRanked={true}
          onOpenModal={(movie) => setSelectedMovie(movie)}
        />

        {/* Top 10 Hindi Series */}
        <MovieRow
          title="Top 10 Hindi Series"
          movies={top10Series}
          isRanked={true}
          onOpenModal={(movie) => setSelectedMovie(movie)}
        />

        {/* More Hindi Movies */}
        <MovieRow
          title="More Hindi Movies"
          movies={moreMovies}
          onOpenModal={(movie) => setSelectedMovie(movie)}
        />

        {/* New Hindi Releases & South Blockbusters */}
        <MovieRow
          title="New Hindi Releases"
          movies={newReleases}
          onOpenModal={(movie) => setSelectedMovie(movie)}
        />

        {/* Anime Hits */}
        <MovieRow
          title="Popular Anime"
          movies={animeHits}
          onOpenModal={(movie) => setSelectedMovie(movie)}
        />
      </div>

      {/* Footer matching pikamovie style */}
      <footer className="mt-16 pt-12 pb-8 border-t border-white/5 text-center px-4 md:pl-28 text-slate-500 text-xs">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#ffd83a] to-[#ff9f0a] flex items-center justify-center">
              <Film className="w-3.5 h-3.5 text-black stroke-[2.5]" />
            </div>
            <span className="font-extrabold text-white text-sm tracking-wider">MOVIES<span className="text-[#ffd83a]">.WEB</span></span>
          </div>
          <p className="max-w-md text-slate-400">
            Movies.web does not host pirated media. Movie metadata and posters are provided by TMDB. Authorized streaming demos and licensed creative commons videos are provided for preview purposes.
          </p>
          <div className="flex items-center gap-4 text-slate-400 pt-2">
            <span>Terms of Service</span>
            <span>•</span>
            <span>Privacy Policy</span>
          </div>
          <p className="text-slate-600 mt-2">© 2026 Movies.web. All rights reserved.</p>
        </div>
      </footer>

      {/* Global Movie Modal */}
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
};
