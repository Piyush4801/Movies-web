import type { Movie, MediaType } from '../types/movie';
import {
  HERO_MOVIES,
  TOP_10_HINDI_MOVIES,
  TOP_10_HINDI_SERIES,
  MORE_HINDI_MOVIES,
  NEW_AND_SOUTH_RELEASES,
  ANIME_HITS,
  ALL_COMBINED_MOVIES,
  DEMO_VIDEOS
} from '../data/mockData';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Normalize TMDB API response item to Movie
function formatTmdbItem(item: any, fallbackType: MediaType = 'movie'): Movie {
  const isTv = item.media_type === 'tv' || item.first_air_date !== undefined || fallbackType === 'tv';
  const isAnime = fallbackType === 'anime' || (item.genre_ids && item.genre_ids.includes(16) && item.original_language === 'ja');
  const mediaType: MediaType = isAnime ? 'anime' : (isTv ? 'tv' : 'movie');

  return {
    id: item.id,
    title: item.title || item.name,
    name: item.name || item.title,
    overview: item.overview || 'No synopsis available.',
    poster_path: item.poster_path 
      ? `${IMAGE_BASE_URL}/w780${item.poster_path}` 
      : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=780&q=80',
    backdrop_path: item.backdrop_path 
      ? `${IMAGE_BASE_URL}/original${item.backdrop_path}` 
      : (item.poster_path ? `${IMAGE_BASE_URL}/original${item.poster_path}` : 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1280&q=80'),
    release_date: item.release_date,
    first_air_date: item.first_air_date,
    vote_average: Number((item.vote_average || 7.5).toFixed(1)),
    vote_count: item.vote_count || 100,
    genre_ids: item.genre_ids || [],
    genres: item.genres,
    media_type: mediaType,
    original_language: item.original_language,
    runtime: item.runtime,
    tagline: item.tagline,
    video_url: DEMO_VIDEOS.tearsOfSteel,
    trailer_key: item.videos?.results?.[0]?.key || undefined
  };
}

// Fetch helper with error catching
async function fetchTmdb(endpoint: string, params: Record<string, string> = {}) {
  if (!TMDB_API_KEY || TMDB_API_KEY === 'your_tmdb_api_key_here') {
    return null;
  }
  try {
    const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
    url.searchParams.set('api_key', TMDB_API_KEY);
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

    const res = await fetch(url.toString());
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn('TMDB Fetch error, falling back to local dataset:', err);
    return null;
  }
}

export const api = {
  // Hero slides
  getHeroMovies: async (): Promise<Movie[]> => {
    const data = await fetchTmdb('/trending/all/day');
    if (data && data.results && data.results.length > 0) {
      return data.results.slice(0, 6).map((item: any) => formatTmdbItem(item));
    }
    return HERO_MOVIES;
  },

  // Top 10 Hindi Movies
  getTop10HindiMovies: async (): Promise<Movie[]> => {
    const data = await fetchTmdb('/discover/movie', {
      with_original_language: 'hi',
      sort_by: 'popularity.desc',
      page: '1'
    });
    if (data && data.results && data.results.length >= 10) {
      return data.results.slice(0, 10).map((item: any, idx: number) => ({
        ...formatTmdbItem(item, 'movie'),
        rank: idx + 1
      }));
    }
    return TOP_10_HINDI_MOVIES;
  },

  // Top 10 Hindi Series
  getTop10HindiSeries: async (): Promise<Movie[]> => {
    const data = await fetchTmdb('/discover/tv', {
      with_original_language: 'hi',
      sort_by: 'popularity.desc',
      page: '1'
    });
    if (data && data.results && data.results.length >= 10) {
      return data.results.slice(0, 10).map((item: any, idx: number) => ({
        ...formatTmdbItem(item, 'tv'),
        rank: idx + 1
      }));
    }
    return TOP_10_HINDI_SERIES;
  },

  // More Hindi Movies
  getMoreHindiMovies: async (): Promise<Movie[]> => {
    const data = await fetchTmdb('/discover/movie', {
      with_original_language: 'hi',
      sort_by: 'vote_count.desc',
      page: '2'
    });
    if (data && data.results && data.results.length > 0) {
      return data.results.slice(0, 12).map((item: any) => formatTmdbItem(item, 'movie'));
    }
    return MORE_HINDI_MOVIES;
  },

  // New & South Releases
  getNewReleases: async (): Promise<Movie[]> => {
    const data = await fetchTmdb('/movie/now_playing', { page: '1' });
    if (data && data.results && data.results.length > 0) {
      return data.results.slice(0, 10).map((item: any) => formatTmdbItem(item, 'movie'));
    }
    return NEW_AND_SOUTH_RELEASES;
  },

  // Anime
  getAnimeList: async (): Promise<Movie[]> => {
    const data = await fetchTmdb('/discover/tv', {
      with_genres: '16',
      with_original_language: 'ja',
      sort_by: 'popularity.desc',
      page: '1'
    });
    if (data && data.results && data.results.length > 0) {
      return data.results.slice(0, 12).map((item: any) => formatTmdbItem(item, 'anime'));
    }
    return ANIME_HITS;
  },

  // Movies browse
  getBrowseMovies: async (genreId?: number, sortBy: string = 'popularity.desc'): Promise<Movie[]> => {
    const params: Record<string, string> = { sort_by: sortBy, page: '1' };
    if (genreId && genreId > 0) {
      params.with_genres = genreId.toString();
    }
    const data = await fetchTmdb('/discover/movie', params);
    if (data && data.results && data.results.length > 0) {
      return data.results.map((item: any) => formatTmdbItem(item, 'movie'));
    }
    let list = ALL_COMBINED_MOVIES.filter(m => m.media_type === 'movie');
    if (genreId && genreId > 0) {
      list = list.filter(m => m.genres?.some(g => g.id === genreId) || m.genre_ids?.includes(genreId));
    }
    return list;
  },

  // TV browse
  getBrowseTV: async (genreId?: number, sortBy: string = 'popularity.desc'): Promise<Movie[]> => {
    const params: Record<string, string> = { sort_by: sortBy, page: '1' };
    if (genreId && genreId > 0) {
      params.with_genres = genreId.toString();
    }
    const data = await fetchTmdb('/discover/tv', params);
    if (data && data.results && data.results.length > 0) {
      return data.results.map((item: any) => formatTmdbItem(item, 'tv'));
    }
    let list = ALL_COMBINED_MOVIES.filter(m => m.media_type === 'tv');
    if (genreId && genreId > 0) {
      list = list.filter(m => m.genres?.some(g => g.id === genreId) || m.genre_ids?.includes(genreId));
    }
    return list;
  },

  // Search
  search: async (query: string, mediaFilter?: MediaType | 'all'): Promise<Movie[]> => {
    if (!query.trim()) return [];
    const cleanQuery = query.toLowerCase().trim();

    const data = await fetchTmdb('/search/multi', { query: cleanQuery });
    if (data && data.results && data.results.length > 0) {
      let results: Movie[] = data.results
        .filter((r: any) => r.media_type === 'movie' || r.media_type === 'tv')
        .map((r: any) => formatTmdbItem(r));

      if (mediaFilter && mediaFilter !== 'all') {
        results = results.filter((r: Movie) => r.media_type === mediaFilter);
      }
      return results;
    }

    // Local search fallback
    return ALL_COMBINED_MOVIES.filter(item => {
      const title = (item.title || item.name || '').toLowerCase();
      const overview = (item.overview || '').toLowerCase();
      const matchesText = title.includes(cleanQuery) || overview.includes(cleanQuery);
      if (!matchesText) return false;
      if (mediaFilter && mediaFilter !== 'all') {
        return item.media_type === mediaFilter;
      }
      return true;
    });
  },

  // Movie or TV Details
  getDetails: async (mediaType: MediaType, id: number | string): Promise<Movie | null> => {
    const numId = Number(id);
    const tmdbType = mediaType === 'tv' ? 'tv' : 'movie';
    const data = await fetchTmdb(`/${tmdbType}/${id}`, { append_to_response: 'credits,videos,recommendations' });

    if (data) {
      const item = formatTmdbItem(data, mediaType);
      if (data.credits?.cast) {
        item.cast = data.credits.cast.slice(0, 10).map((c: any) => ({
          id: c.id,
          name: c.name,
          character: c.character,
          profile_path: c.profile_path ? `${IMAGE_BASE_URL}/w185${c.profile_path}` : null
        }));
      }
      if (data.seasons) {
        item.seasons = data.seasons.map((s: any) => ({
          id: s.id,
          season_number: s.season_number,
          name: s.name,
          episode_count: s.episode_count,
          poster_path: s.poster_path ? `${IMAGE_BASE_URL}/w300${s.poster_path}` : null
        }));
      }
      return item;
    }

    // Fallback from combined
    const found = ALL_COMBINED_MOVIES.find(m => m.id === numId);
    if (found) {
      return {
        ...found,
        cast: found.cast || [
          { id: 1, name: 'Lead Actor', character: 'Protagonist' },
          { id: 2, name: 'Supporting Star', character: 'Key Ally' },
          { id: 3, name: 'Special Appearance', character: 'Investigator' }
        ]
      };
    }
    return null;
  }
};
