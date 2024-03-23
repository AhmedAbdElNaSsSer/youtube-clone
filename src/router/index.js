import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/home";
import Settings from "../pages/settings/settings";
import App from "../App";
import VideoDetails from "../pages/video/videoDetails";
import Profile from "../pages/profile/profile";
import Trendings from "../pages/trending/trending";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index:true,
        element: <Home />,
      },
      {
        path:'Profile/:id',
        element: <Profile />,
      },
      {
        path:'settings',
        element: <Settings />,
      },
      {
        path:'videoDetails/:id',
        element: <VideoDetails />,
      },
      {
        path:'trending',
        element: <Trendings />,
      },
      {
        path:'channel/:id',
        element: <Profile />,
      }
    ],
  },
]);
