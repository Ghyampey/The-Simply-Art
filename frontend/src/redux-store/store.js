import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import artistSlice from "./artistSlice";
import artistBioSlice from "./artistBioSlice";
import eventSlice from "./eventSlice";
import exhibitionSlice from "./exhibitionSlice";
import artistProductSlice from "./artistProductSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
    reducer: {
        product: productSlice.reducer,
        event: eventSlice.reducer,
        artist: artistSlice.reducer,
        artistBio: artistBioSlice.reducer,
        exhibition: exhibitionSlice.reducer,
        artistProduct: artistProductSlice.reducer,
        cart: cartSlice.reducer,
    },
});

export default store;
