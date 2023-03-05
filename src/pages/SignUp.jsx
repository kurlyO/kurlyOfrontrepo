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
import { StInfoUl } from '../elements/Essential';
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

    // onError: (error) => {
    //   if (error.response.status === 409) {
    //     alert('중복된 아이디나 닉네임이 있습니다.');
    //   } else {
    //     alert('회원가입 실패');
    //     console.log(error);
    //   }
    //   console.log(error);
    // },
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
      const { status, message } = response.data;
      console.log(response);
      if (status === true) {
        alert('회원가입 완료');
        navigate('/');
      }
      console.log(response);
    } catch (error) {
      console.log('에러입니다');
    }
  };

  //중복검사
  const {
    isLoading: isIdChecking,
    data: idCheckResult,
    error: idCheckError,
    refetch: refetchIdCheck,
  } = useQuery(['idCheck', join.account], () => idCheck(join.account), { enabled: false });

  const checkHandler = async () => {
    if (join.account !== '') {
      console.log(join.account);
      try {
        await refetchIdCheck();

        const isDuplicate = idCheckResult?.isDuplicate;
        console.log(idCheckResult.data);
        console.log(isDuplicate);
        if (idCheckResult.success) {
          alert('중복');
        } else {
          alert('중복아님');
        }
      } catch (error) {
        alert('중복');
      }
    } else {
      console.log('야식은 치킨이답');
    }
  };
  // const checkHandler = async () => {
  //   const { isLoading, isError, data } = useQuery(idCheck);
  //   try {
  //     if (join.account == '') {
  //       alert('중복입니다');
  //     }
  //   } catch (error) {}
  // };

  return (
    <StContainer>
      <div>
        <StJoinTitle>
          <div>회원가입</div>
        </StJoinTitle>
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
            onClick={checkHandler}
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

const StEssencial = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: 30px;
`;

//큰 div하나
//성별 큰 div하나 글씨 lebel하나
//radio div박스 하나
// 그 안에 leble박스 하나
//그 안에 input박스 type="radio"

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
