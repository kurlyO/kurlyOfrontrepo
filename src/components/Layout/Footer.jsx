import styled from 'styled-components';

const FooterStyles = styled.footer`
  width: 100%;
  height: 100px;
  display: flex;
  background-image: url(${(props) => props.imagurl});
  align-items: center;
  justify-content: center;
`;

function Footer() {
  return (
    <FooterStyles imagurl={'publicimg사진.PNG'}>
      <div>푸터푸터</div>
    </FooterStyles>
  );
}

export default Footer;
