import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: [],
}

const AdminProductsSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.productList = action.payload.data
        }).addCase(fetchProducts.rejected, (state) => {
            state.isLoading = false
            state.productList = []
        })
    }
})

export const addProduct = createAsyncThunk("/products/add", async(data) => {
    const response = await axios.post("http://localhost:5000/api/admin/products/add", data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response.data);
    return response.data;
})

export const fetchProducts = createAsyncThunk("/products/get", async() => {
    const response = await axios.get("http://localhost:5000/api/admin/products/get");
    return response.data;
})

export const editProduct = createAsyncThunk("/products/edit", async({ id, data }) => {
    console.log(id);
    console.log(data);
    const response = await axios.put(`http://localhost:5000/api/admin/products/edit/${id}`, data);
    console.log(response);
    return response.data;
})

export const deleteProduct = createAsyncThunk("/product/delete", async(id) => {
    const response = await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`);
    return response.data;
})

export default AdminProductsSlice.reducer;