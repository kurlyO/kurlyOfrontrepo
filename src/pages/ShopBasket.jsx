import  React, {  useEffect, useState } from 'react';
import { QueryClient, useQuery } from 'react-query';
import styled from 'styled-components';
import { StContainer, StCommonTitle } from '../elements/Common';
import { cartList, cartDel, cartPut } from '../api/CartAPI';
import { useMutation } from 'react-query';
import { ModalCountButton, ModalCountBox, ModalCount } from '../components/Modal/ModalStyle';
import { cartpost } from '../api/CartAPI';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartList, removeCartList,removeTargetCartList } from '../redux/cartCheckSlice';
import { addToCartTotalPrice, removeCartTotalPrice, removeTargetCartTotalPrice } from '../redux/cartListSlice';
import { Link } from 'react-router-dom';
import { StPuppleButton } from '../elements/Button';
function Goods(props) {
  const [num, setNum] = useState(1);
  useEffect(() => {
    setNum(props.amount)
  }, [])
  //console.log(props)
  //console.log(num)
  //console.log(props.amount)
  useEffect(() => {
    setNum(props.amount)
  }, [props.amount])
  const dispatch = useDispatch()
  const checkListRedux = useSelector((state) => state.cartCheckSlice)
  //console.log(item)
  const deleteMutate = useMutation(cartDel, {
    onSuccess: (data) => {
      console.log('해당 제품이 삭제 되었씀미다');
      window.alert('장바구니에서 해당 제품을 삭제하였습니다')
      window.location.reload();
    },
  });
  const delHandler = (id) => {
    try {
      const response = deleteMutate.mutateAsync(id);
    } catch (error) {
      console.log(error);
    }
  };
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
    if (event.isPlus == true && props.goodsCount > num) {
      console.log('추가추가');
      try {
        const response = putMutate.mutateAsync({ cartId: event.cartId, isPlus: event.isPlus });
        console.log(response);
        setNum(num + 1);
        dispatch(addToCartTotalPrice({price : props.price}))
      } catch (error) {
        console.log(error);
      }
    } else if (event.isPlus == false && num > 1) {
      console.log('sssss');
      try {
        const response = putMutate.mutateAsync({ cartId: event.cartId, isPlus: event.isPlus });
        console.log(response);
        setNum(num - 1);
        dispatch(removeTargetCartTotalPrice({price : props.price}))
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
      dispatch(addToCartList({ cartId: props.cartId}))
    }
    else{
      console.log("ssss")
      dispatch(removeTargetCartList({ cartId: props.cartId}))
    }
    console.log(checkListRedux)
  };
  const backgroundImage = selector ? '/checkOn.svg' : '/checkOff.svg';
  return (
    <ListBox key={props.id}>
      <CheckButton onClick={() => selectorHandler()} backgroundImage = {backgroundImage} />
      {/*<input value={selector} onChange={selectorHandler} type={'checkbox'} />*/}
      
      <Link to={`/detail/${props.goodsId}`} style={{ color: 'black', textDecoration: 'none' }}>
      <LinkBox>
      <ImgBox src={props.image} />
      <NameBox>
      <span>{props.goodsName}</span>
      </NameBox>
      </LinkBox>
      </Link>
      <ModalCountBox>
        <ModalCountButton
          imageUrl={'/minus.svg'}
          onClick={() => putHandler({ isPlus: false, cartId: props.cartId })}
        >
        </ModalCountButton>
        <ModalCount>{num}</ModalCount>
        <ModalCountButton
          imageUrl={'/plus.svg'}
          onClick={() => putHandler({ isPlus: true, cartId: props.cartId })}
        >
        </ModalCountButton>
      </ModalCountBox>
      <span>{checkPrice(props.price * num)} 원</span>
        <ModalCountButton
          imageUrl={'/deleteX.svg'}
          onClick={() => delHandler(props.cartId)}
        />
    </ListBox>
  );
}
const LinkBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const NameBox = styled.div`
display: flex; /* 텍스트를 가로 정렬할 flex 컨테이너로 설정합니다 */

justify-content: flex-start; /* 가로 정렬을 중앙으로 설정합니다 */
align-items: flex-start; /* 세로 정렬을 중앙으로 설정합니다 */
width: 275px; /* div의 너비를 275px로 설정합니다 */
word-wrap: break-word;
`

