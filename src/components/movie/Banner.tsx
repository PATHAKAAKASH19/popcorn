import {IconPlayerPlay} from "@tabler/icons-react"


type BannerProps = {

    backdrop_path: string,
    isTrailerArrayEmpty:boolean,
    togglePlay?: () => void
}

export default function Banner({backdrop_path, isTrailerArrayEmpty, togglePlay}:BannerProps) {
  return (
    <div className="pt-20 h-[950px] w-full relative aspect-[4/2] max-lg:h-[750px] max-sm:h-[550px] max-sm:pt-15 transition-all duration-500 ease-in-out  shrink-0 ">
      <img
        src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
        className="w-full h-full object-cover"
      ></img>

      {isTrailerArrayEmpty && (
        <div className="absolute top-0 z-30 w-full h-[950px] flex justify-center items-center">
          <div
            className="relative bottom-15 rounded-[50%] h-15 w-15 flex justify-center items-center backdrop-blur bg-black/20 cursor-pointer hover:scale-110 transition-transform duration-300 hover:shadow-lg hover:shadow-black max-md:bottom-30 max-sm:bottom-50 max-sm:size-13"
            onClick={togglePlay}
          >
            <IconPlayerPlay className="fill-white text-white" />
          </div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black via-black/80 to-transparent" />
    </div>
  );
}
