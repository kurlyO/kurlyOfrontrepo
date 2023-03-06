import React from 'react';
import { QueryClient, useQuery } from 'react-query';
import styled from 'styled-components';
import { useState } from 'react';
import { StContainer, StCommonTitle } from '../elements/Common';
import { cartList } from '../api/CartAPI';
//----------------------------------------------------------------
const GoodsBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 270px;
  height: 24px;
  padding: 0;
`;
const GoodsBoxText = styled.div`
  width: 100px;
  font-size: 16px;
  font-weight: 1000;
  line-height: 24px;
  white-space: nowrap;
`;
const GoodsBoxText2 = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  text-align: right;
`;

function TotalPays(props) {
  const { isLoading, isError, data } = useQuery('cart', cartList);
  console.log(data);
  const [goodsprice, setGoodsprice] = useState(data.data.price);
  const listprice = data.data.cold[3].price;
  console.log(listprice);
  return (
    <GoodsBox>
      <GoodsBoxText>{props.content}</GoodsBoxText>
      <GoodsBoxText2>{props.price}</GoodsBoxText2>
    </GoodsBox>
  );
}
//----------------------------------------------------------------------------------

const VariousGoods = styled.h4`
  display: flex;
  justify-content: space-between;
  height: 60px;
  padding: 15px 5px 15px 0px;
  border-top: 1px solid rgb(51, 51, 51);
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
`;

const Span1 = styled.span`
  background-image: url(${(props) => props.url});
`;

const ListBox = styled.div`
  display: flex;
  justify-content: space-around;
  margin-right: 20px;
  padding: 15px 5px 15px 0px;
  width: 742px;
  height: 100px;
`;

const ImgBox = styled.img`
  width: 68px;
  height: 78px;
`;

function CartSeparate(props) {
  const [num, setNum] = useState(0);

  const { isLoading, isError, data } = useQuery('cart', cartList);

  const buttonHandler = (type) => {
    type === 'plus' ? setNum(num + 1) : setNum(num - 1);
  };

  return (
    <EntireMidBoxs>
      <VariousGoods>
        <div>
          <Span1>{props.url} </Span1>
          <Span1>{props.content}</Span1>
        </div>
      </VariousGoods>
      {data.data.cold.map((item) => {
        return (
          <ListBox key={item.id}>
            <span>
              <ImgBox src={item.image} />
            </span>
            <span>{item.goodsName}</span>
            <div style={{ display: 'flex', width: '30px', height: '30px' }}>
              <button onClick={() => buttonHandler('minus')}>-</button>
              <div>{num}</div>
              <button onClick={() => buttonHandler('plus')}>+</button>
            </div>
            <span>{item.price}</span>
          </ListBox>
        );
      })}
    </EntireMidBoxs>
  );
}

//----------------------------------------------------------------
function ShopBasket() {
  const { isLoading, isError, data } = useQuery('cart', cartList);
  if (isLoading) {
    console.log(data);
    <h1>상품목록 가져오는중</h1>;
  }
  if (!data) {
    return <h1>서버에서 찜 목록을 가져오지 못했어요!</h1>;
  }
  if (data == undefined || null) {
    <Span1>장바구니를 채워주세요</Span1>;
  }
  if (data) {
    console.log('찜목록 불러오기 성공');
  }
  console.log(data);

  return (
    <StContainer>
      <StCommonTitle top="20px">
        <StCommonTitle>장바구니</StCommonTitle>
      </StCommonTitle>
      <ShopBox>
        <EntireT>
          <EntireInT>
            <EntireInCon1>
              <div style={{ display: 'flex', marginTop: '50px', gap: '20px' }}>
                <EntireInInput type="checkbox" />
                <div style={{ width: '200px', fontWeight: '1000', fontSize: '15px' }}>
                  전체선택 (0/0)
                </div>
              </div>
            </EntireInCon1>
          </EntireInT>
        </EntireT>
        <EntireMidBox>
          {data.data === null ? <CartSeparate content="장바구니를 채워주세요!" /> : null}
          {data.data.cold ? <CartSeparate content="냉장식품" /> : null}
          {data.data.frozen ? <CartSeparate content="냉동식품" /> : null}
          {data.data.room_temperature ? <CartSeparate content="상온" /> : null}
        </EntireMidBox>
        <SideBox>
          <TotalPay>
            <TotalPays content="상품금액" price="70,800원" />
            <TotalPays content="배송비" price="0원" />
            <TotalPays content="결제예정금액" price="70,800원" />
          </TotalPay>
        </SideBox>
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
  font-size: 25px;
  line-height: 26px;
  font-weight: 500;
`;

const EntireInT = styled.div`
  display: flex;
  align-items: center;
  width: 210px;
  height: 22px;
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
`;

const EntireInInput = styled.input`
  box-sizing: border-box;
  padding: 0;
  cursor: pointer;
`;

const EntireMidBox = styled.div`
  width: 700px;
  flex-direction: column;
  position: absolute;
  margin-top: 59px;
`;

const EntireMidBoxs = styled.div`
  width: 690px;
  min-height: 100px;
`;
//#eee4e48e;
const SideBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 315px;
  margin-top: 59px;
  margin-right: 30px;
  padding: 23px 19px 20px;
`;

const TotalPay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 284px;
  height: 254px;
  position: absolute;
  top: 0;
  margin-top: 23px;
  margin-left: 10px;
  gap: 30px;
  padding: 19px 18px 18px 20px;
  border: 1px solid #f2f2f2;
  background-color: #fafafa;
`;

export default ShopBasket;
