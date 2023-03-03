import React from 'react';
import styled from 'styled-components';
import { StInput } from '../elements/Input';
import { StPuppleButton, StWhiteButton } from '../elements/Button';

function Login() {
  return (
    <StContainer>
      <StForm>
        <div>로그인페이지</div>
        <StInput />
        <StInput />
      </StForm>
      <StButtonDiv>
        <StPuppleButton>로그인</StPuppleButton>
        <StWhiteButton>회원가입</StWhiteButton>
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
