import React, { useState } from 'react';
import { QueryClient, useMutation } from 'react-query';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import {
  StInputBox,
  StInputTextBox,
  StInputText,
  StInput,
  StDupButton,
  StSpan,
} from '../elements/Input';
import { StInfoUl, StContainer, StCommonTitle } from '../elements/Common';
import { sitejoin, idCheck, emailCheck } from '../api/axios';
import { useNavigate } from 'react-router-dom';

//props확인하여 조건부 렌더링
function InputComps(props) {
  return (
    <div>
      <StInputBox showBorder={props.showBorder}>
        <StInputTextBox>
          <StInputText>
            {props.content}
            <StSpan>*</StSpan>
          </StInputText>
        </StInputTextBox>
        <StInput
          type={props.type}
          name={props.naming}
          placeholder={props.holder}
          onChange={props.onChange}
          flex={props.flex}
        />
        {props.dupButton && (
          <StDupButton type="button" onClick={props.onClick}>
            {props.dupButton}
          </StDupButton>
        )}
      </StInputBox>
    </div>
  );
}
//------------------------------------------------------------------------------------------
function Radio(props) {
  return (
    <StRadioContainer>
      <StGenderText>
        <StGenderLebel>성별</StGenderLebel>
      </StGenderText>
      <StLargeLebelBox>
        <StSmallLebelBox>
          <StLebel>
            <StLebelInput
              type={props.type}
              name={props.naming}
              value="male"
              onChange={props.onChange}
            />
            <StSpan2>남자</StSpan2>
          </StLebel>
          <StLebel>
            <StLebelInput
              type={props.type}
              name={props.naming}
              value="female"
              onChange={props.onChange}
            />
            <StSpan2>여자</StSpan2>
          </StLebel>
          <StLebel>
            <StLebelInput
              type={props.type}
              name={props.naming}
              value="선택안함"
              onChange={props.onChange}
            />
            <StSpan2>선택안함</StSpan2>
          </StLebel>
        </StSmallLebelBox>
      </StLargeLebelBox>
      <StEmpty></StEmpty>
    </StRadioContainer>
  );
}
//------------------------------------------------------------------------------------------
function SignUp() {
  const [join, setJoin] = useState({
    account: '',
    password: '',
    passwordConfirm: '',
    name: '',
    email: '',
    address: '',
    phone: '',
    gender: '',
    birth: '',
  });
  const [duplication, setDuplication] = useState(false);
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);
  //onChange 통합 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJoin({
      ...join,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const mutate = useMutation(sitejoin, {
    onSuccess: () => {
      console.log('성공');
    },
  });

  //유효성 조건
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

  //회원가입
  const joinButtonHandler = async (e) => {
    console.log('재우짱짱맨');
    e.preventDefault();
    const { account, password, name, email, address, phone, gender, birth, passwordConfirm } = join;

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
    if (password !== passwordConfirm) {
      alert('비번이 달라요');
      return;
    }
    if (duplication === false) {
      console.log('중복확인검사???');
      alert('중복검사 확인 부탁해요');
      return;
    }
    if (isDuplicateChecked === false) {
      console.log('중복확인검사???');
      alert('이메일 중복검사 확인 부탁해요');
      return;
    }
    console.log('재우짱짱맨1');
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
      const { status, message } = response.data;
      console.log(status);
      if ((status = true)) {
        navigate('/');
      } else {
        console.log('중복중복중복');
        alert('중복검사해주세요');
      }
      console.log(response);
    } catch (error) {
      console.log('중복에러에러에러');
    }
  };

  //중복검사
  const checkHandler = async (duplication) => {
    console.log(duplication);
    if (join.account && join.email) {
      let isDuplicate = false;
      if (duplication === true) {
        isDuplicate = await idCheck(join.account);
      } else if (duplication === true) {
        isDuplicate = await emailCheck(join.email);
      }
      const isNotDuplicate = !isDuplicate;
      setDuplication(isNotDuplicate);
      if (isDuplicate) {
        alert('사용가능합니다.');
      } else {
        alert('중복이 아닙니다.');
      }
    }

    // let check = '';
    // let test = null;
    // if (duplication == true) {
    //   check = join.account;
    // } else {
    //   check = join.email;
    // }
    // if (check !== '') {
    //   console.log(join.account);
    //   console.log(duplication);
    //   if (duplication == true) {
    //     test = await idCheck(check);
    //   } else {
    //     test = await emailCheck(check);
    //   }
    //   if ((test.data.success = false)) {
    //     alert('중복');
    //   } else {
    //     alert('중복아님');
    //   }
    // } else {
    //   console.log('야식은 치킨이답');
    // }
    // setDuplication(false);
    // setIsDuplicateChecked(true);
  };

  return (
    <StContainer justifyContent="center">
      <div>
        <StCommonTitle>
          <div>회원가입</div>
        </StCommonTitle>
        <StEssencial>
          <div style={{ marginBottom: '15px' }}>
            <StSpan>*</StSpan> 필수입력사항
          </div>
        </StEssencial>
        <form>
          <InputComps
            type={'text'}
            content={'아이디'}
            naming={'account'}
            holder={'아이디를 입력해주세요'}
            dupButton={'중복검사'}
            showBorder={true}
            onChange={handleInputChange}
            onClick={() => checkHandler(duplication)}
          />
          {join.account.length < 1 ? null : !validatememberId(join.account) ? (
            <StInfoUl>
              <li style={{ color: 'red' }}>4~10길이의 소문자, 숫자만 가능하다</li>
            </StInfoUl>
          ) : (
            <StInfoUl>
              <li style={{ color: 'green' }}>참 잘했어요</li>
            </StInfoUl>
          )}

          <InputComps
            type={'password'}
            content={'비밀번호'}
            naming={'password'}
            holder={'비밀번호를 입력해주세요'}
            onChange={handleInputChange}
          />
          {join.password.length < 1 ? null : !validatepassword(join.password) ? (
            <StInfoUl>
              <li style={{ color: 'red' }}>
                영문 대,소문자와 숫자, 특수기호가 적어도 1개 이상씩 포함된 8자 ~ 15자의 비밀번호여야
                합니다
              </li>
            </StInfoUl>
          ) : (
            <StInfoUl>
              <li style={{ color: 'green' }}>참 잘했어요</li>
            </StInfoUl>
          )}

          <InputComps
            type={'password'}
            content={'비밀번호 확인'}
            naming={'passwordConfirm'}
            holder={'비밀번호를 한번 더 입력해주세요'}
            onChange={handleInputChange}
          />
          {join.passwordConfirm.length < 1 ? null : join.passwordConfirm !== join.password ? (
            <StInfoUl>
              <li style={{ color: 'red' }}>비밀번호 같게 쓰도록</li>
            </StInfoUl>
          ) : (
            <StInfoUl>
              <li style={{ color: 'green' }}>둘 비번 같아요</li>
            </StInfoUl>
          )}

          <InputComps
            type={'text'}
            content={'이름'}
            naming={'name'}
            holder={'이름을 입력해주세요'}
            onChange={handleInputChange}
          />

          <InputComps
            type={'text'}
            content={'이메일'}
            naming={'email'}
            holder={'예: margetkurly@kurly.com'}
            dupButton={'중복검사'}
            onChange={handleInputChange}
            onClick={() => checkHandler(false)}
          />
          {join.email.length < 1 ? null : !validateemail(join.email) ? (
            <StInfoUl>
              <li style={{ color: 'red' }}>이메일 형식을 입력하세요</li>
            </StInfoUl>
          ) : (
            <StInfoUl>
              <li style={{ color: 'green' }}>이메일 형식을 입력했네요!</li>
            </StInfoUl>
          )}

          <InputComps
            type={'text'}
            content={'휴대폰'}
            naming={'phone'}
            holder={'숫자만 입력해주세요'}
            onChange={handleInputChange}
          />

          <Radio type={'radio'} naming={'gender'} onChange={handleInputChange} />

          <InputComps
            type={'date'}
            content={'생년월일'}
            naming={'birth'}
            onChange={handleInputChange}
          />

          <button onClick={joinButtonHandler}>버튼</button>
        </form>
      </div>
    </StContainer>
  );
}

const StEssencial = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: 30px;
`;

const StRadioContainer = styled.div`
  display: inline-flex;
  width: 100%;
  padding: 10px 20px;
`;
const StGenderText = styled.div`
  width: 139px;
  padding-top: 12px;
`;
const StGenderLebel = styled.label`
  font-weight: 500;
  color: rgb(51, 51, 51);
  line-height: 20px;
`;

const StLargeLebelBox = styled.div`
  display: flex;
  flex: 1 1;
  width: 149px;
  height: 46px;
`;
const StSmallLebelBox = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  flex-direction: row;
`;
const StLebel = styled.label`
  position: relative;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 12px 0px 9px;
`;
const StLebelInput = styled.input`
  box-sizing: border-box;
  padding: 0;
`;
const StSpan1 = styled.span`
  min-width: 24px;
  min-height: 24px;
  display: inline-block;
  position: relative;
  border-radius: 50%;
  background-color: white;
  border: 1px solid rgb(221, 221, 221);
`;
const StSpan2 = styled.span`
  position: relative;
  font-size: 16px;
  margin-left: 12px;
`;
const StEmpty = styled.div`
  width: 120px;
  margin-left: 8px;
`;

export default SignUp;
