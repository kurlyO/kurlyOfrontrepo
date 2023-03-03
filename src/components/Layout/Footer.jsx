import styled from 'styled-components';

const FooterStyles = styled.footer`
  width: 100%;
  height: 100px;
  display: flex;
  background: SeaGreen;
  align-items: center;
  justify-content: center;
  a {
    color: white;
    text-decoration: none;
  }
`;

function Footer() {
  return (
    <FooterStyles>
      <div>푸터푸터</div>
    </FooterStyles>
  );
}

export default Footer;
