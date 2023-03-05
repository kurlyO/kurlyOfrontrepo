import React from 'react';
import styled from 'styled-components';
import { StInput } from '../elements/Input';
import { StPuppleButton, StWhiteButton } from '../elements/Button';
import { useParams } from 'react-router-dom';

function Detail(){
 const pam = useParams()

    return(<>
    <PageContainer>
        <DetailContainer>
            <LeftImage imageUrl = {"/title.png"}></LeftImage>
            <RightBox>
              <TopTitle>항해컬리</TopTitle>
              <TopGoodsName>골디락스 존</TopGoodsName>
              <TopGoodsSubName>항해컬리에서 자랑하는 샘플</TopGoodsSubName>
              <CostBox>
                <CostNumberSpan>999999</CostNumberSpan>
                <CostWONSpan>원</CostWONSpan>
              </CostBox>
              <DetailContentsContainer>
                <DetailContentsBox>
                  <DetailContentsBoxLeft>이게 되네?</DetailContentsBoxLeft>
                  <DetailContentsBoxRight>
                    <DetailContentsBoxRightMainP>스파르타 항해</DetailContentsBoxRightMainP>
                    <DetailContentsBoxRightSubP>항해라고 하니 제가 LA에 있던 시절이 떠오르는 군요........</DetailContentsBoxRightSubP>
                  </DetailContentsBoxRight>
                </DetailContentsBox>


                <DetailContentsBox>
                  <DetailContentsBoxLeft>이게 되네?</DetailContentsBoxLeft>
                  <DetailContentsBoxRight>
                    <DetailContentsBoxRightMainP>스파르타 항해</DetailContentsBoxRightMainP>
                    <DetailContentsBoxRightSubP>항해라고 하니 제가 LA에 있던 시절이 떠오르는 군요........</DetailContentsBoxRightSubP>
                  </DetailContentsBoxRight>
                </DetailContentsBox>
                
                <DetailContentsBox>
                  <DetailContentsBoxLeft>이게 되네?</DetailContentsBoxLeft>
                  <DetailContentsBoxRight>
                    <DetailContentsBoxRightMainP>스파르타 항해</DetailContentsBoxRightMainP>
                    <DetailContentsBoxRightSubP>항해라고 하니 제가 LA에 있던 시절이 떠오르는 군요........</DetailContentsBoxRightSubP>
                  </DetailContentsBoxRight>
                </DetailContentsBox>
                
                <DetailContentsBox>
                  <DetailContentsBoxLeft>이게 되네?</DetailContentsBoxLeft>
                  <DetailContentsBoxRight>
                    <DetailContentsBoxRightMainP>스파르타 항해</DetailContentsBoxRightMainP>
                    <DetailContentsBoxRightSubP>항해라고 하니 제가 LA에 있던 시절이 떠오르는 군요........</DetailContentsBoxRightSubP>
                  </DetailContentsBoxRight>
                </DetailContentsBox>

              </DetailContentsContainer>

            </RightBox>
        </DetailContainer>
    </PageContainer>
    </>) }
export default Detail;

//div 순서
/* 
1. 페이지 중앙정렬시킬 컨테이너 DIV
2. 제품 상세정보 좌우 정렬시킬 박스 DIV
3. 좌측 이미지 DIV
4. 우측 텍스트 담을 박스 DIV
5. 제품명과 가격 적을 상단 title DIV
6. 제품 정보 담을 DIV 리스트, 이건 컴포넌트로 만들어서 반복시키면 될 듯
7. 맨 밑에 상품선택 DIV
8. 가격, 장바구니 담기 우측 정렬시킬 DIV
9. 
*/

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;

  & > *:not(:first-child) {
    margin-top: 15px;
  }

`

//2번 항목
const DetailContainer = styled.div`
    width: 1050px;
    height: 1250px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    ;
`

//3번 항목
const LeftImage = styled.div`
background-image: url(${props => props.imageUrl});
  width: 450px;
  height: 550px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position:center center;
  border: 1px solid black;
`


//div 순서
/* 
1. 페이지 중앙정렬시킬 컨테이너 DIV
2. 제품 상세정보 좌우 정렬시킬 박스 DIV
3. 좌측 이미지 DIV
4. 우측 텍스트 담을 박스 DIV
5. 제품명과 가격 적을 상단 title DIV
6. 제품 정보 담을 DIV 리스트, 이건 컴포넌트로 만들어서 반복시키면 될 듯
7. 맨 밑에 상품선택 DIV
8. 가격, 장바구니 담기 우측 정렬시킬 DIV
9. 
*/

//4번 항목
const RightBox = styled.div`
width: 560px;
height: 1250px;
`
//5번 항목은 빼고 하나하나 넣자
const TopTitle = styled.div`
font-weight: 500;
line-height: 1.36;
letter-spacing: -0.5px;
color: #999;
margin-bottom: 6px;
width: 500px;
`

const TopGoodsName = styled.div`
width: 500px;
font-weight: 500;
font-size: 24px;
color: #333;
line-height: 34px;
letter-spacing: -0.5px;
word-break: keep-all;
margin-right: 20px;
`

const TopGoodsSubName = styled.div`
  padding-top: 5px;
    font-size: 14px;
    font-weight: 400;
    color: #b5b5b5;
    line-height: 19px;
    letter-spacing: -0.5px;
`

const CostBox = styled.div`
display: flex;
  align-items: flex-end;
    padding-top: 19px;
    font-weight: bold;
    line-height: 30px;
    letter-spacing: -0.5px;
`

const CostNumberSpan = styled.span`
padding-right: 4px;
font-size: 28px;
color: #333;`

const CostWONSpan = styled.span`
display: inline-block;
position: relative;
top: 3px;
font-size: 18px;
color: #333;
vertical-align: top;
`

const DetailContentsContainer = styled.div`
  margin-top: 20px;
`

const DetailContentsBox = styled.div`
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  margin: 0;
  padding-bottom: 10px;
    border-top: 1px solid #f4f4f4;
    font-size: 14px;
    letter-spacing: -0.5px;
    ;
`

const DetailContentsBoxLeft = styled.div`
margin: 0;
  width: 128px;
    color: #666;
    font-weight: 400;
    line-height: 19px;
`

const DetailContentsBoxRight = styled.div`
margin: 0;
display: flex;
flex-direction: column;
margin: 0px;
margin-inline-start: 40px;
`

const DetailContentsBoxRightMainP = styled.p`
margin: 0;
color: #333;
    font-weight: 400;
    line-height: 19px;
    white-space: pre-line;
    word-break: break-all;
    overflow: hidden;
`
const DetailContentsBoxRightSubP = styled.p`
margin: 0;
display: block;
    display: block;
    font-size: 12px;
    color: #666;
    padding-top: 4px;
    line-height: 16px;
    white-space: pre-line;
`