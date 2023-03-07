import React from 'react';
import { QueryClient, useQuery } from 'react-query';
import styled from 'styled-components';
import { useState } from 'react';
import { StContainer, StCommonTitle } from '../elements/Common';
import { cartList, cartDel } from '../api/CartAPI';
import { useMutation } from 'react-query';

function Goods({ item }) {
  const counter = item.amount;
  console.log(counter);
  const [num, setNum] = useState(counter);
  const numHandler = (type) => {
    counter = num;
    type === 'plus' ? setNum(num + 1) : setNum(num - 1);
  };

  //삭제
  const deleteMutate = useMutation(cartDel, {
    onSuccess: (data) => {
      console.log('해당 제품이 삭제 되었씀미다');
    },
  });

  const delHandler = (id) => {
    try {
      const response = deleteMutate.mutateAsync(id);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(item);

  return (
    <ListBox key={item.id}>
      <ImgBox src={item.image} />
      <span>{item.goodsName}</span>
      <div style={{ width: '10px', height: '10px' }}>
        <button onClick={() => numHandler('minus')}>-</button>
        <div>{counter}</div>
        <button onClick={() => numHandler('plus')}>+</button>
      </div>
      <span>{item.price * item.amount}</span>
      <button onClick={() => delHandler(item.cartId)}>삭제</button>
    </ListBox>
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
  if (!data.data || data.data.length === 0) {
    return <div>장바구니 채워줘</div>;
  }
  console.log('찜목록 불러오기 성공', data);

  const cartData = data.data;
  //   const price1 = cartData.cold[1].price;
  //   const price2 = cartData.frozen.price;
  //   const price3 = cartData.room_temperature.price;
  //   const totalPrice = price1 + price2 + price3;
  //   console.log({ price1, price2, price3 });

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
        <EntireMidBoxs>
          {cartData.cold ? <div>냉장식품</div> : null}
          {cartData.cold.map((item) => {
            return (
              <VariousGoods>
                {cartData.cold && cartData.cold.length > 0 ? <Goods item={item} /> : null}
              </VariousGoods>
            );
          })}
          {cartData.frozen ? <div>냉동식품</div> : null}
          {cartData.frozen.map((item) => {
            return (
              <VariousGoods>
                {cartData.cold && cartData.cold.length > 0 ? <Goods item={item} /> : null}
              </VariousGoods>
            );
          })}
          {cartData.room_temperature ? <div>상온식품</div> : null}
          {cartData.room_temperature.map((item) => {
            return (
              <VariousGoods>
                {cartData.room_temperature && cartData.room_temperature.length > 0 ? (
                  <Goods item={item} />
                ) : null}
              </VariousGoods>
            );
          })}

          {!data && (
            <React.Fragment>
              <div content="장바구니 비어있다" />
            </React.Fragment>
          )}
        </EntireMidBoxs>
        <EntireMidBox></EntireMidBox>
        <SideBox>
          <TotalPay>
            <GoodsBox>
              <GoodsBoxText>상품금액</GoodsBoxText>
              <GoodsBoxText2>1원</GoodsBoxText2>
            </GoodsBox>
            <GoodsBox>
              <GoodsBoxText>배송비</GoodsBoxText>
              <GoodsBoxText2>0원</GoodsBoxText2>
            </GoodsBox>
            <GoodsBox>
              <GoodsBoxText>결정예정금액</GoodsBoxText>
              <GoodsBoxText2>2원</GoodsBoxText2>
            </GoodsBox>
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
  /* position: absolute; */
  margin-top: 59px;
`;

const EntireMidBoxs = styled.div`
  width: 690px;
  min-height: 100px;
  border: 1px solid yellow;
  gap: 20px;
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
//상품금액 결정금액
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
//식품 구별판
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

export default ShopBasket;
