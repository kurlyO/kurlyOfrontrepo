import axios from 'axios';

export const sitelogin = async (payload) => {
  const response = await axios.post('api/', payload);
  return response;
};
