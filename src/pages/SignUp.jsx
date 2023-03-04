import React, { useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { StInputBox, StInputTextBox, StInputText, StInput, StDupButton } from '../elements/Input';
import { sitejoin } from '../api/axios';

//props확인하여 조건부 렌더링
function InputComps(props) {
  const [effectiveness, setEffectiveness] = useState(false);

  return (
    <div>
      <StInputBox showBorder={props.showBorder}>
        <StInputTextBox>
          <StInputText>{props.content}</StInputText>
        </StInputTextBox>
        <StInput
          type={props.type}
          name={props.naming}
          placeholder={props.holder}
          onChange={props.onChange}
        />
        {props.dupButton && <StDupButton>{props.dupButton}</StDupButton>}
      </StInputBox>
    </div>
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

    if (!validatememberId(account)) {
      alert('4~10길이의 소문자, 숫자만 가능하다');
      return;
    }
    if (!validatepassword(password)) {
      alert(
        '영문 대,소문자와 숫자, 특수기호가 적어도 1개 이상씩 포함된 8자 ~ 15자의 비밀번호여야 합니다'
      );
      return;
    }
    if (!validateemail(email)) {
      alert('이메일 형식으로 맞게 짜줘');
      return;
    }

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

  //div태그로 큰 틀로 관리
  //두 번째 div로 header빼고 박스로 관리
  // 회원가입 div width가 그 줄 차지
  // 필수입력사항 div만들기
  // input, text, button감싸는 div하나 만들어서 관리
  //

  return (
    <StContainer>
      <div>
        <StJoinTitle>
          <div>회원가입</div>
        </StJoinTitle>
        <form onSubmit={joinButtonHandler}>
          <InputComps
            type={'text'}
            content={'아이디'}
            naming={'account'}
            holder={'아이디를 입력해주세요'}
            dupButton={'중복검사'}
            showBorder={true}
            onChange={handleInputChange}
          />

          <InputComps
            type={'text'}
            content={'비밀번호'}
            naming={'password'}
            holder={'비밀번호를 입력해주세요'}
            showBorder={false}
            onChange={handleInputChange}
          />

          <InputComps
            type={'text'}
            content={'비밀번호 확인'}
            naming={'account'}
            holder={'비밀번호를 한번 더 입력해주세요'}
            onChange={handleInputChange}
          />

          <InputComps
            type={'text'}
            content={'이름'}
            naming={'name'}
            holder={'이름을 입력해주세요'}
            onChange={handleInputChange}
          />

          <InputComps
            type={'text'}
            content={'휴대폰'}
            naming={'phone'}
            holder={'숫자만 입력해주세요'}
            onChange={handleInputChange}
          />

          <InputComps
            type={'text'}
            content={'이메일'}
            naming={'email'}
            holder={'예: margetkurly@kurly.com'}
            dupButton={'중복검사'}
            onChange={handleInputChange}
          />

          <StRadioBox>
            <InputComps
              type={'radio'}
              content={'성별'}
              naming={'gender'}
              value="woman"
              onChange={handleInputChange}
            />
            <input type={'radio'} naming={'gender'} onChange={handleInputChange} />
            <input type={'radio'} naming={'gender'} onChange={handleInputChange} />
          </StRadioBox>
          <InputComps
            type={'date'}
            content={'생년월일'}
            naming={'birth'}
            onChange={handleInputChange}
          />

          <button>버튼</button>
        </form>
      </div>
    </StContainer>
  );
}

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  background-color: rgb(255, 255, 255);
  font-size: 14px;
  color: #333;
`;
const StJoinTitle = styled.div`
  margin-bottom: 50px;
  font-size: 28px;
  line-height: 35px;
  font-weight: 500;
  text-align: center;
  letter-spacing: -1px;
  color: #333;
`;

const StRadioBox = styled.div``;

export default SignUp;
