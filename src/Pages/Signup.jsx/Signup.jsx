import { Link } from "react-router-dom";

import { useState } from "react";


import Swal from "sweetalert2";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import UseAuth from "../../Hooks/UseAuth";


const SignUp = () => {
  const axiosPublic = UseAxiosPublic();
  const [photo, setPhoto] = useState(null); // Initialize as null
  const [signupError,setsignupError]=useState("")
  const imageHostKey = import.meta.env.VITE_IMAGE_API;
  const imageHostApi = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
  const [image,setImage]=useState('')
  const {createUser,updateuserprofile}=UseAuth()
  const [loading,setLoading]=useState(false);
  const [showPassword, setShowPassword] = useState(false);
 
  const handleImageChange = (e) => {
    setPhoto(e.target.files[0]); // Get the selected file
  };

  const submitSignUp = async (e) => {
    e.preventDefault();
      setLoading(true);
      setsignupError("");
    const formData = new FormData();
    formData.append("image", photo);

    // Log the FormData content for debugging


    try {
      const res = await axiosPublic.post(imageHostApi, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const imageUrl = res.data.data.url;
      setImage(imageUrl)
  
      // Proceed with the signup process using imageUrl
    } catch (error) {
      // console.error("Error uploading image:", error);
      alert("Error uploading image",error);
    }
    const name=e.target.name.value;
    
    const email=e.target.email.value;
    
    if(email.split("@")[1]!=="gmail.com"){
      setsignupError("use valid gmail");
      setLoading(false)
      return
    }
    
    
  
    const password=e.target.password.value;
 
  setLoading(false)
    if (password.length < 6) {
    setsignupError("password should be at least 6 character");
    console.log('error');
    setLoading(false)
      return;
    } else if (!/[A-Z]/.test(password)) {
   setsignupError("password should be a Uppercase character");
   setLoading(false)
      return;
    } else if (!/[a-z]/.test(password)) {
   setsignupError("password should be a Lowercase character");
   setLoading(false)
      return;
    }

    createUser(email,password)
    .then(result=>{
     
      console.log(result);
      updateuserprofile(name,image)
      .then(result=>{
        console.log(result);
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "SignUp Successfully ",
            showConfirmButton: false,
            timer: 2000
          });
    
      })
      .then(err=>{
        setsignupError(err);
        setLoading(false)
      })
    })
    .then(err=>{
      setsignupError(err);
      setLoading(false)
    })
// 


  };
 
  return (
    <div className="flex justify-center items-center my-10 h-screen mx-auto">
      
      <div className="md:w-1/2 w-full flex justify-center">
        <div className="w-full max-w-md p-4 space-y-3 bg-base-200 rounded-xl ">
          <h1 className="text-2xl font-bold text-center">Signup</h1>
          <form onSubmit={submitSignUp} noValidate="" action="" className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="username" className="block ">Name</label>
              <input
              required
                type="text"
                name="name"
                id="username"
                placeholder="Username"
                className="w-full px-4 py-3  rounded-md border-primary border "
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="userphoto" className="block ">Photo</label>
              <input
                type="file"
                name="photo"
                required
                onChange={handleImageChange}
                id="userphoto"
                placeholder="Userphoto"
                className="w-full px-4 py-3 rounded-md border-primary border "
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="useremail" className="block ">Email</label>
              <input
              required
                type="email"
                name="email"
                id="useremail"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-md border-primary border "
              />
            </div>
            <div className="space-y-1 text-sm relative">
              <label htmlFor="password" className="block ">Password</label>
              <input
              required
              type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                className="w-full  border-primary border px-4 py-3 rounded-md"
              />
               <span
                className="absolute top-1/2 right-6"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye></FaEye> : <FaEyeSlash/>}
              </span>
          
            </div>
            <button className="block w-full p-3 text-center text-xl rounded-sm bg-primary">
             { !loading ?  <p>Sign up</p> : <AiOutlineLoading3Quarters className="animate-spin mx-auto" />} 
            </button>
          </form>
       
      
          <p className="my-1 text-lg text-red-500 font-semibold text-center w-full ">{signupError}</p>
          <p className="text-xs text-center sm:px-6 ">
            Already have an account?
            <Link rel="noopener noreferrer" to={"/signin"} className="underline dark:text-white">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
