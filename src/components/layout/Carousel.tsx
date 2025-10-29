import Banner from "../movie/Banner";
import type { MovieProps } from "@/types/movies";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}


type CarouselProps = {
  movieData: MovieProps[];
  autoSlide?: boolean;
  slideButtons?: boolean;
  autoSlideInterval?: number;
};

export default function Carousel({
  movieData,
  autoSlide = true,
  slideButtons = true,
  autoSlideInterval = 3000,
}: CarouselProps) {



  const [currentIndex, setCurrentIndex] = useState(0);

  const crousalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    navigate(route);
  };


  console.log("movie", movieData)

  useEffect(() => {
    // If there is no data, exit early
    if(!autoSlide) return
    if (!movieData.length) return;

    // Set an interval to change the current image that runs every duration
    const interval = setInterval(() => {
      // % operator ensures it wraps around to the first image after the last one
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movieData.length);
   
    }, autoSlideInterval);

    // Clear the interval when the component is unmounted or when dependencies change
    return () => clearInterval(interval);
  }, [movieData, autoSlideInterval,autoSlide]);


    

  const handleCrousal = (direction: "left" | "right") => {
    if (direction === "right") {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movieData.length);
    } else {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? movieData.length - 1 : prevIndex - 1
        );
    }
  };



  return (
    <div
      className="w-screen h-[950px]   relative flex flex-col hover:bg-white/10 duration-300 ease-in-out group 
    overflow-hidden max-sm:h-[550px] max-lg:h-[750px] "
    >
      <div
        className="relative w-full h-full  transition-transform duration-300 ease-in-out snap-center"
        ref={crousalRef}
      >
        {movieData.map((movie: MovieProps, index: number) => {
          return (
            <div
              key={movie.id}
              className={cn(
                `flex flex-col w-full h-full absolute transition-opacity duration-1000 cursor-pointer ease-in-out`,
                index === currentIndex ? "opacity-100" : "opacity-0"
              )}
            >
              <Banner
                backdrop_path={movie?.backdrop_path}
                isTrailerArrayEmpty={false}
              />
              <div className="absolute bottom-15 left-40 w-4xl max-xl:left-20 max-xl:w-3xl  max-lg:left-10 max-lg:w-xl max-sm:bottom-0  max-sm:left-0 max-sm:px-4 max-sm:w-auto">
                <h1
                  className="text-white text-5xl font-medium pb-4 max-lg:text-3xl 
                      max-sm:text-[20px] max-sm:pb-2 "
                >
                  {movie.title ? movie.title : movie.name}
                </h1>
                <div className=" pb-8 max-sm:pb-4">
                  <p
                    className="line-clamp-3  text-gray-300 text-lg max-lg:text-[16px] max-sm:text-[13px]
                       h-auto "
                  >
                    {movie.overview}
                  </p>
                </div>
                <button
                  type="button"
                  className=" px-6 py-2 rounded-[0.5em] text-[18px] bg-gradient-to-br from-blue-800  to-black/10 hover:from-blue-500
                        text-white font-medium cursor-pointer  hover:scale-110 transition-transform duration-500 ease-in-out
                       max-sm:px-3 max-sm:py-2 max-sm:text-[14px] relative z-30 
                       "
                  onClick={() => handleNavigation(`/movie/${movie.id}`)}
                >
                  See Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {slideButtons && (
        <div className=" group-hover:opacity-100 opacity-0 transition-opacity duration-500 ease-in-out">
          <div className="absolute z-50 left-0  bottom-0 top-0 flex justify-center items-center pb-25  max-lg:hidden ">
            <div
              className="w-15 h-15 flex justify-center items-center text-white m-10 rounded-[50%] backdrop-blur bg-black/30
                 hover:cursor-pointer hover:bg-gradient-to-br hover:from-blue-700 hover:to-black/20 "
              onClick={() => handleCrousal("left")}
            >
              <IconArrowNarrowLeft className=" " />
            </div>
          </div>
          <div className="absolute z-50 right-0  bottom-0 top-0 flex justify-center items-center pb-25 max-lg:hidden ">
            <div
              className="w-15 h-15 flex justify-center items-center text-white m-10 rounded-[50%] backdrop-blur
               bg-black/30 hover:cursor-pointer hover:bg-gradient-to-br hover:from-blue-700 hover:to-black/20  "
              onClick={() => handleCrousal("right")}
            >
              <IconArrowNarrowRight className=" " />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

