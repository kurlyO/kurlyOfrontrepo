import React from 'react';
import { QueryClient, useQuery } from 'react-query';
import styled from 'styled-components';
import { StContainer, StCommonTitle } from '../elements/Common';
import { cartList } from '../api/CartAPI';

function ShopBasket() {
  //   const { isLoading, isError, data } = useQuery('cart', cartList);
  //   if (isLoading) <h1>상품목록 가져오는중</h1>;

  return (
    <StContainer>
      <StCommonTitle top="20px">
        <StCommonTitle>장빠구니</StCommonTitle>
      </StCommonTitle>
      <ShopBox>
        <EntireT>
          <EntireInT>
            <EntireInCon1>
              <EntireInInput type="checkbox" />
              <div style={{ fontWeight: '1000', fontSize: '10px' }}>전체삭제(0/0)</div>
            </EntireInCon1>
            하
          </EntireInT>
        </EntireT>
        <EntireMidBox style={{ flexDirection: 'column' }}>
          <EntireMidBoxs>
            <>냉장(cold)</>
            {/* {data.map((item) => {
              return <div key={item.id}>{data.id}</div>;
            })} */}
          </EntireMidBoxs>
          <EntireMidBoxs>
            <>냉동(frozen)</>
          </EntireMidBoxs>
          <EntireMidBoxs>
            <>roomtemperate</>
          </EntireMidBoxs>
        </EntireMidBox>
        <SideBox>바보</SideBox>
      </ShopBox>
    </StContainer>
  );
}

const ShopBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1050px;
  height: 942px;
  letter-spacing: -0.5px;
`;

const EntireT = styled.div`
  display: flex;
  align-items: center;
  width: 721px;
  height: 25px;
  padding: 18px 10px 16px 2px;
  font-size: 14px;
  line-height: 26px;
  font-weight: 500;
  border-bottom: 1px solid black;
`;

const EntireInT = styled.div`
  display: flex;
  align-items: center;
  width: 210px;
  height: 22px;
  border: 2px solid black;
`;

const EntireInCon1 = styled.label`
  display: inline-flex;
  align-items: center;
  width: 117px;
  height: 22px;
  gap: 10px;
  font-size: 14px;
  line-height: 26px;
  padding: 0;
  color: #333;
  border: 2px solid black;
`;

const EntireInInput = styled.input`
  box-sizing: border-box;
  padding: 0;
  cursor: pointer;
`;

const EntireMidBox = styled.div`
  width: 700px;
  position: absolute;
  margin-top: 59px;
`;

const EntireMidBoxs = styled.div`
  margin-right: 1000px;
  width: 732px;
  height: 200px;
  border: 2px solid black; ;
`;

const SideBox = styled.div`
  position: relative;
  width: 284px;
  margin-top: 59px;
  margin-right: 30px;
  border: 2px solid black;
`;

export default ShopBasket;
