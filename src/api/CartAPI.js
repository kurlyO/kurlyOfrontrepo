import axios from 'axios';

export const cartList = async () => {
  const response = await axios.get('http://3.35.46.239/api/cart');
  return response;
};
