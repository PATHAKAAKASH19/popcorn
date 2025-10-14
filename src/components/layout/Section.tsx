
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import MovieCard from '../movie/MovieCard'
import type { MovieProps } from '@/types/movies'


type Params = {
  
        region: string,
        sort_by:string,
   
}

type SectionProps = {
    queryKey: string,
    endpoint: string,
    params?:string,
    heading:string
}

const fetchData = (endpoint:string, params?: string ) => {
    return axios.get( `https://api.themoviedb.org/3/${endpoint}?${params}`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDE0ZmYxZjE2MjEwZjUzZGJjNTRjYTJhZTViMmFiOCIsIm5iZiI6MTc2MDAyOTA4OC4yMTIsInN1YiI6IjY4ZTdlOWEwNTRkOGVlMDI4YmQ4NGY2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TG-aba2c1wkopB5OrNcxxz8qt7GaZ7pdCqMYoj7imPc",
      },
    })
}

export default function Section({queryKey,  endpoint, params, heading}: SectionProps) {
    
    const { data : movies} = useQuery({
        queryKey: [queryKey],
        queryFn: () => fetchData(endpoint, params)
    })

    console.log(movies);
  return (
    <section className="mb-6">
      <h1 className="pt-8 pb-5 text-2xl font-open-sans font-medium text-white">
        {heading}
      </h1>
      <div className="grid grid-cols-5 w-fit gap-x-7 gap-y-5 auto-cols-fr">
        {movies?.data.results.map((movie: MovieProps) => (
          <MovieCard movie={movie}></MovieCard>
        ))}
      </div>
    </section>
  );
}
