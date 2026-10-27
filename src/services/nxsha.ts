/**
 * Nxsha Video Streaming Service
 * Provides direct integration with https://web.nxsha.app for movies, TV series, and anime.
 */

export interface StreamServer {
  id: string;
  name: string;
  badge?: string;
  url: string;
}

/**
 * Returns the primary Nxsha embed player URL for an item.
 * For movies: https://web.nxsha.app/embed/movie/[tmdbId]
 * For TV/Anime: https://web.nxsha.app/embed/tv/[tmdbId]/[season]/[episode]
 */
export function getNxshaEmbedUrl(
  mediaType: string,
  tmdbId: number | string,
  season: number = 1,
  episode: number = 1
): string {
  const isTv = mediaType === 'tv' || mediaType === 'anime';
  return isTv
    ? `https://web.nxsha.app/embed/tv/${tmdbId}/${season}/${episode}`
    : `https://web.nxsha.app/embed/movie/${tmdbId}`;
}

/**
 * Returns the direct watch URL on web.nxsha.app.
 * For movies: https://web.nxsha.app/watch/movie/[tmdbId]
 * For TV/Anime: https://web.nxsha.app/watch/tv/[tmdbId]/[season]/[episode]
 */
export function getNxshaWatchUrl(
  mediaType: string,
  tmdbId: number | string,
  season: number = 1,
  episode: number = 1
): string {
  const isTv = mediaType === 'tv' || mediaType === 'anime';
  return isTv
    ? `https://web.nxsha.app/watch/tv/${tmdbId}/${season}/${episode}`
    : `https://web.nxsha.app/watch/movie/${tmdbId}`;
}

/**
 * Returns the title details page URL on web.nxsha.app.
 */
export function getNxshaDetailsUrl(
  mediaType: string,
  tmdbId: number | string
): string {
  const isTv = mediaType === 'tv' || mediaType === 'anime';
  return isTv
    ? `https://web.nxsha.app/tv/${tmdbId}`
    : `https://web.nxsha.app/movie/${tmdbId}`;
}

/**
 * List of available streaming servers including primary Nxsha servers and reliable fallbacks.
 */
export function getAvailableServers(
  mediaType: string,
  tmdbId: number | string,
  season: number = 1,
  episode: number = 1
): StreamServer[] {
  const isTv = mediaType === 'tv' || mediaType === 'anime';

  return [
    {
      id: 'nxsha-embed',
      name: 'Nxsha Server 1 (Fast Embed)',
      badge: 'Nxsha Default',
      url: isTv
        ? `https://web.nxsha.app/embed/tv/${tmdbId}/${season}/${episode}`
        : `https://web.nxsha.app/embed/movie/${tmdbId}`
    },
    {
      id: 'nxsha-watch',
      name: 'Nxsha Server 2 (Direct Cinema)',
      badge: 'Nxsha HD',
      url: isTv
        ? `https://web.nxsha.app/watch/tv/${tmdbId}/${season}/${episode}`
        : `https://web.nxsha.app/watch/movie/${tmdbId}`
    },
    {
      id: 'vidsrc-vip',
      name: 'Backup Server Alpha (VIP)',
      badge: 'Auto Failover',
      url: isTv
        ? `https://vidsrc.to/embed/tv/${tmdbId}/${season}/${episode}`
        : `https://vidsrc.to/embed/movie/${tmdbId}`
    },
    {
      id: 'vidsrc-cc',
      name: 'Backup Server Beta (Multi-Sub)',
      badge: '1080p',
      url: isTv
        ? `https://vidsrc.cc/v2/embed/tv/${tmdbId}/${season}/${episode}`
        : `https://vidsrc.cc/v2/embed/movie/${tmdbId}`
    }
  ];
}
