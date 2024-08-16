import { Link, NavLink } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import logo from"../../../public/images/logo.png"


const Navbar = () => {
    const navitems =(
       <div className="md:flex space-x-3 text-xl justify-center items-center">
         <NavLink
        className={({ isActive, isPending }) =>
          isPending
            ? "text-black dark:text-white"
            : isActive
            ? "text-primary underline"
            : "text-black dark:text-white"
        }
        to={"/"}
      >
        Home
      </NavLink>
         <NavLink
        className={({ isActive, isPending }) =>
          isPending
            ? "text-black dark:text-white"
            : isActive
            ? "text-primary underline"
            : "text-black dark:text-white"
        }
        to={"/allproducts"}
      >
        Products
      </NavLink>
       </div> 
    )

    const {user,logout}=UseAuth()
    return (
        <div className="navbar bg-transparent">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {navitems}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl font-serif"><img className="h-10" src={logo} alt="" /></a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-3 flex">
          {navitems}
          </ul>
        </div>
        <div className="navbar-end">
        {user?.email  ?   <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full border border-primary">
          <img className="w-10 h-10"
            alt="not found"
            src={user?.photoURL}/>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-20 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
       
        <li className=" "><button onClick={()=>logout()
          .then(()=>{
            
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Logout Successfully ",
                showConfirmButton: false,
                timer: 2000
              });
            
          })

        }>Logout</button></li>
       
      </ul>
    </div> :   <Link to={"/signin"} className="md:text-2xl bg-primary  py-1 px-1 md:px-3 rounded-lg ">
            <div className="flex-col items-center justify-center  gap-y-0 relative">
               <p className=" md:text-xl  m-0 p-0 text-white">Signin</p>
            </div>
          </Link>   }
        
        </div>
      </div>
    );
};

export default Navbar;