import Navbar from "./components/layout/Navbar"
import { Outlet } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient()

function App() {
 
    return (
      <div className="w-full relative font-open-sans text-linear-to-br to-cyan-400 from-black">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <ReactQueryDevtools initialIsOpen={false} position="bottom"></ReactQueryDevtools>
        </QueryClientProvider>
      </div>
    );
}

export default App
