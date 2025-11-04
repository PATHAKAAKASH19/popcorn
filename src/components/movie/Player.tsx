import {IconX} from "@tabler/icons-react"


type PlayerProps = {
    trailerId:string,
    title:string
    togglePlay: ()=> void
}


export default function Player({trailerId, title,togglePlay}:PlayerProps) {
  return (
    <div className="fixed w-screen h-screen z-800 flex justify-center items-center bg-black/90  ">
      <IconX
        className="text-white/80 absolute top-10 right-15 size-8 cursor-pointer hover:scale-110 transition-transform duration-300 hover:text-white  max-md:size-7 max-sm:size-6 max-sm:right-5 max-sm:top-6"
        onClick={togglePlay}
      ></IconX>
      <div className="w-6xl  max-xl:w-4xl max-lg:w-2xl max-md:w-md  max-sm:w-2sm transition-all duration-700 ease-in-out">
        <iframe
          src={`https://www.youtube.com/embed/${trailerId}`}
          title={title}
          className="w-full h-full aspect-video rounded-2xl shadow-[0px_5px_100px_rgba(0,0,0,0.25)]  shadow-blue-100"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture controls-0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
