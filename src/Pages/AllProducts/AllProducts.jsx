import { useEffect, useState } from "react";
import UseProducts from "../../Hooks/UseProducts";

import { FaBangladeshiTakaSign } from "react-icons/fa6";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const AllProducts = () => {
    const [allproducts, setProducts] = useState([]);
    const [products,isLoading,refetch] = UseProducts();
    const axiosPublic=UseAxiosPublic()
console.log(products[0]);
    useEffect(() => {
        // Only update the state if the products are different from allproducts
      
            setProducts(products[0]);
            refetch()
        
    },[products,refetch]);
// handle search
    const handleSearch=(e)=>{
        e.preventDefault()
        const name = e.target.name.value;
        
        console.log(name);
        {name && axiosPublic.get('/seracproducts',{ params: { name } })
            .then(res=>{
                console.log(res);
                if(res.data){
                    setProducts(res.data)
                }
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }

    const handleDate1 = () => {
    
     
        const news = allproducts?.sort((a, b) => new Date(b.productCreationDate) - new 
                 Date(a.productCreationDate));

   setProducts(news)
        
      };
      

    const handleDate2 = () => {
       
      const news2 = allproducts?.sort((a, b) => new Date(a.productCreationDate) - new 
                        Date(b.productCreationDate));
      setProducts(news2)
      };
      
      const handlePrice1 = () => {
        console.log('Sorting by price: Low to High');
        const sortedByPriceAsc = [...allproducts]?.sort((a, b) => a.price - b.price);
        setProducts(sortedByPriceAsc);
    }
    

    const handleBrandChange = (brand) => {
  
      const filteredData = products[0]?.filter(product =>product.brand === brand );
      setProducts(filteredData)
    };
    
    
    const handlePrice2 = () => {
        console.log('Sorting by price: High to Low');
        const sortedByPriceDesc = [...allproducts]?.sort((a, b) => b.price - a.price);
        setProducts(sortedByPriceDesc);
    }

   

const handleCategoryChange = (category) => {
  const filteredData = allproducts?.filter(product => product.category  === category
  );
  setProducts(filteredData)
};



// Then render your filtered data

    
    return (
        <div>
            {allproducts.length > 0 ? (
                <p className="text-black text-center text-3xl font-serif my-4 underline">Total Products: {allproducts?.length}</p>
            ) : (
                <p className="text-black text-center text-3xl font-serif my-4 underline">No products available</p>
            )}
               <form onSubmit={handleSearch} className="join my-5 mx-auto flex justify-center">
  <input type="text"  required name="name" className="input text-white text-lg font-normal input-bordered join-item rounded-l-full bg-[#ADD8E6] w-full md:w-1/4" placeholder="Type Watch Name" />
  <button type="submit" className="btn join-item rounded-r-full bg-primary border-none text-white text-xl">Search</button>
</form>
         
            <section className="mx-auto px-3 md:flex justify-center  gap-2 text-black">
                <div className="md:w-1/5 w-full md:h-screen   flex-wrap gap-y-2 md:flex-col md:gap-y-3 gap-x-2">
                <div className="m-2">
                <select
  className="select select-info border-none w-full text-lg space-y-2  bg-[#ADD8E6]"
  onChange={(e) => {
    if (e.target.value === "newToOld") {
      handlePrice1();
    } else if (e.target.value === "oldToNew") {
      handlePrice2();
    }
  }}
>
  <option disabled selected value="">Sort by Price</option>
  <option value="newToOld">Low to High</option>
  <option value="oldToNew">High to Low</option>
</select>

                </div>
                <div className="m-2 ">
                <select
  className="select select-info border-none w-full text-lg  space-y-2  bg-[#ADD8E6]"
  onChange={(e) => {
    if (e.target.value === "newToOld") {
      handleDate1();
    } else if (e.target.value === "oldToNew") {
      handleDate2();
    }
  }}
>
  <option disabled selected value="">Sort by Date</option>
  <option value="newToOld">New to Old</option>
  <option value="oldToNew">Old to New</option>
</select>

                </div>
              {/* brand */}
                <select
  name="brand"
  id="brand"
  className=" rounded p-3 m-2 w-11/12 border-none bg-[#ADD8E6]"
  onChange={(e) => handleBrandChange(e.target.value)} // Assuming you have a function to handle the change
>
  <option disabled selected value="">Select Brands</option> {/* For showing all data when no brand is selected */}
  <option value="Rolex">Rolex</option>
  <option value="Samsung">Samsung</option>
  <option value="Tissot">Tissot</option>
  <option value="Casio">Casio</option>
  <option value="Seiko">Seiko</option>
  <option value="Omega">Omega</option>
  <option value="Rado">Rado</option>
  <option value="Citizen">Citizen</option>
  <option value="Fossil">Fossil</option>
  <option value="Longines">Longines</option>
</select>

{/* categoriess */}
<select
  name="category"
  id="category"
  className=" rounded  p-3 m-2 w-11/12 md:mx-2 border-none bg-[#ADD8E6]"
  onChange={(e) => handleCategoryChange(e.target.value)} // Assuming you have a function to handle the change
>
  <option value="">Select Categories</option> {/* For showing all data when no category is selected */}
  <option value="Smart Watch">Smart Watches</option>
  <option value="Classic Watch">Classic Watch</option>
  <option value="Sports Watch">Sports Watch</option>
  <option value="Luxury Watch">Luxury Watches</option>


</select>
 
                
                
                </div>
                <div className="md:w-4/5 w-full mt-2 md:mt-0">
                
                {isLoading ?   <div className="flex justify-center items-center text-primary mt-[10%]">  
           <span className="loading loading-bars loading-sm"></span>
           <span className="loading loading-bars loading-md"></span>
           <span className="loading loading-bars loading-lg"></span>
           <span className="loading loading-bars loading-xl"></span></div>:
                
                
                <aside className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-auto">
                    {allproducts?.length > 0 && allproducts?.map((data)=>
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
            </section>
        </div>
    );
};

export default AllProducts;

