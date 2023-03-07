import styled from "styled-components";

const ItemBoxContainer = styled.div`
  
    display: grid;
align-items: center;
justify-content: center;
    grid-template-columns: repeat(auto-fill, 249px);
    gap: 31px 18px;
    width: 1300px;
`;
const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 540px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const ItemImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const ItemCartButton = styled.button`
  width: 45px;
  height: 45px;
  background-image: url('/cart.svg');
  padding: 10px;
  margin: 5px;
  border: none;
  background-color: transparent;
`;

const PageContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
padding: 10px;
flex-direction: column;
text-align: center;
gap: 20px;
`;

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 180px);
  gap: 16px 83px;
  overflow: hidden;
  margin-top: 28px;
  padding: 30px 40px;
  border: 1px solid rgb(226, 226, 226);
  line-height: 20px;
`;

const CategoryButton = styled.div`
  overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`
const CategoryText = styled.a`
  background-color: transparent;
    text-decoration: none;
    color: inherit;
`


const CategoryTitle = styled.h3`
  margin-top: 50px;
  font-weight: 500;
  font-size: 28px;
  color: rgb(51, 51, 51);
  line-height: 35px;
  letter-spacing: -1px;
  text-align: center;
`;
const CategoryButtonText = styled.a`
  -webkit-text-size-adjust: 100%;
  font-family: 'Noto Sans', 'malgun gothic', AppleGothic, dotum, sans-serif;
  --swiper-theme-color: #007aff;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  font-size: 14px;
  list-style-type: none;
  line-height: 20px;
  white-space: nowrap;
  padding: 0;
  box-sizing: border-box;
  margin: 0;
  background-color: transparent;
  text-decoration: none;
  letter-spacing: -1px;
  cursor: pointer;
  font-weight: 700;
  color: rgb(95, 0, 128);
`;
export { ItemBoxContainer, ItemBox, ItemImage, ItemCartButton, PageContainer, CategoryContainer, CategoryButton, CategoryText, CategoryTitle, CategoryButtonText}