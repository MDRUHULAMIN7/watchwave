import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";



const Main = () => {
    return (
        <div className="px-1 font-sans pt-1 bg-background">
            <div><Navbar></Navbar></div>
           <div className="min-h-screen"> <Outlet></Outlet></div>
            <div><Footer></Footer></div>
        </div>
    );
};

export default Main;
