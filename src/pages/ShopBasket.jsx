import  {  useEffect, useState, React } from 'react';
import { QueryClient, useQuery } from 'react-query';
import styled from 'styled-components';
import { StContainer, StCommonTitle } from '../elements/Common';
import { cartList, cartDel, cartPut } from '../api/CartAPI';
import { useMutation } from 'react-query';
import { ModalCountButton, ModalCountBox, ModalCount } from '../components/Modal/ModalStyle';
import { cartpost } from '../api/CartAPI';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartList, removeCartList,removeTargetCartList } from '../redux/cartCheckSlice';

function Goods({ item }) {
  const dispatch = useDispatch()
  const checkListRedux = useSelector((state) => state.cartCheckSlice)
  //console.log(item)
  const deleteMutate = useMutation(cartDel, {
    onSuccess: (data) => {
      console.log('해당 제품이 삭제 되었씀미다');
      window.location.reload()
    },
  });

  const delHandler = (id) => {
    try {
      const response = deleteMutate.mutateAsync(id);
    } catch (error) {
      console.log(error);
    }
  };
 // console.log(item);

  const [num, setNum] = useState(item.amount);
  const [selector, setSelector] = useState(true);
  const [totalPrice, setTotalPrice] = useState(null);
  //   console.log(selector);
  //   console.log(totalPrice);
  const putMutate = useMutation(cartPut, {
    onSuccess: (data) => {
      console.log('서버의 수량이 수정되었씁니다');
    },
  });

  const putHandler = (event) => {
    if (event.isPlus == true && item.goodsCount > num){
      console.log("aaaaa")
      try {
        const response = putMutate.mutateAsync({ cartId: event.cartId, isPlus: event.isPlus });
        console.log(response);
        setNum(num+1)
      } catch (error) {
        console.log(error);
    }}
    else if (event.isPlus == false && num > 1){
      console.log("sssss")
      try {
        const response = putMutate.mutateAsync({ cartId: event.cartId, isPlus: event.isPlus });
        console.log(response);
        setNum(num-1)
      } catch (error) {
        console.log(error);
    }}
  };
  //화폐단위
  const checkPrice = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const selectorHandler = () => {
    setSelector(!selector)
    if(selector == false){
      console.log("tttt")
      dispatch(addToCartList({ cartId: item.cartId}))
    }
    else{
      console.log("ssss")
      dispatch(removeTargetCartList({ cartId: item.cartId}))
    }
    console.log(checkListRedux)
  };
  const backgroundImage = selector ? '/checkOn.svg' : '/checkOff.svg';
  return (
    <ListBox key={item.id}>
      <CheckButton onClick={() => selectorHandler()} backgroundImage = {backgroundImage} />
      {/*<input value={selector} onChange={selectorHandler} type={'checkbox'} />*/}
      

      <ImgBox src={item.image} />
      <span>{item.goodsName}</span>
      <ModalCountBox>
        <ModalCountButton
          imageUrl={'/minus.svg'}
          onClick={() => putHandler({ isPlus: false, cartId: item.cartId })}
        >
          -
        </ModalCountButton>
        <ModalCount>{num}</ModalCount>
        <ModalCountButton
          imageUrl={'/plus.svg'}
          onClick={() => putHandler({ isPlus: true, cartId: item.cartId })}
        >
          +
        </ModalCountButton>
      </ModalCountBox>
      <span>{checkPrice(item.price * num)} 원</span>
      <button onClick={() => delHandler(item.cartId)}>삭제</button>
    </ListBox>
  );
}

