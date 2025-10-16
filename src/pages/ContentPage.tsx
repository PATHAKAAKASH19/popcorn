import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IconBookmark } from "@tabler/icons-react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

type CastProps = {
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

type CompanyProps = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

type CrewProps = {
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

type GenerProps = {
  id: number;
  name: string;
};

const fetchMovieDatails = (movieId: string) => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US}&append_to_response=videos,credits,similar`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDE0ZmYxZjE2MjEwZjUzZGJjNTRjYTJhZTViMmFiOCIsIm5iZiI6MTc2MDAyOTA4OC4yMTIsInN1YiI6IjY4ZTdlOWEwNTRkOGVlMDI4YmQ4NGY2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TG-aba2c1wkopB5OrNcxxz8qt7GaZ7pdCqMYoj7imPc",
      },
    }
  );
};

const fetchMovieTrailer = (movieId: string) => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=3d14ff1f16210f53dbc54ca2ae5b2ab8`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDE0ZmYxZjE2MjEwZjUzZGJjNTRjYTJhZTViMmFiOCIsIm5iZiI6MTc2MDAyOTA4OC4yMTIsInN1YiI6IjY4ZTdlOWEwNTRkOGVlMDI4YmQ4NGY2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TG-aba2c1wkopB5OrNcxxz8qt7GaZ7pdCqMYoj7imPc",
      },
    }
  );
};

export default function ContentPage() {
  const { movieId } = useParams();

  const { data: movieDetails } = useQuery({
    queryKey: ["movie-details", movieId],
    queryFn: () => fetchMovieDatails(movieId!),
    enabled: !!movieId,
  });

  const { data: movieTrailer } = useQuery({
    queryKey: ["movie-trailer", movieId],
    queryFn: () => fetchMovieTrailer(movieId!),
    enabled: !!movieId,
  });

  // console.log("trailer", movieTrailer);
  console.log("details", movieDetails);
  return (
    <div className="w-full  flex flex-col bg-black ">
      <div className="pt-20 h-[950px] w-full relative ">
        <img
          src={`https://image.tmdb.org/t/p/original/${movieDetails?.data.backdrop_path}`}
          className="w-full h-full"
        ></img>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black via-black/75 to-transparent" />
      </div>

      <div className=" w-full  relative bottom-80 px-80  flex flex-col justify-between border-2 border-green-800">
        <div className="grid grid-cols-3 w-8xl  border-2 border-green-800">
          <div className="w-55 h-full rounded-2xl">
            <img
              src={`https://image.tmdb.org/t/p/w780/${movieDetails?.data.poster_path}`}
              alt=""
              title=""
              className="rounded-2xl"
            ></img>
          </div>

          <div>
            <div className="text-white">{movieDetails?.data.title}</div>
            <div className="text-white">{movieDetails?.data.release_date}</div>
          </div>

          <div className="">
            <button className="w-full px-5 py-[10px] bg-purple-800 text-white rounded-[2em] cursor-pointer">
              Mark as Watched
            </button>
            <button className="w-full px-5 py-[10px] bg-gray-900 text-white rounded-[2em] cursor-pointer">
              <h1> BookMark</h1>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-20 border-2 border-amber-100 ">
          <div>
            <h1 className="text-white text-2xl font-medium pt-8 pb-5">
              Overview
            </h1>
            <p className="text-white text-[16px] pb-4 ">
              {movieDetails?.data.overview}
            </p>

            <div className="flex gap-4 ">
              {movieDetails?.data.genres.map((gener: GenerProps) => {
                return (
                  <h1 className="text-white text-center px-4 py-2 rounded-xl bg-gray-800 text-[14px]">
                    {gener.name}
                  </h1>
                );
              })}
            </div>
          </div>
          <div>
            <h1 className="text-white text-2xl pb-5 font-medium">Cast</h1>
            <div className="flex gap-7 ">
              {movieDetails?.data.credits.cast
                .slice(0, 5)
                .map((c: CastProps) => {
                  if (c.profile_path) {
                    return (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-30 h-30 rounded-[50%] ">
                          <img
                            src={`https://image.tmdb.org/t/p/original/${c?.profile_path}`}
                            alt={`${c.name}`}
                            className="h-full w-full rounded-[50%] object-cover object-top"
                          />
                        </div>
                        <div>
                          <h2 className="text-white text-[15px] text-center">
                            {c?.name}
                          </h2>
                          <h3 className="text-white text-[13px] font-light text-center">
                            {c?.character}
                          </h3>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>

          <div>
            <h1 className="text-white  text-2xl pb-5 font-medium">Crew</h1>
            <div className="flex gap-7 ">
              {movieDetails?.data.credits.crew
                .slice(0, 5)
                .map((c: CrewProps) => {
                  if (c?.profile_path) {
                    return (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-30 h-30 rounded-[50%] ">
                          <img
                            src={`https://image.tmdb.org/t/p/original/${c?.profile_path}`}
                            alt={`${c.name}`}
                            className="h-full w-full rounded-[50%] object-cover"
                          />
                        </div>
                        <div>
                          <h2 className="text-white text-[15px] text-center">
                            {c.name}
                          </h2>
                          <h3 className="text-white text-[13px] font-light text-center">
                            {c.job}
                          </h3>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>

          <div>
            <h1 className="text-white text-2xl font-medium pb-5">
              Production House
            </h1>

            <div className="flex gap-2 ">
              {movieDetails?.data.production_companies.map(
                (c: CompanyProps) => {
                  return (
                    <div className="py-2 px-4  bg-gray-800 rounded-2xl">
                      <h2 className="text-white text-[14px]">{c.name}</h2>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          <div>
            <h1 className="text-white text-2xl font-medium pb-5 ">
              Recommendation
            </h1>
         
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <iframe
        src={`https://www.youtube.com/embed/${movieTrailer?.data.results[0].key}`}
        title={movieTrailer?.data.results[0].name}
        className="w-full aspect-video rounded-2xl shadow-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture controls-0"
        allowFullScreen
      ></iframe> */
}
