import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderStyles = styled.header`
  width: 100%;
  background: tomato;
  height: 18vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  color: white;
`;

const StButtonBox = styled.div`
  position: absolute;
  right: 0;
  margin: 0px 10px 50px 10px;
`;

function Header() {
  const navigate = useNavigate();

  return (
    <HeaderStyles>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        홈
      </button>
      <StButtonBox>
        <button
          onClick={() => {
            navigate('/signup');
          }}
        >
          회원가입
        </button>
        <button
          onClick={() => {
            navigate('/login');
          }}
        >
          로그인
        </button>
        <div>
          <button
            onClick={() => {
              navigate('/shop');
            }}
          >
            장바구니입니다
          </button>
        </div>
      </StButtonBox>
    </HeaderStyles>
  );
}

export default Header;
