import Navbar from "./components/layout/Navbar"
import { Outlet } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient()

function App() {
 
    return (
      <div className="w-full relative font-open-sans bg-black bg-[url(/bg1.jpeg)] bg-no-repeat bg-cover bg-fixed bg-top">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <ReactQueryDevtools initialIsOpen={false} position="bottom"></ReactQueryDevtools>
        </QueryClientProvider>
      </div>
    );
}

export default App
