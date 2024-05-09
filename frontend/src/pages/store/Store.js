import { useEffect, useState } from "react";
import axios from "axios";
import { ProductList } from "./ProductList";
import { Banner } from "../../components/Banner";
import { GrFormPrevious,GrFormNext } from "react-icons/gr";
import { Search } from "../../components/Search";
import { useForm } from "react-hook-form";
import { Select } from "../../components/Select";
import { Heading, Heading1, Heading2 } from "../../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import productSlice from "../../redux-store/productSlice";
import { fetchAllProducts, loadProducts } from "../../redux-store/productSlice";
import { BrownButton } from "../../components/Button";
import { Loader } from "../../components/LoaderWrapper";

const Store = () => {
    useEffect(() => {
        document.title = "The Art Store";
    }, []);

    const [page, setPage] = useState(1);
    const dispatch = useDispatch();

    const product = useSelector((state) => state.product);

    const { fetchStatus, data: products } = product;

    const categories = [
        "Painting",
        "Sculptures",
        "Ceramics",
        "Photography",
        "Drawings",
        "Prints",
    ];

    const sort = [
        "A-Z",
        "Z-A",
        "Price:Low to High",
        "Price:High to Low",
        "Oldest to Newest",
        "Newest to oldest",
    ];
    const {
        register,
        handleSubmit,
        getValues,
        watch,
        formState: { errors },
    } = useForm();

    const fetchProducts = async () => {
        const { searchItem, category, sort } = getValues();
        dispatch(
            fetchAllProducts({
                searchItem: searchItem,
                category: category,
                sort: sort,
            })
        );
    };
    const handleLoadMore = async () => {
        const { searchItem, category, sort } = getValues();
        dispatch(
            loadProducts({
                searchItem: searchItem,
                category: category,
                sort: sort,
                page: page + 1,
            })
        );
        setPage(page+1);
    };

    const prevPage = async () => {
        const { searchItem, category, sort } = getValues();
        dispatch(
            loadProducts({
                searchItem: searchItem,
                category: category,
                sort: sort,
                page: page - 1,
            })
        );
        setPage(page-1);
    };

    useEffect(() => {
        fetchProducts();
    }, [dispatch]);

    useEffect(() => {
        setPage(1);
        // getProducts({});
    }, []);

    

    return (
        <>
            <Banner
                heading="THE ART STORE"
                img="https://res.cloudinary.com/djuzpmqlp/image/upload/v1681139641/assets/banner_yo00ky.jpg"
            />
            <div className="max-w-[1440px] m-auto flex flex-col justify-between items-center px-[5%]">
                <div
                    className=" top-[450px] bg-white xl:h-[230px] max-w-[1250px] w-[100%] m-auto xl:border px-10 py-9 xl:absolute "
                    data-aos="fade-down"
                >
                    <h2 className="text-[#726d6d] text-[18px] text-center xl:text-left font-roboto mb-2">
                        SEARCH FOR ARTWORK
                    </h2>
                    <hr className="bg-[#65635F] mb-6 lg:mb-0" />

                    <div
                        className={` gap-5 xl:gap-[50px] items-center font-slab flex-col xl:flex-row flex`}
                    >
                        <div className="absolute top-[65%] lg:top-[85%] left-0 xl:relative">
                            <Select
                                text="Sort By"
                                options={sort}
                                register={{
                                    ...register("sort", {
                                        required: "Please select an option.",
                                    }),
                                }}
                            />
                        </div>
                        <div className="absolute top-[65%] lg:top-[85%] right-0 xl:relative">
                            <Select
                                text="Category"
                                options={categories}
                                register={{
                                    ...register("category", {
                                        required: "Please select a category.",
                                    }),
                                }}
                            />
                        </div>
                        <div className="absolute top-[-85%] sm:top-[-100%] lg:top-[-125%] xl:relative">
                            <Search
                                register={{
                                    ...register("searchItem", {
                                        required:
                                            "Please enter a product name.",
                                    }),
                                }}
                                onClick={() => fetchProducts()}
                            />
                        </div>
                        <div className="hidden xl:block">
                            <BrownButton onclick={fetchProducts}>
                                FILTER
                            </BrownButton>
                        </div>

                        <div className="absolute top-[45%] flex justify-center xl:hidden">
                            <button
                                className="absolute top-[90px] w-[120px] border-b "
                                onClick={fetchProducts}
                            >
                                Show Results
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center gap-[40px] max-w-[1440px] px-5 m-auto mt-[70px] lg:mt-[150px]">
                <div className="flex justify-between items-center">
                    <p className="font-slab font-semibold text-[#605e5e]">
                        Home / Store
                    </p>
                    <p className="font-slab font-semibold text-[#605e5e]">
                        {fetchStatus === "success" && products.product.length}{" "}
                        Artworks:
                    </p>
                </div>
                <hr className="bg-[#65635F] " />
                {fetchStatus !== "success" ? (
                    <Loader />
                ) : products.product.length > 0 ? (
                    <ProductList
                        products={products.product}
                        gridSize={3}
                        type={"store"}
                    />
                ) : (
                    <div className=" h-[50vh] flex items-center justify-center">
                        <Heading1>
                            {" "}
                            There are no products available at the moment.
                        </Heading1>
                    </div>
                )}
                {fetchStatus === "success" && products.product.length > 0 && (
                    <div className="m-auto mb-5 flex">
                        <button
                            className=" w-[100px]  m-auto font-slab  font-medium  rounded-lg"
                            onClick={prevPage}
                            disabled={page===1 ? true : false}
                        >
                          <GrFormPrevious size={25} className="m-auto" />
                        </button>
                        <p className="font-slab">{page}</p>
                        <button
                            className="  w-[100px]  m-auto font-slab  font-medium  rounded-lg"
                            onClick={handleLoadMore}
                           
                        >
                           <GrFormNext size={25} className="m-auto"/>
                        </button>
                    </div>
                )}

               
            </div>
        </>
    );
};

export default Store;
