import axios from 'axios';

//로그인
export const sitelogin = async (payload) => {
  const response = await axios.post('http://3.35.46.239/api/member/login', payload);
  return response;
};

//회원가입
export const sitejoin = async (payload) => {
  const response = await axios.post('http://3.35.46.239/api/member/signup', payload);
  return response;
};

//아이디 중복체크
export const idCheck = async (payload) => {
  console.log(payload)
  const response = await axios.get(`http://3.35.46.239/api/member/signup/accountCheck/${payload}`);
  console.log(response.data)
  return response;
};
//비밀번호 중복체크
export const emailCheck = async (payload) => {
  console.log(payload)
  const response = await axios.get(`http://3.35.46.239/api/member/signup/emailCheck/${payload}`);
  return response;
};

// export { sitelogin, sitejoin, idCheck, emailCheck };