const CheckButton = styled.div`
  width: 21px;
  height: 21px;
  background-image: url(${props => props.backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
background-color: transparent;
`
//-----------------------------------------------------------------------------------------------
function ShopBasket() {
  const dispatch = useDispatch()

  const checkListRedux = useSelector((state) => state.cartCheckSlice)
  const [finalPrice, setFinalPrice] = useState();
  const [cartLastList, setCartLastList] = useState()
  const [cartData, setCartData] = useState()
  const [checkList, SetCheckList] = useState([])
  const getCart = useQuery(['cart'], cartList);

  const postMutate = useMutation(cartpost, {
    onSuccess: (data) => {
      alert('주문 성공!');
      window.location.reload();
    },
  });
useEffect(() => {
  if(getCart.data){
    setCartData(getCart.data.data.data);
    console.log('a')
    let list = { "cartIdList" : []}
    for(let i = 0; i < getCart.data.data.data.cold.length; i++){
      checkList.push(false)
      dispatch(addToCartList({ cartId: getCart.data.data.data.cold[i].cartId}))
      list["cartIdList"].push(getCart.data.data.data.cold[i].cartId)
      console.log(getCart.data.data.data.cold[i].cartId)
    }
    for(let i = 0; i < getCart.data.data.data.frozen.length; i++){
      checkList.push(false)
      dispatch(addToCartList({ cartId: getCart.data.data.data.frozen[i].cartId}))
      list["cartIdList"].push(getCart.data.data.data.frozen[i].cartId)
      console.log(getCart.data.data.data.frozen[i].cartId)
    }
    for(let i = 0; i < getCart.data.data.data.room_temperature.length; i++){
      checkList.push(false)
      dispatch(addToCartList({ cartId: getCart.data.data.data.room_temperature[i].cartId}))
      list["cartIdList"].push(getCart.data.data.data.room_temperature[i].cartId)
      console.log(getCart.data.data.data.room_temperature[i].cartId)
    }
    setCartLastList(list)
  }
}, [getCart.data])

/*console.log(cartLastList)
console.log(checkList)
console.log(cartData)
*/
console.log(checkListRedux)

const CheckHandler = (e) => {
  let List ={"cartIdList" : []}
  for(let i = 0; i < checkList.length; i++){
      if(checkList[i] == true){
        List["cartIdList"].push(cartLastList["cartIdList"][i])
        console.log(List)
      }
  }
  setCartLastList(List)
}
  if (getCart.isLoading) {
    <h1>상품목록 가져오는중</h1>;
  }
  if (!getCart.data) {
    return <h1>다시 로그인해주세요!</h1>;
  }
  if (!getCart.data.data || getCart.data.data.length === 0) {
    return <div>장바구니 채워줘</div>;
  }
  console.log('찜목록 불러오기 성공', getCart.data.data.data);
  const orderButtonHandler = (cartIdList) => {
    try {
      const response = postMutate.mutateAsync({ cartIdList });
      console.log(cartIdList);
    } catch (error) {
      console.lof(error);
    }
  };
  const checkPrice = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <StContainer>
      <StCommonTitle>
        <StCommonTitle>장바구니</StCommonTitle>
      </StCommonTitle>
      <div>
        <ConcludeBox>
          <ShopBox>
            <EntireInT>
              <EntireInCon1>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <EntireInInput type="checkbox" />
                  <div style={{ width: '200px', fontWeight: '500', fontSize: '15px' }}>
                    전체선택 (0/0)
                  </div>
                </div>
              </EntireInCon1>
            </EntireInT>
          </ShopBox>
          <EntireMidBoxs>
            {cartData?.cold ? <div>냉장식품</div> : null}
            {cartData?.cold.map((item) => {
              return (
                <VariousGoods key={`item-${item.cartId}`}>
                  {cartData?.cold && cartData?.cold.length > 0 ? <Goods item={item} /> : null}
                </VariousGoods>
              );
            })}
            {cartData?.frozen ? <div>냉동식품</div> : null}
            {cartData?.frozen.map((item) => {
              return (
                <VariousGoods key={`item-${item.cartId}`}>
                  {cartData?.frozen && cartData?.frozen.length > 0 ? <Goods item={item} /> : null}
                </VariousGoods>
              );
            })}
            {cartData?.room_temperature ? <div>상온식품</div> : null}
            {cartData?.room_temperature.map((item) => {
              return (
                <VariousGoods key={`item-${item.cartId}`}>
                  {cartData?.room_temperature && cartData?.room_temperature.length > 0 ? (
                    <Goods item={item} />
                  ) : null}
                </VariousGoods>
              );
            })}
            {!getCart.data && (
              <React.Fragment>
                <div content="장바구니 비어있다" />
              </React.Fragment>
            )}
          </EntireMidBoxs>
        </ConcludeBox>
      </div>

      <TotalPay>
        <GoodsBox>
          <GoodsBoxText>상품금액</GoodsBoxText>
          <GoodsBoxText2></GoodsBoxText2>
        </GoodsBox>
        <GoodsBox>
          <GoodsBoxText>배송비</GoodsBoxText>
          <GoodsBoxText2>0원</GoodsBoxText2>
        </GoodsBox>
        <GoodsBox>
          <GoodsBoxText>결정예정금액</GoodsBoxText>
          <GoodsBoxText2>2원</GoodsBoxText2>
        </GoodsBox>
        <button
          onClick={() => CheckHandler()
            /*orderButtonHandler(
              Object.keys(cartData)
                .map((key) => cartData[key].map((item) => item.cartId))
                .flat()
            )*/
          }
        >
          주문하기
        </button>
      </TotalPay>
    </StContainer>
  );
}

const ConcludeBox = styled.div`
  width: 742px;
  height: 942px;
  padding: 10px 10px 10px 10px;
  margin-right: 100px;
  gap: 10px;
  border: 1px solid green;
`;

const ShopBox = styled.div`
  display: flex;
  align-items: center;
  width: 721px;
  height: 25px;
  padding: 18px 10px 16px 2px;
  font-size: 25px;
  line-height: 26px;
  font-weight: 500;
  border-bottom: 1px solid rgb(51, 51, 51);
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

const TotalPay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 284px;
  height: 254px;
  position: absolute;
  top: 0;
  margin-top: 480px;
  margin-left: 990px;
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
  border-top: 1px solid rgb(244, 244, 244);
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
