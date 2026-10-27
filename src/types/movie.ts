export type MediaType = 'movie' | 'tv' | 'anime';

export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string | null;
}

export interface Episode {
  id: number;
  episode_number: number;
  season_number: number;
  name: string;
  overview: string;
  still_path?: string | null;
  runtime?: number;
  air_date?: string;
}

export interface Season {
  id: number;
  season_number: number;
  name: string;
  episode_count: number;
  overview?: string;
  poster_path?: string | null;
  episodes?: Episode[];
}

export interface Movie {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count?: number;
  genre_ids?: number[];
  genres?: Genre[];
  media_type: MediaType;
  original_language?: string;
  runtime?: number;
  tagline?: string;
  status?: string;
  rank?: number;
  logo_path?: string; // Optional transparent logo badge like pikamovie
  cast?: CastMember[];
  seasons?: Season[];
  video_url?: string; // Authorized demo stream source
  trailer_key?: string; // YouTube trailer key
}

export interface CategoryRow {
  id: string;
  title: string;
  mediaType: MediaType;
  items: Movie[];
  isRanked?: boolean;
}
