import Navbar from "./components/layout/Navbar"
import { Outlet, useLocation } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import ScrollToTop from "./components/movie/ScrollToTop";
import { Link } from "react-router-dom";
import { IconHome, IconCalendar, IconSearch, IconUser } from "@tabler/icons-react"
import { HelmetProvider } from "./components/SEO";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // Data is fresh for 1 minute
      gcTime: 5 * 60 * 1000, // Cache for 5 minutes
      retry: 1, // Retry failed requests once
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
    },
  },
})

function App() {

  const route = useLocation()

  return (
    <div className="w-full  font-open-sans bg-black bg-no-repeat bg-cover bg-fixed bg-top relative pb-20">
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ScrollToTop />
          <Navbar />
          <Toaster position="top-center" richColors></Toaster>
          <Outlet />
          <ReactQueryDevtools initialIsOpen={false} position="bottom"></ReactQueryDevtools>
          <nav
            className="flex gap-5 items-center justify-evenly max-sm:fixed max-sm:bottom-0 w-full  
          bg-black h-15 border-t border-gray-500/20 z-900 sm:hidden"
            aria-label="Mobile navigation"
          >
            <Link to="/explore" aria-label="Go to explore page">
              <IconHome
                className={` size-5 hover:scale-120 transition-transform duration-300 hover:cursor-pointer  hover:text-white 
              ${route.pathname === "/explore" ? "text-blue-400" : "text-gray-400"}`}
                aria-hidden="true"
              />
            </Link>
            <Link to="/schedule" aria-label="Go to schedule page">
              <IconCalendar
                className={` size-5 hover:scale-120 transition-transform duration-300 hover:cursor-pointer  hover:text-white 
              ${route.pathname === "/schedule" ? "text-blue-400" : "text-gray-400"}`}
                aria-hidden="true"
              />
            </Link>

            <Link to="/user/watched" aria-label="Go to user profile">
              <IconUser
                className={` size-5 hover:scale-120 transition-transform duration-300 hover:cursor-pointer  hover:text-white 
              ${route.pathname === "/user/watched" ? "text-blue-400" : "text-gray-400"}`}
                aria-hidden="true"
              />
            </Link>
            <Link to="/search" aria-label="Go to search page">
              <IconSearch
                className={` size-5 hover:scale-120 transition-transform duration-300 hover:cursor-pointer  hover:text-white 
              ${route.pathname === "/search" ? "text-blue-400" : "text-gray-400"}`}
                aria-hidden="true"
              />
            </Link>
          </nav>
        </QueryClientProvider>
      </HelmetProvider>
    </div>
  );
}

export default App
