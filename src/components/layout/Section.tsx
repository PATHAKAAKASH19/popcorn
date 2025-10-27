import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import VerticalCard from "../movie/VerticalCard";
import type { MovieProps } from "@/types/movies";
import SkeletonCard from "../movie/SkeletonCard";
import HorizontalCard from "../movie/HorizontalCard";

import {
  IconChevronRight,
  IconChevronLeft,
} from "@tabler/icons-react";

import { useRef } from "react";

type Params = {
  region: string;
  sort_by: string;
};

type SectionProps = {
  queryKey: string;
  endpoint: string;
  params?: string;
  heading: string;
  mediaType: string,
  width?:string
};

const fetchData = (endpoint: string, params?: string) => {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/${endpoint}?${params}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_SECRET}`,
    },
  });
};

export default function Section({
  queryKey,
  endpoint,
  params,
  heading,
  mediaType,
  width
}: SectionProps) {
  const { data: movies, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchData(endpoint, params),
  });


  const crousalRef = useRef<HTMLDivElement>(null)
  
  
  const handleCrousal = (direction: "left" | "right") => {
      
    if (crousalRef.current) {
      const scrollAmount = window.innerWidth;
      crousalRef.current.scrollBy({
        left: direction === "left"? -scrollAmount: scrollAmount,
        behavior:"smooth"
      })

    }
  }

   



  return (
    <section className="mb-3  max-sm:mb-0 transition-transform duration-300 ease-in-out">
      {!isLoading ? (
        <>
          <h1 className="pt-8 pb-5 text-2xl font-open-sans font-medium text-white max-sm:text-[17px] max-sm:pb-0">
            {heading}
          </h1> 

          <div className="w-full relative group/parent">
            <div
              className="absolute z-10 bottom-0 top-0 h-full bg-gradient-to-r from-black to-transparent cursor-pointer 
            opacity-0 group-hover/parent:opacity-100 transition-opacity duration-500 "
            >
              <div
                className="w-16 flex justify-center items-center h-full"
                onClick={() => handleCrousal("left")}
              >
                <IconChevronLeft className="w-full text-white size-12"></IconChevronLeft>
              </div>
            </div>
            <div
              className="flex max-sm:overflow-x-scroll overflow-x-hidden scrollbar-hide overflow-y-hidden gap-5 pt-5 relative transition-all duration-1000 ease-in-out"
              ref={crousalRef}
            >
              {movies?.data.results.map((movie: MovieProps, index:number) => (
                <VerticalCard movie={movie} key={`${movie.id}`} mediaType={mediaType} cn={width} ></VerticalCard>
              ))}
            </div>
            <div
              className="absolute z-10 bottom-0 top-0 h-full bg-gradient-to-r to-black from-transparent cursor-pointer right-0 
            opacity-0 group-hover/parent:opacity-100 transition-opacity duration-500"
            >
              <div
                className="w-16 flex justify-center items-center h-full "
                onClick={() => handleCrousal("right")}
              >
                <IconChevronRight className="w-full text-white size-12"></IconChevronRight>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-5 w-fit gap-5 auto-cols-fr">
          {[...Array(5)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      <></>
    </section>
  );
}
