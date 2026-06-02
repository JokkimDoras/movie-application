import { createBrowserRouter, RouterProvider, Outlet } from "react-router"
import HomePage from "./pages/HomePage"
import MovieNavbar from "./component/MovieNavBar"
import DetailsPage from "./pages/DetialsPage"
import GenreProvider from "./context/GenreContext"
import SearchPage from "./pages/SearchPage"

function Layout() {
  
    return (
      <>
        <MovieNavbar
         
        />
  
        <Outlet
        />
      </>
    );
  }

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path:'search',
        element:<SearchPage/>
      },
      {
        path:"search/:id",
        element:<DetailsPage/>
      }
    ],
  },
])

export default function App() {
  return <GenreProvider>
          <RouterProvider router={router} />
  </GenreProvider>
}