import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Main from "../Layouts/Main";
import SignUp from "../Pages/Signup.jsx/Signup";
import SignIn from "../Pages/Signup.jsx/Signin";
import AllProducts from "../Pages/AllProducts/AllProducts";
import Eror from "../Pages/Eror";


export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        errorElement:<div><Eror></Eror></div>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:"signup",
                element:<SignUp></SignUp>
            },
            {
                path:"signin",
                element:<SignIn></SignIn>
            },
            {
                path:"allproducts",
                element:<AllProducts></AllProducts>
            },
        ]
    }
])