import { useState, useEffect } from "react";
import { Heading2 } from "../../components/Heading";
import { ViewAllButton } from "../../components/Button";
import { fetchAllProducts } from "../../redux-store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "../../components/Carousel";
import { Loader } from "../../components/LoaderWrapper";

export const NewProducts = () => {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);

    const { data, fetchStatus } = product;

    const fetchProducts = async () => {
        dispatch(
            fetchAllProducts({
                searchItem: "",
                category: "",
                sort: "Newest to oldest",
                limit: 5,
            })
        );
    };

    useEffect(() => {
        fetchProducts();
    }, [dispatch]);

    return (
        <div className="">
            <Heading2>Recently Added</Heading2>
            <br></br>
            <ViewAllButton border="black" link="/store" align="center">
                View All
            </ViewAllButton>

            <br></br>
            <br></br>
            {fetchStatus === "success" && data.product.length > 0 ? (
                <Carousel products={data.product} />
            ) : fetchStatus === "loading" ? (
                <Loader />
            ) : (
                <p className="font-libre font-[35px] text-center font">
                    There are no products available at the moment.
                </p>
            )}
        </div>
    );
};
