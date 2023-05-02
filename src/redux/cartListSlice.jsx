import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartListPrice: 0
}

const cartListSlice = createSlice({
    name: 'cartList',
    initialState,
    reducers:{
        addToCartTotalPrice:(state, action) =>{
            state.cartListPrice += action.payload.price
        },
        removeCartTotalPrice:(state, action) =>{
            state.cartListPrice = 0
        },
        removeTargetCartTotalPrice: (state, action) => {
            state.cartListPrice -= action.payload.price
        }

    }
})

export const {addToCartTotalPrice, removeCartTotalPrice, removeTargetCartTotalPrice} = cartListSlice.actions
export default cartListSlice.reducer;