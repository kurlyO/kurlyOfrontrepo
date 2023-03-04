import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { QueryClient, useMutation } from 'react-query';
import { StLoginInput } from '../elements/Input';
import { StPuppleButton, StWhiteButton } from '../elements/Button';
import { sitelogin } from '../api/axios';
import { setCookie } from '../utils/cookies';
import moment from 'moment/moment';

function Login() {
  const [memberId, setMemberId] = useState('');
  const [password, setPassweord] = useState('');

  const IdOnchangeHandler = (e) => {
    setMemberId(e.target.value);
  };

  const passwordOnchangeHandler = (e) => {
    setPassweord(e.target.value);
  };
  const mutate = useMutation(sitelogin);
  const navigate = useNavigate();
  //   const queryClient = new QueryClient();

  //여기서 login데이터를 담어서 비동기 함수로 쓴 이유
  const loginHandler = async () => {
    const loginData = {
      memberId: '',
      password: '',
    };
    if (!memberId || !password) {
      alert('값을 입력하셔야 하셔요');
      return;
    }
    try {
      const response = await mutate.mutateAsync(loginData); //q비동기 함수를 간편하게 호출 할 수 있게 해주는 함수
      const { status, message } = response.data;
      if (status === true) {
        alert('드디어 로그인 성공!!!');
        const expires = moment().add('60', 'm').toDate();
        const token = response.headers.authorization;
        setCookie('token', token, { expires, path: '/', sameSite: 'strict' });
        navigate('/');
      }
    } catch {
      alert('아이디, 비밀번호를 확인해주셔요..?');
    }
  };

  return (
    <StContainer>
      <StForm>
        <div>로그인페이지</div>
        <StLoginInput value={memberId} onChange={IdOnchangeHandler} />
        <StLoginInput value={password} onChange={passwordOnchangeHandler} />
      </StForm>
      <StButtonDiv>
        <StPuppleButton onClick={loginHandler}>로그인</StPuppleButton>
        <StWhiteButton onClick={() => navigate('/signup')}>회원가입</StWhiteButton>
      </StButtonDiv>
    </StContainer>
  );
}

export default Login;

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 38px;
`;

const StForm = styled.form`
  width: 340px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 340px;
  gap: 10px;
`;
