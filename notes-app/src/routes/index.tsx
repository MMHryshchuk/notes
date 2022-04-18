import { Navigate, useRoutes } from "react-router-dom";
import AppLayout from "../layout";
import AboutPage from "../pages/AboutPage";
import NotesPage from "../pages/NotesPage";

export default function Router() {
    return useRoutes([
        {
            path: "/",
            element: <AppLayout />,
            children: [
                {
                    element: <Navigate to={"/notes"} replace />,
                    index: true,
                },
                {
                    path: "/notes",

                    element: <NotesPage />,
                },
                {
                    path: "/about",

                    element: <AboutPage />,
                },
            ],
        },
    ]);
}

// IMPORT COMPONENTS

// const NotesPage = lazy(() => import("../pages/NotesPage"));
// const AboutPage = lazy(() => import("../pages/AboutPage"));
