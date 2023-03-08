import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartIdList: []
}

const cartSlicer = createSlice({
    name: 'cartCheckList',
    initialState,
    reducers:{
        addToCartList:(state, action) =>{
            console.log(action.payload.cartId)
            //state.cartIdList.push(action.payload.cartId)
            if(state.cartIdList.indexOf(action.payload.cartId) === -1){
                state.cartIdList.push(action.payload.cartId)
            }
        },
        removeCartList:(state, action) =>{
            state.cartIdList = []
        },
        removeTargetCartList: (state, action) => {
            console.log(action.payload.cartId)
            state.cartIdList = state.cartIdList.filter(item => item !== action.payload.cartId)
        }

    }
})

export const {addToCartList, removeCartList, removeTargetCartList} = cartSlicer.actions
export default cartSlicer.reducer;