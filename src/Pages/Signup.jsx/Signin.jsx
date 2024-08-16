import { Link, useNavigate } from "react-router-dom";
import login from "../../../public/images/login.jpg";
import { useState } from "react";
import UseAuth from "../../Hooks/UseAuth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const SignIn = () => {
  const [signupError,setsignupError]=useState("")
  const {signInUser,googleSigin}=UseAuth()
  const [loading,setLoading]=useState(false);
  const [showPassword, setShowPassword] = useState(false);
 
  const navigate = useNavigate()
 
   const handleLogin=(e)=>{
    e.preventDefault()
    setLoading(true);
    setsignupError("");
    const email = e.target.email.value;
    const password = e.target. password.value;
    signInUser(email, password)
    .then(res=>{
     if(res?.user?.email){
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Signin Successfully ",
            showConfirmButton: false,
            timer: 2000
          });
          navigate("/")
     }
    })
    .catch(err=>{
      setsignupError(err.message)
      setLoading(false)
    })
   }
   const handlgooglesigiin=()=>{
    setsignupError("")
    setLoading(true);
    googleSigin()
    .then(res=>{
      console.log(res);
      if(res?.user?.email){

    
      
      
      
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Signin Successfully ",
        showConfirmButton: false,
        timer: 2000
      });
      navigate("/")
      setLoading(false);}
    })
    .catch(err=>{
     
      setsignupError(err.message)
      setLoading(false);
    })
  }
  return (
    <div className="flex justify-center items-center   h-svh mx-auto ">
      <div className="w-1/2 hidden md:flex justify-center  mx-auto">
        <div className="">
          <img
            className="h-[500px] 
                 "
            src={login}
            alt=""
          />
        </div>
      </div>
      <div className="md:w-1/2 w-full flex justify-center ">
        <div className="w-full   max-w-md p-8 space-y-3 bg-base-200  rounded-xl ">
          <h1 className="text-2xl font-bold text-center">Signin</h1>
          <form onSubmit={ handleLogin} noValidate="" action="" className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="username" className="block dark:text-gray-600">
                Email
              </label>
              <input
              required
                type="email"
                name="email"
                id="username"
                placeholder="Username"
                className="w-full px-4 py-3 rounded-md border-primary border  "
              />
            </div>
            <div className="space-y-1 text-sm relative">
              <label htmlFor="password" className="block dark:text-gray-600">
                Password
              </label>
              <input
              required
                  type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                className="w-full border-primary border px-4 py-3 rounded-md   "
              />
                    <span
                className="absolute top-[40%] right-6"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
              </span>
          
             
            </div>
            <button className="block w-full p-3 text-center text-xl rounded-sm bg-primary">
            { !loading ?  <p>Sign in</p> : <AiOutlineLoading3Quarters className="animate-spin mx-auto" />} 
            </button>
          </form>
          <div className="flex justify-center space-x-4">
            <button
            onClick={handlgooglesigiin}              aria-label="Log in with Google"
              className="p-3 w-full flex justify-center items-center text-xl gap-x-2 bg-primary rounded-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
           
              { !loading ?    <p>Continue with Google</p> : <AiOutlineLoading3Quarters className="animate-spin mx-auto" />} 
            </button>
          </div>
          <div className="flex items-center space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>

            <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
          </div>
          
          <p className="my-1 text-lg text-red-500 font-semibold text-center w-full ">{signupError}</p>
          <p className="text-xs text-center sm:px-6 dark:text-gray-600">
            Dont have an account?
            <Link
              rel="noopener noreferrer"
              to={"/signup"}
              className="underline text-black dark:text-white"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
