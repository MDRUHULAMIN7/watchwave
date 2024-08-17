import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';
import UseAxiosPublic from './UseAxiosPublic';

const UseProducts = () => {
    const { user, loading } = UseAuth();
    const axiosPublic = UseAxiosPublic();

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get('/allproducts');
            return res.data; // Directly return the data without wrapping it in an array
        },
    });

    return [products, isLoading, refetch];
};

export default UseProducts;
