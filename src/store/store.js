import {configureStore} from "@reduxjs/toolkit"
import cartsliceReducer from "./cartSlice"

export const store = configureStore({
    reducer : {
        cart: cartsliceReducer
    }
})