const CheckButton = styled.div`
  width: 23px;
  height: 23px;
  background-image: url(${props => props.backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
background-color: transparent;
`
//-----------------------------------------------------------------------------------------------
function ShopBasket() {
  const dispatch = useDispatch()
  const checkListRedux = useSelector((state) => state.cartCheckSlice)
  const checkPriceRedux = useSelector((state) => state.cartListSlice)
  const [finalPrice, setFinalPrice] = useState(0);
  const [cartLastList, setCartLastList] = useState()
  let [cartData, setCartData] = useState()
  const [checkList, SetCheckList] = useState([])
  const getCart = useQuery(['cart'], cartList,{onSuccess: (data) => {
    console.log(data.data.data)
    console.log('zzzzzzzzzzzzz')
    setCartData(data.data.data)
    console.log(finalPrice)
  }});

  const postMutate = useMutation(cartpost, {
    onSuccess: (data) => {
      alert('주문 성공!');
      window.location.reload();
    },
  });
useEffect(() => {
  if(getCart?.data){
    //setFinalPrice(0)
    dispatch(removeCartTotalPrice())
    setCartData(getCart.data.data.data);
    console.log(getCart.data.data.data)
    let list = { "cartIdList" : []}
    for(let i = 0; i < getCart.data.data.data.cold.length; i++){
      checkList.push(false)
      dispatch(addToCartList({ cartId: getCart.data.data.data.cold[i].cartId}))
      dispatch(addToCartTotalPrice( {price : (getCart.data.data.data.cold[i].price * getCart.data.data.data.cold[i].amount)}))
      list["cartIdList"].push(getCart.data.data.data.cold[i].cartId)
      setFinalPrice(finalPrice + (getCart.data.data.data.cold[i].price * getCart.data.data.data.cold[i].amount))
    }
    for(let i = 0; i < getCart.data.data.data.frozen.length; i++){
      checkList.push(false)
      dispatch(addToCartList({ cartId: getCart.data.data.data.frozen[i].cartId}))
      //
      dispatch(addToCartTotalPrice({price : (getCart.data.data.data.frozen[i].price * getCart.data.data.data.frozen[i].amount)}))
      list["cartIdList"].push(getCart.data.data.data.frozen[i].cartId)
      //setFinalPrice(finalPrice + (getCart.data.data.data.frozen[i].price * getCart.data.data.data.frozen[i].amount))
    }
    for(let i = 0; i < getCart.data.data.data.room_temperature.length; i++){
      checkList.push(false)
      dispatch(addToCartList({ cartId: getCart.data.data.data.room_temperature[i].cartId}))
      
      dispatch(addToCartTotalPrice({price : (getCart.data.data.data.room_temperature[i].price * getCart.data.data.data.room_temperature[i].amount)}))
      list["cartIdList"].push(getCart.data.data.data.room_temperature[i].cartId)
      //setFinalPrice(finalPrice + (getCart.data.data.data.room_temperature[i].price * getCart.data.data.data.room_temperature[i].amount))
    }
    setCartLastList(list)
  }
}, [getCart.data])

/*console.log(cartLastList)
console.log(checkList)
console.log(cartData)
*/
console.log(checkListRedux)
console.log(checkPriceRedux)

const CheckHandler = (e) => {
  let List ={"cartIdList" : []}
  for(let i = 0; i < checkList.length; i++){
      if(checkList[i] == true){
        List["cartIdList"].push(cartLastList["cartIdList"][i])
        console.log(List)
      }
  }
  setCartLastList(List)
  console.log(checkListRedux)
  try {
    const response = postMutate.mutateAsync(checkListRedux);
    console.log(checkListRedux);
  } catch (error) {
    console.lof(error);
  }
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
  //console.log('찜목록 불러오기 성공', getCart.data.data.data);
  //console.log(cartData)
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
        <StCommonTitle>장바구니</StCommonTitle>
      <div>
        <ConcludeBox>
          <div>
          <EntireMidBoxs>
            {cartData?.cold.length > 0 ? <div>냉장식품</div> : null}
            {cartData?.cold.map((item) => {
              return (
                <VariousGoods key={`item-${item.cartId}`}>
                  {cartData?.cold && cartData?.cold.length > 0 ?
                   <Goods cartPrice = {checkPriceRedux} cartId={item.cartId} goodsId={item.goodsId} amount={item.amount} goodsCount={item.goodsCount} goodsName={item.goodsName} image={item.image} price={item.price} /> : null}
                </VariousGoods>
              );
            })}
            {cartData?.frozen.length > 0 ? <div>냉동식품</div> : null}
            {cartData?.frozen.map((item) => {
              return (
                <VariousGoods key={`item-${item.cartId}`}>
                  {cartData?.frozen && cartData?.frozen.length > 0 ?
                   <Goods cartPrice = {checkPriceRedux} cartId={item.cartId} goodsId={item.goodsId} amount={item.amount} goodsCount={item.goodsCount} goodsName={item.goodsName} image={item.image} price={item.price} /> : null}
                </VariousGoods>
              );
            })}
            {cartData?.room_temperature.length > 0 ? <div>상온식품</div> : null}
            {cartData?.room_temperature.map((item) => {
              return (
                <VariousGoods key={`item-${item.cartId}`}>
                  {cartData?.room_temperature && cartData?.room_temperature.length > 0 ? (
                    <Goods cartPrice = {checkPriceRedux} cartId={item.cartId} goodsId={item.goodsId} amount={item.amount} goodsCount={item.goodsCount} goodsName={item.goodsName} image={item.image} price={item.price}  />
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
          </div>
      <TotalPay>
        <GoodsBox>
          <GoodsBoxText>상품금액</GoodsBoxText>
          <GoodsBoxText2>{checkPriceRedux.cartListPrice}원</GoodsBoxText2>
        </GoodsBox>
        <GoodsBox>
          <GoodsBoxText>배송비</GoodsBoxText>
          <GoodsBoxText2>0원</GoodsBoxText2>
        </GoodsBox>
        <GoodsBox>
          <GoodsBoxText>결정예정금액</GoodsBoxText>
          <GoodsBoxText2>{checkPriceRedux.cartListPrice}원</GoodsBoxText2>
        </GoodsBox>
        <StPuppleButton width = {'260px'} height = {'60px'} onClick={() => CheckHandler()}>
          주문하기
        </StPuppleButton>
      </TotalPay>
        </ConcludeBox>
      </div>

    </StContainer>
  );
}
const ConcludeBox = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-top: 6px;
width: 1050px;
padding: 10px 10px 10px 10px;
margin-right: 100px;
gap: 10px;
`;

const EntireMidBoxs = styled.div`
  width: 690px;
  min-height: 100px;
  gap: 20px;
`;
//#eee4e48e;

const TotalPay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 254px;
  top: 0;
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
border-top: 1px solid rgb(244, 244, 244);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 20px;
  padding: 5px 15px 0px;
  width: 742px;
  height: 100px;
  margin: 0px;
  & > * {
    font-size: 11pt;
  }
`;

const ImgBox = styled.img`
  width: 60px;
  height: 78px;
  margin-right: 20px;
`;

export default ShopBasket;
