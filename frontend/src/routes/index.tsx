import { lazy } from "react";
import { createBrowserRouter } from "react-router";

import { DefaultLayout } from "@layouts/default";
import Error404 from "@pages/errors/error404/Error404";
import Error500 from "@pages/errors/error500/Error500";

const Home = lazy(() => import("@pages/home/Home"));
const Projects = lazy(() => import("@pages/projects/Projects"));

const routers = createBrowserRouter([
  {
    path: "*",
    element: <Error404 />,
  },
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <Error500 />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
    ],
  },
]);

export default routers;
