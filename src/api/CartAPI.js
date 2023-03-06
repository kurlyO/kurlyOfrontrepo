import axios from 'axios';
import { getCookie } from '../utils/cookies';

const instance = axios.create({
  baseURL: "http://sparta-kdh.kro.kr/api/travel",
})
instance.interceptors.request.use(
  (config) => {
    // 요청 헤더를 수정합니다.
    const token = getCookie('wow')
    config.headers["Authorization"] = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const cartList = async () => {
  const response = await instance.get('http://3.35.46.239/api/cart');
  return response;
};

export const cartAdd = async (data) =>{
  console.log(data)
  const response = await instance.post(`http://3.35.46.239/api/goods/amount?goodsId=${data.goodsId}&isPlus=${data.isPlus}&amount_now=${data.count}`);
  return response;
}