import styled from 'styled-components';

const FooterStyles = styled.footer`
  width: 100%;
  height: 100px;
  display: flex;
  background-image: url(${(props) => props.imageurl});
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

//이미지 비율 유지하기
const ImgWrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
`;
//이미지 크기
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
