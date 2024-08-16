import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'http://localhost:5000'
})
// https://watchwave-server.vercel.app/
const UseAxiosPublic =()=>{
    return axiosPublic;
};
export default   UseAxiosPublic 