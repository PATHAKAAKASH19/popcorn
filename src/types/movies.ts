export type MovieProps = {
  id: number;
  title: string;
  name: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  media_type: string;
  first_air_date: string;
};

// Simplified type for bookmarks and watched lists
export type AddMovieProps = {
  id: string;
  poster_path: string;
  mediaType: string;
  name: string;
};



export type CastProps = {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
};

export type CompanyProps = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type CrewProps = {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
};

export type GenerProps = {
  id: number;
  name: string;
};


export type UrlProps = {
  type: string;
  movieUrl: string;
  showUrl: string;
};