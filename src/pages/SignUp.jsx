import React from 'react';
import styled from 'styled-components';
import { StSignInputBox, StSignInput } from '../elements/Input';

function SignUp() {
  return (
    <StContainer>
      <StSignTitle>회원가입</StSignTitle>
      <StSignInputBox>
        <StSignInput type="text" placeholder="아이디를 입력해주세요" />
      </StSignInputBox>

      <input type="text" placeholder="비밀번호를 입력해주세요" />
      <input type="text" placeholder="비밀번호를 한번 더 입력해주세요" />
      <input type="text" placeholder="이름을 입력해 주세요" />
      <input type="text" placeholder="예: margetkurly@kurly.com" />
      <input type="text" placeholder="숫자만 입력해주세요" />
      <input type="text" placeholder="" />
    </StContainer>
  );
}

const StContainer = styled.div`
  min-width: 1050px;
  margin-top: 50px;
  margin-bottom: 60px;
  background-color: rgb(255, 255, 255);
`;

const StSignTitle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  font-size: 28px;
  line-height: 35px;
  font-weight: 500;
  text-align: center;
  letter-spacing: -1px;
  color: rgb(51, 51, 51);
`;

export default SignUp;
