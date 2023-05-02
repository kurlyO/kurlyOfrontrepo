import styled, { css } from "styled-components";

const ModalView = styled.div`
background-color: rgb(255, 255, 255);
min-height: 200px;
width: 380px;
overflow-x: hidden;
padding: 30px;
border-radius: 12px;
box-shadow: none;
margin: 32px;
display: flex;
flex-direction: column;
`;
const ModalBackdrop = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
z-index: 2;
`;

const ModalGoodsNameSpan = styled.span`
font-size: 14px;
line-height: 19px;
color: rgb(51, 51, 51);
display: -webkit-box;
overflow: hidden;
word-break: break-all;
white-space: normal;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
`;

const ModalCostBox = styled.div`
max-height: 355px;
min-height: 120px;
display: block;
`;
const ModalCostBoxBottom = styled.div`
display: flex;
-webkit-box-pack: justify;
justify-content: space-between;
-webkit-box-align: center;
align-items: center;
padding-top: 6px;
`;

const ModalCostBottom = styled.span`
font-weight: bold;
font-size: 18px;
color: rgb(51, 51, 51);
line-height: 21px;
`;
const ModalCountBox = styled.div`
flex-direction: row;
align-items: center;
border: 1px solid rgb(221, 223, 225);
border-radius: 3px;
display: flex;
justify-content: center;
width: 101px;
height: 36px;
`;

const ModalCount = styled.div`
display: inline-flex;
overflow: hidden;
white-space: nowrap;
justify-content: center;
font-size: 14px;
font-weight: 600;
color: rgb(51, 51, 51);
text-align: center;
width: 31px;
height: 28px;
line-height: 28px;
`;

const ModalBottomButton = styled.div`
font-size: 20px;
font-weight: bold;
display: flex;
align-items: center;
justify-content: center;
padding: 0px 10px;
text-align: center;
overflow: hidden;
width: 43%;
height: 52px;
border-radius: 5px;
color: ${(props) => props.textrgb};
background-color: ${(props) => props.backrgb};
border: 1px solid ${(props) => props.linergb};
`;

const ModalCountButton = styled.div`
display: inline-flex;
width: 28px;
height: 28px;
border: none;
font-size: 1px;
color: transparent;
background-size: cover;
background-color: transparent;
background-image: url(${(props) => props.imageUrl});
vertical-align: top;
opacity: ${(props) => props.alpha};
`;

export{ ModalView, ModalBackdrop, ModalGoodsNameSpan, ModalCostBox, ModalCostBoxBottom, ModalCostBottom, ModalCountBox, ModalCount, ModalBottomButton, ModalCountButton }