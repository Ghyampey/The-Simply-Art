import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk(
    "fetch-all-products",
    async ({ searchItem, category, sort, page, limit }) => {
        const apiUri = `http://localhost:5000/api/products?name=${searchItem}&category=${category}&sort=${sort}&page=${page}&limit=${limit}`;
        const response = await axios.get(apiUri);
        return response.data;
    }
);

export const loadProducts = createAsyncThunk(
    "load-products",
    async ({ searchItem, category, sort, page, limit }) => {
        const apiUri = `http://localhost:5000/api/products?name=${searchItem}&category=${category}&sort=${sort}&page=${page}&limit=${limit}`;
        const response = await axios.get(apiUri);
        return response.data;
    }
);

export const addProducts = createAsyncThunk(
    "add-product",
    async ({ data, artistName }) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("artist", artistName);
        formData.append("category", data.category);
        formData.append("description", data.description);
        formData.append("quantity", data.quantity);
        formData.append("price", data.price);
        formData.append("dimensions", `${data.length} X ${data.breadth} in`);
        formData.append("image", data.image[0]);
        const apiUri = "http://localhost:5000/api/products";
        const response = await axios.post(apiUri, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    }
);

export const updateProducts = createAsyncThunk(
    "update-product",
    async ({ data, artistName, productEditID }) => {
        console.log(productEditID,"dd")
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("artist", artistName);
        formData.append("category", data.category);
        formData.append("description", data.description);
        formData.append("quantity", data.quantity);
        formData.append("price", data.price);
        formData.append("dimensions", `${data.length} X ${data.breadth} in`);
        formData.append("image", data.image[0]);

        const apiUri = `http://localhost:5000/api/products/${productEditID}`;
        const response = await axios.patch(apiUri, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    }
);

export const getProduct = createAsyncThunk(
    "get-product",
    async ({ id}) => {
        const apiUri =  `http://localhost:5000/api/products/${id}`;
        const response = await axios.get(apiUri);
        return response.data;
    }
);

export const deleteProduct = createAsyncThunk(
    "delete-product",
    async ({ id}) => {
        const apiUri =  `http://localhost:5000/api/products/${id}`;
        const response = await axios.delete(apiUri);
        return response.data;
    }
);


const productSlice = createSlice({
    name: "product",
    initialState: {
        data: [],
        productData : {},
        fetchStatus: "",
        addStatus: "",
        getStatus: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.fetchStatus = "success";
            })
            .addCase(fetchAllProducts.pending, (state) => {
                state.fetchStatus = "loading";
            })
            .addCase(fetchAllProducts.rejected, (state) => {
                state.fetchStatus = "error";
            })
            .addCase(loadProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.fetchStatus = "success";
            })
            .addCase(loadProducts.pending, (state) => {
                state.fetchStatus = "loading";
            })
            .addCase(loadProducts.rejected, (state) => {
                state.fetchStatus = "error";
            })
            .addCase(addProducts.fulfilled, (state, action) => {
                state.addStatus = "success";
            })
            .addCase(addProducts.pending, (state) => {
                state.addStatus = "loading";
            })
            .addCase(addProducts.rejected, (state) => {
                state.addStatus = "error";
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.productData = action.payload
                state.getStatus = "success";
            })
            .addCase(getProduct.pending, (state) => {
                state.getStatus = "loading";
            })
            .addCase(getProduct.rejected, (state) => {
                state.getStatus = "error";
            });
    },
});

export default productSlice;
