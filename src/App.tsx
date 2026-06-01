import { createBrowserRouter,RouterProvider } from "react-router"
import HomePage from "./pages/HomePage"
import SearchPage from "./pages/SearchPage"

const router = createBrowserRouter([
    {
        path:'/',
        element:<HomePage/>
    },
    {
        path:'/search',
        element:<SearchPage/>,
    }
])
export default function App () {
    return( 
        
    <RouterProvider router={router}/>
        
    )
    
    
}