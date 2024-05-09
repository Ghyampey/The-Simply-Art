import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../service/useUser";
import { SuccessToast, InfoToast, ErrorToast } from "../../helpers/Toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartProducts } from "../../redux-store/cartSlice";
import { getProduct } from "../../redux-store/productSlice";
import { Loader } from "../../components/LoaderWrapper";

export const ProductDetails = () => {
    const [isButtonDisabled, setIsButtonDisplayed] = useState(false);

    const user = useUser();

    const { id } = useParams();

    const dispatch = useDispatch();

    const product = useSelector((state) => state.product);

    const { getStatus, productData } = product;

    const cart = useSelector((state) => state.cart);

    const { addToCartStatus, data } = cart;

    const navigate = useNavigate();

    useEffect(() => {
        const pageTitle = productData?.product?.name + " | SimplyArt"
        document.title = pageTitle; 
      }, [id]);

    useEffect(() => {
        dispatch(getProduct({id})) 
}, [id]);

    const addProductToCart = async () => {
        try {
            const userID = user?.id;
            const productID = productData?.product?._id;
            dispatch(addToCart({ userID, productID, quantity: 1 }));

            if (addToCartStatus === "success") {
                navigate("/cart");
                SuccessToast("Product added to cart.");
            }else{
                navigate("/login");
                InfoToast("Please log in to use the cart.");
            }
           
        } catch (error) {
            console.error(error);

            navigate("/login");
            InfoToast("Please log in to use the cart.");
        }
    };

    useEffect(() => {
        if (product.quantity <= 0) {
            setIsButtonDisplayed(true);
        }
    });

    

    return (
        <div className="grid grid-row-auto lg:grid-cols-2 bg-[] justify-center lg:gap-[100px] ">
            {getStatus === "success" ?
           ( 
            <>
           <div className="bg-[#F4F4F2] lg:h-[770px] w-[100vw] lg:w-[100%] flex items-center justify-center px-12 py-7">
                <img
                    src={productData.product.url}
                    className=" mb-[10px] aspect-w-16 aspect-h-9 shadow-2xl max-h-[700px]"
                    alt="product"
                />
            </div>

            <div className="relative w-[90%] m-auto lg:m-0 lg:w-[420px] ">
                <ul className="flex flex-col gap-[2px] relative px-[10px] py-[40px] lg:py-[100px] font-slab">
                    <button
                        className="flex gap-2 items-center mb-4 lg:mb-9"
                        onClick={() => navigate(-1)}
                    >
                        <BiArrowBack /> BACK
                    </button>
                    <li className="sm:text-[34px] text-[23px]">{productData.product.name}</li>
                    <li className="text-[#65635F] text-[18px] mb-3 lg:mb-[30px]">
                        By {productData.product.artist}
                    </li>
                    <li className="text-[#65635F] text-[15px]">
                        {productData.product.category}
                    </li>
                    <li className="text-[#65635F] text-[15px] mb-3 lg:mb-[30px]">
                        {productData.product.dimensions}
                    </li>
                    <li className="text-[#65635F] text-[15px]">
                        {productData.product.description}
                    </li>
                    <hr className="h-[2px] bg-[#65635F] my-[30px]" />
                    <li className="text-[25px] mb-[30px] font-medium">
                        Rs {productData.product.price}
                    </li>
                    <button
                        className="flex justify-center items-center h-[40px] w-[350px] bg-[#161412] text-white rounded-[3px]"
                        onClick={addProductToCart}
                        disabled={isButtonDisabled}
                    >
                        {product.quantity <= 0 ? (
                            <span>SOLD OUT</span>
                        ) : (
                            <span>ADD TO CART</span>
                        )}
                    </button>
                </ul>
            </div>
            </>
    )
            :<Loader/>}
        </div>
    );
};
