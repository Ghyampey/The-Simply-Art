import { Product } from "../../components/Product";
export const ProductList = ({ products, gridSize, type }) => {

    return (
        <div
            className={`grid grid-row-auto grid-cols-${type === "gallery" ? gridSize : "2"} sm:grid-cols-${gridSize} xl:grid-cols-${type === "gallery" ? gridSize : "3"} justify-center items-start gap-5 sm:gap-[50px] mt-[20px]  sm:px-0`}
        >
            {products.map((product) => {
                return (
                    <Product type={type} product={product}/>
                );
            })}
        </div>
    );
};
