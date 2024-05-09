import { useState, useEffect } from "react";
import axios from "axios";
import { ProductList } from "../store/ProductList";
import { Heading2 } from "../../components/Heading";
import { BlackButton } from "../../components/Button";

export const Products = () => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const productsData = await axios.get(
            `http://localhost:5000/api/products?limit=3&sort=Newest to oldest`
        );

        const data = await productsData.data.product;
        setProducts(data);
        console.log("getProducts", data);
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="px-[50px]">
            <Heading2 text="New" />
            <ProductList products={products} gridSize={3} />
            <div className="text-center">
                <BlackButton text="Visit Store" link="/store" />
            </div>
        </div>
    );
};
