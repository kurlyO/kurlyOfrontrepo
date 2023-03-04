import axios from 'axios';
const sitelogin = async (payload) => {
  const response = await axios.post('http://3.35.46.239/api/member/login', payload);
  return response;
};

export { sitelogin };
