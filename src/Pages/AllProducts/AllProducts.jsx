import { useEffect, useState } from "react";
import UseProducts from "../../Hooks/UseProducts";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [products, isLoading, refetch] = UseProducts();
    const axiosPublic = UseAxiosPublic();

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(9);

    useEffect(() => {
        if (Array.isArray(products) && products.length > 0) {
            setAllProducts(products);
        }
    }, [products]);

    const handleSearch = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
  
        if (name) {
            axiosPublic.get('/searchproducts',{params:{ name }})
                .then(res => {
                   
                    if (Array.isArray(res.data)) {
                      
                        setAllProducts(res.data);
                        setCurrentPage(1); // Reset to the first page after search
                    }
                })
                .catch(err => console.log(err));
        }
    };

    const handleSortByDate = (order) => {
        const sortedByDate = [...allProducts].sort((a, b) => {
            return order === 'newToOld'
                ? new Date(b.productCreationDate) - new Date(a.productCreationDate)
                : new Date(a.productCreationDate) - new Date(b.productCreationDate);
        });
        setAllProducts(sortedByDate);
    };

    const handleSortByPrice = (order) => {
        const sortedByPrice = [...allProducts].sort((a, b) => {
            return order === 'lowToHigh' ? a.price - b.price : b.price - a.price;
        });
        setAllProducts(sortedByPrice);
    };

    const handleFilterByBrand = (brand) => {
        const filteredData = products.filter(product => product.brand === brand);
        setAllProducts(filteredData);
        refetch()
    };

    const handleFilterByCategory = (category) => {
        const filteredData = products.filter(product => product.category === category);
        setAllProducts(filteredData);
    };

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(allProducts.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(nextPage => nextPage + 1);
        }
    };

    return (
        <div>
            {isLoading ? (
                <div className="flex justify-center items-center text-primary mt-[10%]">
                    <span className="loading loading-bars loading-sm"></span>
                    <span className="loading loading-bars loading-md"></span>
                    <span className="loading loading-bars loading-lg"></span>
                    <span className="loading loading-bars loading-xl"></span>
                </div>
            ) : (
                <>
                    {allProducts.length > 0 ? (
                        <p className="text-black text-center text-3xl font-serif my-4 underline">Total Products: {allProducts.length}</p>
                    ) : (
                        <p className="text-black text-center text-3xl font-serif my-4 underline">No products available</p>
                    )}

                    <form onSubmit={handleSearch} className="join my-5 mx-auto flex justify-center">
                        <input type="text" required name="name" className="input text-white text-lg font-normal input-bordered join-item rounded-l-full bg-[#ADD8E6] w-full md:w-1/4" placeholder="Type Watch Name" />
                        <button type="submit" className="btn join-item rounded-r-full bg-primary border-none text-white text-xl">Search</button>
                    </form>

                    <div className="flex justify-center gap-4">
                        <select className="select select-info border-none text-black my-5 text-lg bg-[#ADD8E6]" value={productsPerPage} onChange={(e) => setProductsPerPage(Number(e.target.value))}>
                            <option value="9"> Load 9 per page</option>
                            <option value="12"> Load 12 per page</option>
                            <option value="15"> Load 15 per page</option>
                            <option value="21"> Load 21 per page</option>
                            <option value={allProducts?.length}> Load All</option>
                        </select>
                    </div>

                    <section className="mx-auto px-3 md:flex justify-center gap-2 text-black">
                        <div className="md:w-1/5 w-full md:h-screen flex-wrap gap-y-2 md:flex-col md:gap-y-3 gap-x-2">
                            <div className="m-2">
                                <select className="select select-info border-none w-full text-lg space-y-2 bg-[#ADD8E6]" onChange={(e) => handleSortByPrice(e.target.value)}>
                                    <option disabled value="">Sort by Price</option>
                                    <option value="lowToHigh">Low to High</option>
                                    <option value="highToLow">High to Low</option>
                                </select>
                            </div>
                            <div className="m-2 ">
                                <select className="select select-info border-none w-full text-lg space-y-2 bg-[#ADD8E6]" onChange={(e) => handleSortByDate(e.target.value)}>
                                    <option disabled value="">Sort by Date</option>
                                    <option value="newToOld">New to Old</option>
                                    <option value="oldToNew">Old to New</option>
                                </select>
                            </div>
                            <select name="brand" id="brand" className="rounded p-3 m-2 w-11/12 border-none bg-[#ADD8E6]" onChange={(e) => handleFilterByBrand(e.target.value)}>
                                <option disabled value="">Select Brands</option>
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

                            <select name="category" id="category" className="rounded p-3 m-2 w-11/12 md:mx-2 border-none bg-[#ADD8E6]" onChange={(e) => handleFilterByCategory(e.target.value)}>
                                <option value="">Select Categories</option>
                                <option value="Smart Watch">Smart Watches</option>
                                <option value="Classic Watch">Classic Watch</option>
                                <option value="Sports Watch">Sports Watch</option>
                                <option value="Luxury Watch">Luxury Watches</option>
                            </select>
                        </div>

                        <div className="md:w-4/5 w-full mt-2 md:mt-0">
                            <aside className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-auto">
                                {currentProducts.map((data, index) => (
                                    <div key={index} className="card shadow-xl rounded-lg border-[1px] border-gray-300 border-opacity-40">
                                        <img src={data?.productImage} alt={data.name} className="h-64 w-full rounded-t-lg" />
                                        <div className="card-body">
                                            <h2 className="card-title">{data?.productName}</h2>
                                            <p className="text-left">{data?.description}</p>
                                            <p className="text-left">{data?.productCreationDate.slice(0,10)}</p>
                                            <p className="text-left flex items-center gap-x-1 text-primary font-semibold">{data?.price} <FaBangladeshiTakaSign /></p>
                                        </div>
                                    </div>
                                ))}
                            </aside>

                            {/* Pagination Controls */}
                            <div className="flex justify-center mt-4">
                                <button
                                    className={`btn mx-1 ${currentPage === 1 ? 'btn-disabled' : 'bg-primary text-white border-none'}`}
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                >
                                    Prev
                                </button>

                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        className={`btn mx-1 ${currentPage === index + 1 ? 'bg-secondary text-white' : 'bg-primary text-white border-none'}`}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                                <button
                                    className={`btn mx-1 ${currentPage === totalPages ? 'btn-disabled' : 'bg-primary text-white border-none'}`}
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};

export default AllProducts;
