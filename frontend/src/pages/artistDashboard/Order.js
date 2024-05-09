import { useState, useEffect } from "react";
import axios from "axios";
import { Heading2 } from "../../components/Heading";
import { useUser } from "../../service/useUser";
import { ArtistNavbar } from "../../components/ArtistNavbar";

export const ManageOrders = ({ userType }) => {
    useEffect(() => {
        document.title = 'Your Orders | View your Orders'; 
      }, []);
    const [orders, setOrders] = useState([]);
    const [productDetails, setProductDetails] = useState({});
    const user = useUser();

    const links = [
        { itemName: "PROFILE", link: `/user-profile/` },
        { itemName: "ORDERS", link: `/orders` },
    ];

    const [bio, setBio] = useState([]);

    const getBio = async () => {
        try {
            const productsData = await axios.get(
                `http://localhost:5000/api/biography/${user.id}`
            );

            const data = await productsData.data.artist;
            setBio(data);
        } catch {
            setBio("None");
        }
    };

    const getOrders = async () => {
        try {
            const orderData = await axios.get(
                `http://localhost:5000/api/order/${user.id}`
            );
            const orders = orderData.data.orders;
            setOrders(orders);
        } catch (err) {
            console.log(err);
        }
    };
    const getArtistOrders = async () => {
        try {
            const orderData = await axios.get(
                `http://localhost:5000/api/artist-order/${bio.name}`
            );
            const orders = orderData.data.orders;
            setOrders(orders);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getBio();
        document.title = "View Orders | Artist Dashboard"; 

    }, []);

    useEffect(() => {
        if (userType === "artist") {
            getArtistOrders();
        }
    }, [bio]);

    const getProductDetails = async (productId) => {
        try {
            const productData = await axios.get(
                `http://localhost:5000/api/products/${productId}`
            );
            const product = productData.data.product;
            return product;
        } catch (err) {
            console.log(err);
            return undefined;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const products = {};
            for (const order of orders) {
                for (const product of order.products) {
                    if (!products[product.productId]) {
                        products[product.productId] = await getProductDetails(
                            product.productId
                        );
                    }
                }
            }
            setProductDetails(products);
        };

        fetchData();
    }, [orders]);

    useEffect(() => {
        if (userType === "user") {
            getOrders();
        }
    }, [user]);

    return (
        <div
            className={`"flex flex-col gap-[40px] " ${
                userType === "user" ? "w-[70vw] m-auto h-[75vh]" : "h-[100%]"
            }`}
        >
            {userType === "user" && (
                <>
                    {" "}
                    <br />
                    <br /> <ArtistNavbar links={links} />
                </>
            )}
            <Heading2>Orders</Heading2>
            <div
                className={`"flex flex-col gap-[20px]  rounded-[10px] h-[90%] py-[30px] px-[20px] bg-white" ${
                    userType === "user" ? "" : ""
                }`}
            >
                <div
                    className={` font-slab ${
                        userType === "user"
                            ? "overflow-hidden"
                            : "overflow-hidden"
                    }`}
                >
                    <table className={`w-[100%] text-[#252733]  `}>
                        <thead className="text-left top-0">
                            <tr className="text-[#A4A6B3] mx-[0px] my-[0px]">
                                <th className="font-extralight">SN</th>
                                <th className="font-extralight">
                                    Product Name
                                </th>
                                <th className="font-extralight">Category</th>
                                <th className="font-extralight">Dimensions</th>
                                <th className="font-extralight">Quantity</th>
                            </tr>
                        </thead>
                        <tbody className="overflow-scroll">
                            {orders.map((order, index) => (
                                <tr
                                    className="border-b divide-slate-400/25 md:h-[60px] first:border-t"
                                    key={order._id}
                                >
                                    <td className="hidden md:table-cell">{index + 1}</td>
                                    {order.products.map((product, idx) => (
                                        <td key={idx}>
                                            {
                                                productDetails[
                                                    product.productId
                                                ]?.name
                                            }
                                        </td>
                                    ))}
                                    {order.products.map((product, idx) => (
                                        <td key={idx}>
                                            {
                                                productDetails[
                                                    product.productId
                                                ]?.category
                                            }
                                        </td>
                                    ))}
                                    {order.products.map((product, idx) => (
                                        <td key={idx}>
                                            {
                                                productDetails[
                                                    product.productId
                                                ]?.dimensions
                                            }
                                        </td>
                                    ))}
                                    {order.products.map((product, idx) => (
                                        <td key={idx}>{product.quantity}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
