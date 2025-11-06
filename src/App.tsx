import Navbar from "./components/layout/Navbar"
import { Outlet, useLocation } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import ScrollToTop from "./components/movie/ScrollToTop";
import { Link } from "react-router-dom";
import { IconHome, IconCalendar, IconSearch, IconUser } from "@tabler/icons-react"

const queryClient = new QueryClient()

function App() {
 
  const route = useLocation()
  
  return (
      <div className="w-full  font-open-sans bg-black bg-no-repeat bg-cover bg-fixed bg-top relative pb-20">
        <QueryClientProvider client={queryClient}>
          <ScrollToTop/>
          <Navbar />
          <Toaster position="top-center" richColors></Toaster>
          <Outlet />
          <ReactQueryDevtools initialIsOpen={false} position="bottom"></ReactQueryDevtools>
          <div className="flex gap-5 items-center justify-evenly max-sm:fixed max-sm:bottom-0 w-full  
          bg-black h-15 border-t border-gray-500/20 z-900 sm:hidden">
          <Link to="/explore" >
            <IconHome className={` size-5 hover:scale-120 transition-transform duration-300 hover:cursor-pointer  hover:text-white 
              ${route.pathname === "/explore"? "text-blue-400":"text-gray-400"}`} />
          </Link>
          <Link to="/schedule" >
            <IconCalendar className={` size-5 hover:scale-120 transition-transform duration-300 hover:cursor-pointer  hover:text-white 
              ${route.pathname === "/schedule"? "text-blue-400":"text-gray-400"}`} />
          </Link>

          <Link to="/user/watched" >
            <IconUser className={` size-5 hover:scale-120 transition-transform duration-300 hover:cursor-pointer  hover:text-white 
              ${route.pathname === "/user/watched"? "text-blue-400":"text-gray-400"}`}/>
          </Link>
          <Link to="/search">
            <IconSearch className={` size-5 hover:scale-120 transition-transform duration-300 hover:cursor-pointer  hover:text-white 
              ${route.pathname === "/search"? "text-blue-400":"text-gray-400"}`} />
          </Link>
        </div>
        </QueryClientProvider>
      </div>
    );
}

export default App
