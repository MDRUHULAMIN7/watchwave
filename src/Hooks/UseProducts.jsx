
import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';
import UseAxiosPublic from './UseAxiosPublic';


const UseProducts = () => {
    
        const {user,loading}=UseAuth()
     
     const axiosPublic= UseAxiosPublic()
     
        const {data:products=[0],isLoading,refetch}=useQuery({
            queryKey:['products',user?.email],
             enabled:!loading,
            queryFn:async()=>{
                const res= await axiosPublic.get(`/allproducts`)
                 return [res.data]
            }
        })
   refetch()
   
        return [products,isLoading,refetch]
    
};

export default UseProducts;