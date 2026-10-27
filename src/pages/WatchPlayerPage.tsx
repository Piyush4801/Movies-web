import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import type { MediaType } from '../types/movie';
import { api } from '../services/api';
import { useWatchlist } from '../context/WatchlistContext';
import { getNxshaEmbedUrl } from '../services/nxsha';

export const WatchPlayerPage: React.FC = () => {
  const { mediaType = 'movie', id = '' } = useParams<{ mediaType: MediaType; id: string }>();
  const [searchParams] = useSearchParams();
  const seasonParam = Number(searchParams.get('season')) || 1;
  const episodeParam = Number(searchParams.get('episode')) || 1;

  const navigate = useNavigate();
  const { addToRecentlyWatched } = useWatchlist();

  const [showControls, setShowControls] = useState(true);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load movie details for recently watched history
  useEffect(() => {
    async function loadMovie() {
      try {
        const data = await api.getDetails(mediaType, id);
        if (data) {
          try {
            addToRecentlyWatched?.(data);
          } catch {
            // ignore storage error
          }
        }
      } catch {
        // ignore load error
      }
    }
    loadMovie();
  }, [mediaType, id]);

  const embedUrl = getNxshaEmbedUrl(mediaType, id, seasonParam, episodeParam);

  // Auto-hide back button on idle
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen bg-black overflow-hidden select-none"
    >
      {/* Loading state indicator */}
      {isIframeLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10 pointer-events-none">
          <Loader2 className="w-10 h-10 text-[#ffd83a] animate-spin mb-3" />
          <p className="text-sm text-slate-400 font-medium">Loading Player...</p>
        </div>
      )}

      {/* Pure Fullscreen Nxsha Player Iframe */}
      <iframe
        id="nxsha-video-iframe"
        key={embedUrl}
        src={embedUrl}
        title="Player"
        className="w-full h-full border-0 absolute inset-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        allowFullScreen
        onLoad={() => setIsIframeLoading(false)}
      />

      {/* Subtle Floating Back Button (fades on mouse idle) */}
      <button
        onClick={() => navigate(-1)}
        className={`absolute top-4 left-4 z-40 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-opacity duration-300 hover:scale-105 active:scale-95 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        title="Back"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
    </div>
  );
};

export default WatchPlayerPage;
