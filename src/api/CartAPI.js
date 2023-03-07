import axios from 'axios';
import { getCookie } from '../utils/cookies';

const instance = axios.create({
  baseURL: 'https://spar-bk.shop',
});

instance.interceptors.request.use(
  (config) => {
    // 요청 헤더를 수정합니다.
    const token = getCookie('token');
    config.headers['Authorization'] = token;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const cartList = async () => {
  const response = await instance.get('https://spar-bk.shop/api/cart');
  return response;
};

export const cartAdd = async (data) => {
  console.log(data);
  console.log(`https://spar-bk.shop/api/cart/${data.goodsId}?amount=${data.amount}`);
  const response = await instance.post(
    //`https://spar-bk.shop/api/goods/amount?goodsId=${data.goodsId}&isPlus=${data.isPlus}&amount_now=${data.count}`
    `https://spar-bk.shop/api/cart/${data.goodsId}?amount=${data.amount}`,
    data
  );
  return response;
};

export const cartDel = async (cartId) => {
  const response = await instance.delete(`https://spar-bk.shop/api/cart/${cartId}`);
  return response;
};

export const cartPut = async ({ cartId, isPlus }) => {
  const response = await instance.put(`https://spar-bk.shop/api/cart/amount/${cartId}`, {
    isPlus,
  });
  return response;
};
//몸통은 객체에 담아서 보내기
