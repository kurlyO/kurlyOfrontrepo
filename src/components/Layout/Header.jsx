import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from '../../utils/cookies';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

const UserName = styled.span`
  padding-top: 5px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  line-height: 35px;
  letter-spacing: -0.35px;
`;
const HeaderStyles = styled.header`
  width: 90%;
  height: 100px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  box-shadow: rgb(0 0 0 / 7%) 0px 3px 4px 0px;
  justify-content: center;
`;

const CategoryBox = styled.div`
  display: flex;
  letter-spacing: -0.3px;
  background-color: rgb(255, 255, 255);
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  line-height: 2;
`;

const Span1 = styled.span`
  width: 16px;
  height: 14px;
  margin-right: 14px;
  background: url(${(props) => props.url});
`;

const Span2 = styled.span`
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.3px;
  color: rgb(51, 51, 51);
`;

const StButtonBox = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  margin: 0px 500px 70px 0px;
  right: 0;
  font-size: 12px;
`;

const TopButton = styled.button`
  display: block;
  color: ${(props) => props.color};
  background-color: white;
  border: none;
  cursor: pointer;
`;

const ShopButtonBox = styled.div`
  position: absolute;
  right: 0;
  margin: 50px 500px 0px 20px;
`;

const ShopButton = styled.button`
  display: block;
  width: 36px;
  height: 36px;
  right: 0;
  border: none;
  cursor: pointer;
  background: url(${(props) => props.url});
`;
//url은 함수로 취급해서 이렇게 props를 넘겨준다?

function Header() {
  const token = getCookie('token');
  console.log(token);

  const navigate = useNavigate();
  const logoutHandler = async () => {
    localStorage.removeItem('username');
    removeCookie('token');
    alert('로그아웃되었습니다');
    navigate('/');
    window.location.reload();
  };

  return (
    <HeaderStyles>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '103px',
          height: '20vh',
        }}
      >
        <img
          style={{ width: '103px', height: '70px' }}
          onClick={() => {
            navigate('/');
          }}
          src="https://res.kurly.com/images/marketkurly/logo/logo_x2.png"
        />

        <CategoryBox>
          <Span1 url="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNiAxNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMTZ2MS43SDBWMHptMCA2LjE1aDE2djEuN0gwdi0xLjd6bTAgNi4xNWgxNlYxNEgwdi0xLjd6IiBmaWxsPSIjMzMzIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+Cg=="></Span1>
          <Span2>카테고리</Span2>
        </CategoryBox>
      </div>
      <div style={{ marginLeft: '20px', marginBottom: '10px' }}>
        <div style={{ fontWeight: '1000', color: ' rgb(95, 0, 128)' }}>마켓컬리</div>
      </div>

      <StButtonBox>
        {!getCookie(token) && !!localStorage.getItem('username') && (
          <UserName>환영합니다 {localStorage.getItem('username')}님</UserName>
        )}

        {!token ? (
          <>
            {' '}
            <TopButton
              color="rgb(95, 0, 128)"
              onClick={() => {
                navigate('/signup');
              }}
            >
              회원가입
            </TopButton>
            <TopButton
              onClick={() => {
                navigate('/login');
              }}
            >
              로그인
            </TopButton>
          </>
        ) : (
          <TopButton color="rgb(95, 0, 128)" onClick={logoutHandler}>
            로그아웃
          </TopButton>
        )}
      </StButtonBox>

      <ShopButtonBox>
        <ShopButton
          url="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTM2IDM2SDBWMGgzNnoiLz4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1LjE2NCA2LjU0NykiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjciPgogICAgICAgICAgICA8cGF0aCBkPSJtMjUuNjggMy42Ni0yLjcyIDExLjU3SDcuMzdMNC42NiAzLjY2eiIvPgogICAgICAgICAgICA8Y2lyY2xlIGN4PSIyMC41MiIgY3k9IjIwLjc4IiByPSIyLjE0Ii8+CiAgICAgICAgICAgIDxjaXJjbGUgY3g9IjkuODEiIGN5PSIyMC43OCIgcj0iMi4xNCIvPgogICAgICAgICAgICA8cGF0aCBkPSJNMCAwaDMuOGwxLjc2IDcuNSIvPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg=="
          onClick={() => {
            navigate('/shop');
          }}
        ></ShopButton>
      </ShopButtonBox>
    </HeaderStyles>
  );
}

const LogoutButton = styled.button`
  display: none;
`;

export default Header;
