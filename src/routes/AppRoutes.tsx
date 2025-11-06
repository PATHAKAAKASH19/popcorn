import { lazy} from "react";

import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Watched from "@/components/layout/Watched";
import BookMark from "@/components/layout/BookMark";
import LazyComponent from "@/components/movie/LazyComponent";
import { Navigate } from "react-router-dom";

const ExplorePage = lazy(() => import("@/pages/ExplorePage"))
const SchedulePage = lazy(() => import("@/pages/SchedulePage"))
const SearchPage = lazy(() => import("@/pages/SearchPage"))
const ContentPage = lazy(() => import("@/pages/ContentPage") )
const UserPage = lazy(() => import("@/pages/UserPage") )





const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // default route when path is '/'
        element: <Navigate to="explore" replace />,
      },
      {
        path: "explore",
        element:<LazyComponent component={ExplorePage}/> ,
      },

      {
        path: "schedule",
        element: <LazyComponent component={SchedulePage}/>,
      },

      {
        path: "search",
        element: <LazyComponent component={SearchPage}/>,
      },
      {
        path: ":mediaType",
        children: [
          {
            path: ":movieId",
            element:<LazyComponent component={ContentPage}/>,
          },
        ],
      },
      {
        path: "user",
        element: <LazyComponent component={UserPage}/>,
        children: [
          {
            index: true,
            element: <Navigate to="watched" replace/>,
          },
          {
            path: "bookmark",
            element:<BookMark/>,
          },
          {
            path: "watched",
            element:<Watched/>
          }
        ]
      },

      
    ],
  },
]);

export default router;
