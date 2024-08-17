import { useEffect, useState } from "react";
import UseProducts from "../../Hooks/UseProducts";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [products, isLoading, refetch] = UseProducts();
    const axiosPublic = UseAxiosPublic();

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(9);

    useEffect(() => {
        if (Array.isArray(products) && products.length > 0) { 
            setAllProducts(products);
            refetch();
        }
    }, [products, refetch]);

    const handleSearch = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        if (name) {
            axiosPublic.get('/searchproducts', { params: { name } })
                .then(res => {
                    if (Array.isArray(res.data)) { 
                        setSearchResults(res.data);
                        setCurrentPage(1);
                    }
                })
                .catch(err => console.log(err));
        } else {
            setSearchResults([]); // Reset search results if the search term is cleared
        }
    };

    const handleDate1 = () => {
        const sortedByDate = [...getCurrentProductList()].sort((a, b) => new Date(b.productCreationDate) - new Date(a.productCreationDate));
        setAllProducts(sortedByDate);
    };

    const handleDate2 = () => {
        const sortedByDate = [...getCurrentProductList()].sort((a, b) => new Date(a.productCreationDate) - new Date(b.productCreationDate));
        setAllProducts(sortedByDate);
    };

    const handlePrice1 = () => {
        const sortedByPriceAsc = [...getCurrentProductList()].sort((a, b) => a.price - b.price);
        setAllProducts(sortedByPriceAsc);
    };

    const handlePrice2 = () => {
        const sortedByPriceDesc = [...getCurrentProductList()].sort((a, b) => b.price - a.price);
        setAllProducts(sortedByPriceDesc);
    };

    const handleBrandChange = (brand) => {
        const filteredData = getCurrentProductList().filter(product => product.brand === brand);
        setAllProducts(filteredData);
    };

    const handleCategoryChange = (category) => {
        const filteredData = getCurrentProductList().filter(product => product.category === category);
        setAllProducts(filteredData);
    };

    // Helper function to determine the current product list (all products or search results)
    const getCurrentProductList = () => {
        return searchResults.length > 0 ? searchResults : allProducts;
    };

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = getCurrentProductList().slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(getCurrentProductList().length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleProductsPerPageChange = (e) => {
        setProductsPerPage(Number(e.target.value));
        setCurrentPage(1);
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
            {getCurrentProductList().length > 0 ? (
                <p className="text-black text-center text-3xl font-serif my-4 underline">Total Products: {getCurrentProductList().length}</p>
            ) : (
                <p className="text-black text-center text-3xl font-serif my-4 underline">No products available</p>
            )}

            <form onSubmit={handleSearch} className="join my-5 mx-auto flex justify-center">
                <input type="text" required name="name" className="input text-white text-lg font-normal input-bordered join-item rounded-l-full bg-[#ADD8E6] w-full md:w-1/4" placeholder="Type Watch Name" />
                <button type="submit" className="btn join-item rounded-r-full bg-primary border-none text-white text-xl">Search</button>
            </form>

            <div className="flex justify-center gap-4">
                <select className="select select-info border-none text-black my-5 text-lg bg-[#ADD8E6]" value={productsPerPage} onChange={handleProductsPerPageChange}>
                    <option value="9"> Load 9 per page</option>
                    <option value="12"> Load 12 per page</option>
                    <option value="15"> Load 15 per page</option>
                    <option value="21"> Load 21 per page</option>
                    <option value={getCurrentProductList().length}> Load All</option>
                </select>
            </div>

            <section className="mx-auto px-3 md:flex justify-center gap-2 text-black">
                <div className="md:w-1/5 w-full md:h-screen flex-wrap gap-y-2 md:flex-col md:gap-y-3 gap-x-2">
                    <div className="m-2">
                        <select className="select select-info border-none w-full text-lg space-y-2 bg-[#ADD8E6]" value="" onChange={(e) => {
                            if (e.target.value === "newToOld") {
                                handlePrice1();
                            } else if (e.target.value === "oldToNew") {
                                handlePrice2();
                            }
                        }}>
                            <option disabled value="">Sort by Price</option>
                            <option value="newToOld">Low to High</option>
                            <option value="oldToNew">High to Low</option>
                        </select>
                    </div>
                    <div className="m-2 ">
                        <select className="select select-info border-none w-full text-lg space-y-2 bg-[#ADD8E6]" value="" onChange={(e) => {
                            if (e.target.value === "newToOld") {
                                handleDate1();
                            } else if (e.target.value === "oldToNew") {
                                handleDate2();
                            }
                        }}>
                            <option disabled value="">Sort by Date</option>
                            <option value="newToOld">New to Old</option>
                            <option value="oldToNew">Old to New</option>
                        </select>
                    </div>
                    <select name="brand" id="brand" className="rounded p-3 m-2 w-11/12 border-none bg-[#ADD8E6]" value="" onChange={(e) => handleBrandChange(e.target.value)}>
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

                    <select name="category" id="category" className="rounded p-3 m-2 w-11/12 md:mx-2 border-none bg-[#ADD8E6]" value="" onChange={(e) => handleCategoryChange(e.target.value)}>
                        <option value="">Select Categories</option>
                        <option value="Smart Watch">Smart Watches</option>
                        <option value="Classic Watch">Classic Watch</option>
                        <option value="Sports Watch">Sports Watch</option>
                        <option value="Luxury Watch">Luxury Watches</option>
                    </select>
                </div>

                <div className="md:w-4/5 w-full mt-2 md:mt-0">
                    {isLoading ? (
                        <div className="flex justify-center items-center text-primary mt-[10%]">
                            <span className="loading loading-bars loading-sm"></span>
                            <span className="loading loading-bars loading-md"></span>
                            <span className="loading loading-bars loading-lg"></span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {currentProducts.map((product, index) => (
                                <div key={index} className="card card-compact w-full bg-base-100 shadow-xl">
                                    <figure>
                                        <img src={product.image} alt={product.name} className="h-[350px] w-full" />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title text-2xl font-serif underline">{product.name}</h2>
                                        <p className="text-lg">
                                            Price: <FaBangladeshiTakaSign /> {product.price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <div className="pagination my-6 flex justify-center space-x-2">
                <button onClick={handlePrevPage} className="btn btn-outline" disabled={currentPage === 1}>
                    Prev
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button key={page} onClick={() => handlePageChange(page)} className={`btn ${page === currentPage ? 'btn-primary' : 'btn-outline'}`}>
                        {page}
                    </button>
                ))}
                <button onClick={handleNextPage} className="btn btn-outline" disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllProducts;
