import { createBrowserRouter, RouterProvider, Outlet } from "react-router"
import HomePage from "./pages/HomePage"
import SearchPage from "./pages/SearchPage"
import MovieNavbar from "./component/MovieNavBar"

function Layout() {
  return (
    <>
      <MovieNavbar/>
      <Outlet />
    </>
  )
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
        path: "search",
        element: <SearchPage />,
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}