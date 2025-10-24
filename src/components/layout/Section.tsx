import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "../movie/MovieCard";
import type { MovieProps } from "@/types/movies";
import SkeletonCard from "../movie/SkeletonCard";

type Params = {
  region: string;
  sort_by: string;
};

type SectionProps = {
  queryKey: string;
  endpoint: string;
  params?: string;
  heading: string;
};

const fetchData = (endpoint: string, params?: string) => {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/${endpoint}?${params}`, {
    headers: {
      Authorization:`Bearer ${import.meta.env.VITE_API_SECRET}`,
    },
  });
};

export default function Section({
  queryKey,
  endpoint,
  params,
  heading,
}: SectionProps) {
  const { data: movies, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchData(endpoint, params),
  });

 
  return (
    <section className="mb-6">
      {!isLoading ? (
        <>
          <h1 className="pt-8 pb-5 text-2xl font-open-sans font-medium text-white">
            {heading}
          </h1>
          <div className="grid grid-cols-5 w-fit gap-5 auto-cols-fr">
            {movies?.data.results.map((movie: MovieProps) => (
              <MovieCard movie={movie} key={`${movie.id}`}></MovieCard>
            ))}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-5 w-fit gap-5 auto-cols-fr">
          {[...Array(5)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}
    </section>
  );
}
