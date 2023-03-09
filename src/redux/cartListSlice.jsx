import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartList: []
}

const cartTotalSlicer = createSlice({
    name: 'cartList',
    initialState,
    reducers:{
        addToCartTotalList:(state, action) =>{
            console.log(action.payload.cartId)
            //state.cartIdList.push(action.payload.cartId)
            if(state.cartIdList.indexOf(action.payload.cartId) === -1){
                state.cartIdList.push(action.payload.cartId)
            }
        },
        removeCartTotalList:(state, action) =>{
            state.cartIdList = []
        },
        removeTargetCartTotalList: (state, action) => {
            console.log(action.payload.cartId)
            state.cartIdList = state.cartIdList.filter(item => item !== action.payload.cartId)
        }

    }
})

export const {addToCartList, removeCartList, removeTargetCartList} = cartTotalSlicer.actions
export default cartTotalSlicer.reducer;