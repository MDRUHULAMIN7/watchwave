import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";




const PrivateRoute = ({children}) => {
    const location = useLocation();
    const {user,loading} = UseAuth()
    if(loading) { 
        return ( 


            <div className="techwave-spinner flex flex-col items-center justify-center h-screen">
  <div className="relative flex items-center justify-center">
    <div className="w-28 h-28 border-4 border-teal-500 border-t-primary
     rounded-full animate-spin"></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-6 h-6 bg-primary rounded-full shadow-lg"></div>
    </div>
  </div>
  <div className="mt-4  text-teal-500 text-3xl">
    <p>Loading...</p>
  
  </div>
  </div>
    )
    }

    if(user){
        return children;
    }
    return (
        <Navigate to={'/signin'} state={{from:location}}
        replace></Navigate>
    );
};

export default PrivateRoute;