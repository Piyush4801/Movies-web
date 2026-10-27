import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Plus, Check, Star, ArrowLeft, Share2, Calendar, Clock, Film, Loader2, Sparkles, ExternalLink } from 'lucide-react';
import type { Movie, MediaType } from '../types/movie';
import { api } from '../services/api';
import { useWatchlist } from '../context/WatchlistContext';
import { MovieRow } from '../components/common/MovieRow';
import { MovieModal } from '../components/common/MovieModal';
import { ALL_COMBINED_MOVIES } from '../data/mockData';
import { getNxshaWatchUrl } from '../services/nxsha';

export const TitleDetailPage: React.FC = () => {
  const { mediaType = 'movie', id = '' } = useParams<{ mediaType: MediaType; id: string }>();
  const navigate = useNavigate();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadMovie() {
      setIsLoading(true);
      window.scrollTo(0, 0);
      try {
        const data = await api.getDetails(mediaType, id);
        if (isMounted) {
          setMovie(data);
          // Set recommendations
          const recs = ALL_COMBINED_MOVIES.filter(m => m.id !== Number(id)).slice(0, 10);
          setRecommendations(recs);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to load title details', err);
        if (isMounted) setIsLoading(false);
      }
    }
    loadMovie();
    return () => {
      isMounted = false;
    };
  }, [mediaType, id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#08090b] text-white">
        <Loader2 className="w-10 h-10 text-[#ffd83a] animate-spin mb-3" />
        <p className="text-sm text-slate-400 font-medium">Loading Title Details...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#08090b] text-white p-4">
        <h2 className="text-2xl font-bold mb-2">Title Not Found</h2>
        <p className="text-slate-400 mb-6">The requested title could not be found.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 rounded-xl bg-[#ffd83a] text-black font-bold"
        >
          Return Home
        </button>
      </div>
    );
  }

  const inWatchlist = isInWatchlist(movie.id);
  const title = movie.title || movie.name || 'Untitled';
  const releaseYear = movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4) || '2026';
  const mediaLabel = movie.media_type === 'tv' ? 'TV Show' : (movie.media_type === 'anime' ? 'Anime' : 'Movie');

  const currentSeason = movie.seasons?.find(s => s.season_number === selectedSeason) || movie.seasons?.[0];

  return (
    <div className="w-full min-h-screen bg-[#08090b] text-white pb-24">
      {/* Top Hero Banner */}
      <div className="relative w-full h-[60vh] md:h-[70vh] min-h-[420px] overflow-hidden">
        <img
          src={movie.backdrop_path || movie.poster_path}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-[#08090b]/70 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090b] via-transparent to-transparent hidden md:block" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 md:left-28 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white transition-all text-xs font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Details Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 md:pl-28 -mt-36 md:-mt-52 relative z-20">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Poster Card */}
          <div className="w-44 sm:w-56 md:w-64 flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#11131a]">
            <img
              src={movie.poster_path}
              alt={title}
              className="w-full aspect-[2/3] object-cover"
            />
          </div>

          {/* Details Content */}
          <div className="flex-1 space-y-4">
            <div>
              {movie.tagline && (
                <p className="text-xs uppercase tracking-widest text-[#ffd83a] font-semibold mb-1">
                  {movie.tagline}
                </p>
              )}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {title}
              </h1>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-300">
              <span className="flex items-center gap-1 font-bold text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                <Star className="w-3.5 h-3.5 fill-current" />
                {movie.vote_average.toFixed(1)} / 10
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {releaseYear}
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full">
                <Film className="w-3.5 h-3.5 text-slate-400" />
                {mediaLabel}
              </span>
              {movie.runtime && (
                <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {movie.runtime} min
                </span>
              )}
              <span className="px-2 py-0.5 rounded border border-white/20 text-[10px] font-bold text-slate-300">
                Ultra HD 4K
              </span>
              <span className="px-2 py-0.5 rounded border border-white/20 text-[10px] font-bold text-slate-300">
                5.1 Audio
              </span>
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map(g => (
                  <span
                    key={g.id}
                    className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-slate-300"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            {/* Synopsis */}
            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-light max-w-3xl pt-2">
              {movie.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => navigate(`/watch/${movie.media_type}/${movie.id}`)}
                className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#ffd83a] hover:bg-[#ffdf5d] text-black font-extrabold text-base shadow-glow hover:scale-105 active:scale-95 transition-all"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Watch Now</span>
              </button>

              <button
                onClick={() => toggleWatchlist(movie)}
                className={`flex items-center gap-2 px-5 py-3.5 rounded-xl border font-semibold text-sm transition-all hover:scale-105 active:scale-95 backdrop-blur-md ${
                  inWatchlist
                    ? 'bg-[#ffd83a]/20 border-[#ffd83a] text-[#ffd83a]'
                    : 'bg-white/10 border-white/15 text-white hover:bg-white/20'
                }`}
              >
                {inWatchlist ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                <span>{inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}</span>
              </button>

              <a
                href={getNxshaWatchUrl(movie.media_type, movie.id, selectedSeason, 1)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-sm transition-all hover:scale-105 active:scale-95 backdrop-blur-md"
                title="Open on web.nxsha.app"
              >
                <Sparkles className="w-4 h-4 text-[#ffd83a]" />
                <span>Open on Nxsha</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <button
                onClick={handleShare}
                className="p-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all hover:scale-105 active:scale-95"
                title="Share link"
              >
                <Share2 className="w-5 h-5" />
              </button>
              {copied && <span className="text-xs text-[#ffd83a] font-medium">Link copied!</span>}
            </div>
          </div>
        </div>

        {/* TV Series Season & Episode Selector */}
        {movie.seasons && movie.seasons.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">Episodes</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Season:</span>
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(Number(e.target.value))}
                  className="bg-[#141722] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#ffd83a]"
                >
                  {movie.seasons.map(s => (
                    <option key={s.id} value={s.season_number}>
                      Season {s.season_number}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Episode List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentSeason?.episodes && currentSeason.episodes.length > 0 ? (
                currentSeason.episodes.map(ep => (
                  <div
                    key={ep.id}
                    onClick={() => navigate(`/watch/tv/${movie.id}?season=${ep.season_number}&episode=${ep.episode_number}`)}
                    className="group cursor-pointer rounded-xl bg-[#12141c] hover:bg-[#1a1d29] border border-white/5 hover:border-white/20 p-3 transition-all flex gap-3.5 items-center"
                  >
                    <div className="relative w-28 aspect-video rounded-lg overflow-hidden bg-slate-800 flex-shrink-0">
                      <img
                        src={ep.still_path || movie.backdrop_path}
                        alt={ep.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                        <Play className="w-5 h-5 text-white fill-current group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#ffd83a] uppercase">Episode {ep.episode_number}</span>
                      <h4 className="text-xs font-semibold text-white truncate group-hover:text-[#ffd83a] transition-colors">{ep.name}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{ep.overview}</p>
                    </div>
                  </div>
                ))
              ) : (
                [1, 2, 3, 4, 5, 6].map(num => (
                  <div
                    key={num}
                    onClick={() => navigate(`/watch/tv/${movie.id}?season=${selectedSeason}&episode=${num}`)}
                    className="group cursor-pointer rounded-xl bg-[#12141c] hover:bg-[#1a1d29] border border-white/5 hover:border-white/20 p-3 transition-all flex gap-3.5 items-center"
                  >
                    <div className="relative w-28 aspect-video rounded-lg overflow-hidden bg-slate-800 flex-shrink-0">
                      <img
                        src={movie.backdrop_path}
                        alt={`Episode ${num}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                        <Play className="w-5 h-5 text-white fill-current group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#ffd83a] uppercase">Episode {num}</span>
                      <h4 className="text-xs font-semibold text-white truncate group-hover:text-[#ffd83a] transition-colors">
                        Part {num}: Unfolding Mysteries
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">45m • Investigation continues</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Cast & Crew Section */}
        {movie.cast && movie.cast.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/10">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Cast &amp; Characters</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {movie.cast.map(c => (
                <div key={c.id} className="p-3 rounded-xl bg-[#12141c] border border-white/5 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-slate-800 overflow-hidden mb-2 border border-white/10 flex items-center justify-center">
                    {c.profile_path ? (
                      <img src={c.profile_path} alt={c.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-bold text-base text-[#ffd83a]">{c.name.charAt(0)}</span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-white truncate w-full">{c.name}</p>
                  <p className="text-[10px] text-slate-400 truncate w-full">{c.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* More Like This Recommendations */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <MovieRow
            title="More Like This"
            movies={recommendations}
            onOpenModal={(m) => setSelectedMovie(m)}
          />
        </div>
      </div>

      {/* Global Movie Modal */}
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
};
