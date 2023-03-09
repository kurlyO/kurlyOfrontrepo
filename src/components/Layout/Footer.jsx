import styled from 'styled-components';

const FooterStyles = styled.footer`
  width: 100%;
  height: 100px;
  display: flex;
  background-image: url(${(props) => props.imageurl});
  align-items: center;
  justify-content: center;
`;

const ImgWrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
`;

const FooterImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

function Footer() {
  return (
    <FooterStyles>
      <ImgWrapper>
        <FooterImg src="/img/Footer.PNG" alt="Footer" />
      </ImgWrapper>

      <div></div>
    </FooterStyles>
  );
}

export default Footer;
