import React, { useState } from 'react';
import styled from 'styled-components';
import { StSignInputBox, StSignInput, StOneTextBox, StTwoBox } from '../elements/Input';

function SignUp() {
  const [join, setJoin] = useState({
    memberId: '',
    password: '',
    name: '',
    email: '',
    address: '',
    phone: '',
    gender: '',
    birth: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJoin({
      ...join,
      [name]: value,
    });
  };

  return (
    <StContainer>
      <StContainer2>
        <StSignTitle>회원가입</StSignTitle>
        <StSignInputBox>
          <StOneTextBox>
            <StTwoBox>아이디</StTwoBox>
          </StOneTextBox>
          <StSignInput type="text" placeholder="아이디를 입력해주세요" />
          <div>
            <button>중복확인</button>
          </div>
          <StOneTextBox>
            <StTwoBox>비밀번호</StTwoBox>
          </StOneTextBox>

          <StSignInput type="text" placeholder="비밀번호를 입력해주세요" />

          <StOneTextBox>
            <StTwoBox>비밀번호 확인</StTwoBox>
          </StOneTextBox>
          <StSignInput type="text" placeholder="비밀번호를 한번 더 입력해주세요" />

          <StOneTextBox>
            <StTwoBox>이름</StTwoBox>
          </StOneTextBox>
          <StSignInput type="text" placeholder="이름을 입력해 주세요" />

          <StOneTextBox>
            <StTwoBox>이메일</StTwoBox>
          </StOneTextBox>
          <StSignInput type="text" placeholder="예: margetkurly@kurly.com" />
          <div>
            <button>중복확인</button>
          </div>
          <StOneTextBox>
            <StTwoBox>휴대폰</StTwoBox>
          </StOneTextBox>
          <StSignInput type="text" placeholder="숫자만 입력해주세요" />
          <StOneTextBox>
            <StTwoBox>주소</StTwoBox>
          </StOneTextBox>
        </StSignInputBox>
      </StContainer2>
    </StContainer>
  );
}

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 1050px;
  margin-top: 50px;
  margin-bottom: 60px;
  background-color: rgb(255, 255, 255);
  font-size: 14px;
  color: #333;
  background-color: red;
`;

const StContainer2 = styled.div`
  color: black;
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
