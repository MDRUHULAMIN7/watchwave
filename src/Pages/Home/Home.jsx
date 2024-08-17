import { useEffect, useState } from "react";
import banner from "../../../public/images/banner.png"
import UseProducts from "../../Hooks/UseProducts";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Home = () => {
    const [products,isLoading,refetch] = UseProducts();
    const [allproducts, setProducts] = useState([]);
    console.log(products[0]);
    useEffect(() => {
        // Only update the state if the products are different from allproducts
      
            setProducts(products);
            refetch()
        
    },[products,refetch]);
    
    return (
<div>
        {
            isLoading ?
           <div className="flex justify-center items-center text-primary mt-[10%]">  
           <span className="loading loading-bars loading-sm"></span>
           <span className="loading loading-bars loading-md"></span>
           <span className="loading loading-bars loading-lg"></span>
           <span className="loading loading-bars loading-xl"></span></div> : 
<div>
<section className="h-[100vh] w-full rounded-lg ">
 <img className="w-full h-full rounded-lg" src={banner} alt="" />
</section>

<section>
<div className=" w-full mt-2 mb-5">

 <h1 className="my-4 text-3xl md:text-5xl font-serif text-white text-center">Products</h1>
     
     {isLoading ? <div className="text-5xl flex justify-center items-center">Loading</div> :
     
     
     <aside className="grid grid-cols-1 text-black sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-auto">
         {allproducts?.length > 0 && allproducts?.slice(0,9)?.map((data)=>
             <div key={data?._id} className="card bg-[#ADD8E6]  shadow-xl">
             <figure className="h-60 w-full">
               <img
               className="h-full w-full"
                 src={data?.productImage}
                 alt="Shoes" />
             </figure>
             <div className="card-body">
               <h2 className="card-title">{data?.productName}</h2>
               <p>{data?.description}</p>
               <p>{data?.brand}</p>
               <p>
                ReleaseDate : {data?.productCreationDate.slice(0,10)}
               </p>
               <p className="text-xl flex items-center gap-x-1 text-primary font-semibold">{data?.price} <FaBangladeshiTakaSign></FaBangladeshiTakaSign></p>
               
             </div>
           </div>
         )}
     </aside>}

     
     </div>
     <button className="my-5 md:ml-20"><Link to={'/allproducts'} className="text-xl text-white bg-teal-300 rounded-md px-4 py-2 text-center mb-5">  <button >Show All</button></Link></button>
   
</section>
</div>
        }
       </div>
    );
};

export default Home;