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
//장바구니 get
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

//장바구니 목록 delelet
export const cartDel = async (cartId) => {
  const response = await instance.delete(`https://spar-bk.shop/api/cart/${cartId}`);
  return response;
};

//장바구니 카운트 put
export const cartPut = async ({ cartId, isPlus }) => {
  console.log(cartId, isPlus);
  const response = await instance.put(`https://spar-bk.shop/api/cart/amount/${cartId}`, {
    isPlus,
  });
  return response;
};
//몸통은 객체에 담아서 보내기

//장바구니 수정정보 post
export const cartpost = async (cartIdList) => {
  const response = await instance.post('https://spar-bk.shop/api/cart/bought', cartIdList);
  return response;
};
