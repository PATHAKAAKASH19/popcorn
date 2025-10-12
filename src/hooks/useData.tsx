import { useQuery } from "@tanstack/react-query"
import axios from "axios"


const fetchMovieData = () => {
    return axios.get("https://" , )
}

export default function useData() {

    const { data, isError, error, isLoading} = useQuery({
        queryKey: ["moviesData"],
        queryFn:fetchMovieData
    })
  return (
    <div>useData</div>
  )
}
