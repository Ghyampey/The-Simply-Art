import { useState, useEffect } from "react";
import axios from "axios";
import { ModalHeading, Heading2 } from "../../components/Heading";
import { ModalPara } from "../../components/Paragraph";
import { useNavigate } from "react-router-dom";
import { ViewButton, EditButton, DeleteButton } from "../../components/Button";
import { Modal, LargeModal } from "../../components/Modal";
import { SuccessToast } from "../../helpers/Toast";
import { useUser } from "../../service/useUser";
import { deleteProduct } from "../../redux-store/productSlice";
import { useDispatch } from "react-redux";

export const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const user = useUser();
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const getBio = async () => {
        const productsData = await axios.get(
            `http://localhost:5000/api/biography/${user.id}`
        );

        const data = await productsData.data.artist;
        setName(data.name);
        console.log("getBio", data);
    };

    const getProducts = async () => {
        const productsData = await axios.get(
            `http://localhost:5000/api/artist-products/${name}`
        );

        const data = await productsData.data.product;
        setProducts(data);
        console.log("products", data);
    };

    const deleteProducts = async (id) => {
        dispatch(deleteProduct({id}))
        getProducts();
        SuccessToast("Product has been deleted.");
    };

    const updateProduct = (id) => {
        navigate(`/artist-dashboard/edit-product/${id}`);
    };

    useEffect(() => {
        getBio();
        document.title = "Manage Products | Artist Dashboard"; 
    }, []);

    useEffect(() => {
        getProducts();
    }, [deleteProducts]);

    return (
        <div className="flex flex-col gap-[40px] h-[100%] ">
            <Heading2>Products</Heading2>
            <div className="flex flex-col gap-[20px]  h-[90%] py-[30px] px-[20px] ">
                <div className="overflow-hidden font-slab">
                    <table className=" w-[100%] text-[#252733] ">
                        <thead className="text-left top-0">
                            <tr className="text-[#A4A6B3] mx-[0px] my-[0px]">
                                <th className="font-extralight">SN</th>
                                <th className="font-extralight">
                                    Product Name
                                </th>
                                <th className="font-extralight">Category</th>
                                <th className="font-extralight">Dimensions</th>
                                <th className="font-extralight">Quantity</th>
                                <th className="font-extralight">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="overflow-scroll">
                            {products.map((product, index) => {
                                return (
                                    <tr className="border-b divide-slate-400/25 h-[60px] first:border-t">
                                        <td>{index + 1}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.dimensions}</td>
                                        <td>{product.quantity}</td>
                                        <td className="">
                                            <EditButton
                                                onClick={() =>
                                                    updateProduct(product._id)
                                                }
                                            />

                                            <Modal
                                                onClick={() =>
                                                    deleteProducts(product._id)
                                                }
                                            >
                                                <ModalHeading>
                                                    Confirm Delete?
                                                </ModalHeading>
                                                <ModalPara>
                                                    Are you sure you want to
                                                    delete the following event?
                                                </ModalPara>
                                            </Modal>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
