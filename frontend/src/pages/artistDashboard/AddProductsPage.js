import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../components/Input";
import { useUser } from "../../service/useUser";
import { DashboardActionButton } from "../../components/Button";
import { PromiseToast, SuccessToast } from "../../helpers/Toast";
import { useParams } from "react-router-dom";
import {  Heading2 } from "../../components/Heading";
import { Textarea } from "../../components/Input";
import { updateProducts,addProducts,getProduct } from "../../redux-store/productSlice";
import { useDispatch,useSelector } from "react-redux";

const AddProductPage = () => {
    const user = useUser();

    const { id } = useParams();

const [productEditID, setProductUpdateID] = useState(id);
    const [productToEdit, setProductToUpdate] = useState();

    const dispatch = useDispatch();

    const product = useSelector((state)=>state.product)

    const {productData, getStatus} = product

    useEffect(() => {
       

        dispatch(getProduct({id}))
        setProductToUpdate(productData.product);
      
    }, [dispatch,id]);

    const [artistName, setArtistName] = useState("");

    const categories = [
        "Painting",
        "Sculptures",
        "Ceramics",
        "Photography",
        "Drawings",
        "Prints",
    ];
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    watch("image");

    const getArtist = async (data) => {
        const response = await axios.get(
            `http://localhost:5000/api/artist/${user.id}`
        );

        setArtistName(response.data.artist.name);
    };

    useEffect(() => {
        getArtist();
        document.title = "Add Products | Artist Dashboard";
        setProductUpdateID(id)
    }, []);

    const ProductAction = async (data) => {
        const response = await axios.get(
            `http://localhost:5000/api/artist/${user.id}`
        );

        setArtistName(response.data.artist.name);
        if (!productToEdit) {
           
            dispatch( addProducts({data, artistName}))
            SuccessToast("Product has been added.");
        } else {
            dispatch(updateProducts({data, artistName,productEditID }));
            SuccessToast("Product has been updated.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-[20px]">
            <Heading2>
                {" "}
                {productToEdit ? "Update Product Details" : "Add Product"}
            </Heading2>
            <form
                className="flex flex-col gap-[20px] my-[20px]"
                onSubmit={handleSubmit(ProductAction)}
            >
                <div className="grid grid-rows-1 grid-cols-2 gap-[30px] font-slab">
                    <div className="flex flex-col gap-[20px]">
                        <label>Product Name</label>
                        <Input
                            type="text"
                            placeholder="Name"
                            defaultValue={productToEdit?.name}
                            register={{
                                ...register("name", {
                                    required: "Please enter the product name.",
                                }),
                            }}
                        />
                        <p>{errors.name?.message}</p>
                        <label>Category</label>

                        <select
                            className="w-[440px] shadow-in h-[45px] placeholder-[#9F7E7E] px-[30px]"
                            {...register("category", {
                                required: "Please select a category.",
                            })}
                            defaultValue={productToEdit?.category}
                        >
                            <option value="">Select a category</option>
                            {categories.map((category, i) => (
                                <option key={i} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <p>{errors.category?.message}</p>

                        <label>Description</label>
                        <Textarea
                            type="text"
                            placeholder="Description"
                            defaultValue={productToEdit?.description}
                            register={{
                                ...register("description", {
                                    required: "Please enter Description.",
                                }),
                            }}
                        />
                        <p>{errors.description?.message}</p>
                        <label>Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("image", {
                                required: "Please enter an image.",
                            })}
                        />
                        <p>{errors.image?.message}</p>
                    </div>
                    <div className="flex flex-col  gap-[20px]">
                        <label>Quantity</label>
                        <Input
                            type="number"
                            defaultValue={productToEdit?.quantity}
                            register={{
                                ...register("quantity", {
                                    required: "Please enter quantity.",
                                }),
                            }}
                        />
                        <p>{errors.quantity?.message}</p>
                        <label>Dimentions</label>
                        <div className="flex gap-[20px] items-center">
                            <input
                                className="w-[130px] shadow-in h-[45px] placeholder-[#9F7E7E] px-[30px]"
                                type="number"
                                placeholder="length"
                                {...register("length", {
                                    required: "Please enter the length.",
                                })}
                            />
                            <p>{errors.length?.message}</p>

                            <p>X</p>

                            <input
                                className="w-[130px] shadow-in h-[45px] placeholder-[#9F7E7E] px-[30px]"
                                type="number"
                                placeholder="breadth"
                                {...register("breadth", {
                                    required: "Please enter the breadth.",
                                })}
                            />
                            <p>{errors.breadth?.message}</p>
                            <p>Inches</p>
                        </div>

                        <label>Price</label>
                        <Input
                            type="number"
                            placeholder="Price"
                            defaultValue={productToEdit?.price}
                            register={{
                                ...register("price", {
                                    required: "Please enter the price.",
                                }),
                            }}
                        />
                        <p>{errors.price?.message}</p>
                    </div>
                </div>
                <DashboardActionButton>
                    {productToEdit ? "Update Product" : "Add Product"}
                </DashboardActionButton>
            </form>
        </div>
    );
};

export default AddProductPage;
