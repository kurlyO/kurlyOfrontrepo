import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {},
  //배포 모드일때 리덕스 데브툴 사용 안함
});

export default store;
