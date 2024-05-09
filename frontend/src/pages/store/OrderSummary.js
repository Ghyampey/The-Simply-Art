import { AiOutlineShoppingCart } from "react-icons/ai";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Banner } from "../../components/Banner";
import { ProductList } from "./ProductList";
import { useUser } from "../../service/useUser";
import { InfoToast, SuccessToast } from "../../helpers/Toast";
import { Heading, Heading2 } from "../../components/Heading";
import KhaltiCheckout from "khalti-checkout-web";
import { Config } from "../../components/khalti/KhaltiConfig";

export const OrderSummary = () => {
    useEffect(() => {
        document.title = "Order Summary";
    }, []);
    let checkout = new KhaltiCheckout(Config);

    const [products, setProducts] = useState([]);
    const [delivery, setDelivery] = useState();
    const [disable, setDisable] = useState(true);
    const user = useUser();
    const [cart, setCart] = useState();
    const [subTotal, setSubTotal] = useState(0);

    const { id: deliveryID } = useParams();

    const navigate = useNavigate();

    const getCart = async () => {
        try {
            const cartData = await axios.get(
                `http://localhost:5000/api/cart/${user.id}`
            );
            const cart = cartData.data.cart;
            console.log(cart);
            setCart(cart);
        } catch (err) {
            InfoToast("Please log in to use the cart.");
        }
    };

    useEffect(() => {
        getCart();
    }, []);

    const getProducts = async (id) => {
        try {
            const productData = await axios.get(
                `http://localhost:5000/api/cartProducts/${user.id}`
            );
            console.log("details", productData.data.products);
            setProducts(productData.data.products);
        } catch (err) {
            console.log(err);
        }
    };

    const getDelivery = async (id) => {
        try {
            const deliveryData = await axios.get(
                `http://localhost:5000/api/delivery/${deliveryID}`
            );
            console.log("delivery", deliveryData.data.delivery);
            setDelivery(deliveryData.data.delivery);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getProducts();
        getDelivery();
    }, []);

    useEffect(() => {
        if (cart && products.length) {
            let total = 0;
            for (let i = 0; i < cart.items.length; i++) {
                const item = cart.items[i];
                const product = products.find((p) => p._id === item.productID);
                total += item.quantity * product.price;
            }
            setSubTotal(total);
        }
    }, [cart, products]);

    const handlePaymentSuccess = async () => {
        try {
            // Make an API request to create the order
            const response = await axios.post(
                "http://localhost:5000/api/add-order",
                {
                    userId: user.id,
                    products: products.map((product) => ({
                        productId: product._id,
                        quantity: cart.items.find(
                            (item) => item.productID === product._id
                        ).quantity,
                        artist: product.artist,
                    })),
                    total: subTotal,
                }
            );

            // If the order creation is successful
            setDisable(false);

            await axios.delete(
                `http://localhost:5000/api/delete-cart/${user.id}`
            );
            // Display a success message to the user
            SuccessToast("Order placed successfully!");

            // Redirect the user to the order confirmation or thank you page
        } catch (error) {
            console.error("Error creating order:", error);
            // Display an error message to the user
            InfoToast("Error creating order. Please try again.");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen px-[50px]">
            <div className="text-center py-[40px]">
                {" "}
                <h2 className="text-5xl font-light text-[#9F7E7E]">
                    Order Summary
                </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
                <table className="bg-white  border-gray-300 w-[70%] m-auto lg:m-0 rounded-md shadow-sm lg:h-[100px]">
                    <thead className="text-left">
                        <tr className="text-[#9F7E7E] ">
                            <th className=" text-center text-lg font-semibold">
                                SN
                            </th>
                            <th className=" text-lg font-semibold">Product</th>
                            <th className="text-center  text-lg font-semibold">
                                Quantity
                            </th>
                            <th className="text-center  text-lg font-semibold">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product, i) => {
                            console.log("product", product);

                            const item = cart.items.find(
                                (item) => item.productID === product._id
                            );

                            return (
                                <tr
                                    key={product._id}
                                    className=" py-9 border-b-2 first:border-t-2"
                                >
                                    <td className="text-center">{i + 1}</td>
                                    <td>
                                        <div className=" py-8 flex  flex-col md:flex-row gap-4 md:items-center">
                                            <img
                                                src={product.url}
                                                className="h-24 w-24 m-auto lg:m-0 object-cover"
                                                alt=""
                                            />
                                            <div>
                                                <p className="text-lg font-semibold">
                                                    {product.name}
                                                </p>
                                                <p className="text-gray-500">
                                                    Rs {product.price}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <span className="text-lg font-semibold">
                                            {item.quantity}
                                        </span>
                                    </td>

                                    <td className="text-center">
                                        <p className="text-gray-500">
                                            Rs {item.quantity * product.price}
                                        </p>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="bg-white md:w-[400px] m-auto py-[20px] px-[30px] rounded-md flex-1 mb-7">
                    <div className="flex flex-col gap-1 mb-[20px]">
                        <Heading2 text="Delivery Details" />

                        <p className="text-[#65635F] text-[16px] mt-[10px]">
                            District: {delivery?.district}
                        </p>
                        <p className="text-[#65635F] text-[16px]">
                            City: {delivery?.city}
                        </p>
                        <p className="text-[#65635F] text-[16px]">
                            Street: {delivery?.streetName}
                        </p>
                        <p className="text-[#65635F] text-[16px]">
                            Contact Number: {delivery?.contactNo}
                        </p>
                        <div className="flex items-center justify-between py-4">
                            <button
                                onClick={() => handlePaymentSuccess()}
                                className="bg-[#29CC97] text-white border border-gray-300 px-4 py-2 rounded-md shadow-sm"
                            >
                                Confirm Order
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Heading2 text="Payment Details" />
                        <p className="text-[#65635F] text-[16px] mt-[10px]">
                            Subtotal: Rs {subTotal}
                        </p>
                        <div className="flex items-center justify-between py-4">
                            <button
                                onClick={() => checkout.show({ amount: 1000 })}
                                disabled={disable}
                                className="bg-[#602c8c] text-white border border-gray-300 px-4 py-2 rounded-md shadow-sm"
                            >
                                Pay with Khalti
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
