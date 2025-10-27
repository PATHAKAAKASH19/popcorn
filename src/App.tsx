import Navbar from "./components/layout/Navbar"
import { Outlet } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ScrollToTop from "./components/movie/ScrollToTop";

const queryClient = new QueryClient()

function App() {
 
    return (
      <div className="w-full  font-open-sans bg-black bg-no-repeat bg-cover bg-fixed bg-top relative ">
        <QueryClientProvider client={queryClient}>
          <ScrollToTop/>
          <Navbar />
          <Outlet />
          <ReactQueryDevtools initialIsOpen={false} position="bottom"></ReactQueryDevtools>
        </QueryClientProvider>
      </div>
    );
}

export default App
