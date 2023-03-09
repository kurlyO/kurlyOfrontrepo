import { configureStore } from '@reduxjs/toolkit';
import cartCheckSlice from '../cartCheckSlice';
import cartListSlice from '../cartListSlice';

const store = configureStore({
  reducer: {cartCheckSlice: cartCheckSlice,
  cartListSlice: cartListSlice},
  //배포 모드일때 리덕스 데브툴 사용 안함
});

export default store;
