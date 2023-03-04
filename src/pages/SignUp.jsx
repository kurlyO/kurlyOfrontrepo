import React, { useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { StSignInputBox, StSignInput, StOneTextBox, StTwoBox } from '../elements/Input';
import { sitejoin } from '../api/axios';

function InputComp(props) {
  return (
    <>
      <StOneTextBox>
        <StTwoBox>{props.content}</StTwoBox>
      </StOneTextBox>
      <StSignInput
        type="text"
        letter={props.value}
        name={props.naming}
        placeholder={props.holder}
        onChange={props.onChange}
      />
    </>
  );
}

function SignUp() {
  const [join, setJoin] = useState({
    account: '',
    password: '',
    name: '',
    email: '',
    address: '',
    phone: '',
    gender: '',
    birth: '',
  });
  console.log(join.address);

  // const [errorview, setErrorView] = useState({

  // })

  // const mutate = useMutation(sitejoin)
  const mutate = useMutation(sitejoin, {
    onError: (error) => {
      if (error.response.status === 409) {
        alert('중복된 아이디나 닉네임이 있습니다.');
      } else {
        alert('회원가입 실패');
        console.log(error);
      }
      console.log(error);
    },
  });

  const memberIdRegEx = /^[a-z0-9]{4,10}$/;
  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
  const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const validatememberId = (account) => {
    return memberIdRegEx.test(account);
  };
  const validatepassword = (password) => {
    return passwordRegEx.test(password);
  };
  const validateemail = (email) => {
    return emailRegEx.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJoin({
      ...join,
      [name]: value,
    });
  };

  const joinButtonHandler = async (e) => {
    e.preventDefault();
    const { account, password, name, email, address, phone, gender, birth } = join;
    // if (!account || !password || !name || !email || !address) {
    //   alert('칸을 기입해주세요');
    //   return;
    // }
    // if (!validatememberId(account)) {
    //   alert('4~10길이의 소문자, 숫자만 가능하다');
    //   return;
    // }
    // if (!validatepassword(password)) {
    //   alert(
    //     '영문 대,소문자와 숫자, 특수기호가 적어도 1개 이상씩 포함된 8자 ~ 15자의 비밀번호여야 합니다'
    //   );
    //   return;
    // }
    // if (!validateemail(email)) {
    //   alert('이메일 형식으로 맞게 짜줘');
    //   return;
    // }
    const obj = {
      account,
      password,
      name,
      email,
      address,
      phone,
      gender,
      birth,
    };
    console.log(obj);
    try {
      const response = await mutate.mutateAsync(obj);
      console.log(response);
    } catch (error) {
      console.log('에러입니다');
    }
  };

  return (
    <StContainer>
      <StContainer2>
        <StSignTitle>회원가입</StSignTitle>

        <StSignInputBox>
          <form onSubmit={joinButtonHandler}>
            <StOneTextBox>
              <StTwoBox>아이디</StTwoBox>
            </StOneTextBox>
            <StSignInput
              type="text"
              name={'account'}
              placeholder="아이디를 입력해주세요"
              onChange={handleInputChange}
            />
            <div>
              <button>중복확인</button>
            </div>

            <InputComp
              letter={'비밀번호'}
              naming={'password'}
              holder={'비밀번호를 입력해주세요'}
              onChange={handleInputChange}
            />
            <InputComp
              letter={'비밀번호 확인'}
              holder={'비밀번호를 한번 더 입력해주세요'}
              onChange={handleInputChange}
            />
            <InputComp
              letter={'이름'}
              naming={'name'}
              holder={'이름을 입력해주세요'}
              onChange={handleInputChange}
            />
            <InputComp
              letter={'휴대폰'}
              naming={'phone'}
              holder={'숫자만 입력해주세요'}
              onChange={handleInputChange}
            />

            <StOneTextBox>
              <StTwoBox>이메일</StTwoBox>
            </StOneTextBox>
            <StSignInput
              type="text"
              name={'email'}
              placeholder="예: margetkurly@kurly.com"
              onChange={handleInputChange}
            />
            <div>
              <button>중복확인</button>
            </div>

            <InputComp
              content={'주소'}
              naming={'address'}
              holder={'주소를 입력해주셔욧'}
              onChange={handleInputChange}
            />
            <button>버튼</button>
          </form>
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
