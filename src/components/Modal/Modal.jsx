import {  useEffect, useState, React } from 'react';
import styled from 'styled-components';
import { useMutation, useQueries, useQuery } from 'react-query';
import { cartAdd } from '../../api/CartAPI';
import { ModalView, ModalBackdrop, ModalGoodsNameSpan, ModalCostBox, ModalCostBoxBottom, ModalCostBottom, ModalCountBox, ModalCount, ModalBottomButton, ModalCountButton  } from './ModalStyle';

function CartModal(props) {
    const [CartCount, setCartCount] = useState(1);
    const [Total, setTotal] = useState(CartCount * props.price);
    const mutate = useMutation(cartAdd)
    const checkPrice = (num) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
  
  
    const ModalClose = (event) => {
      if (event.target == event.currentTarget) {
        props.setIsOpen(false);
      }
    };
  
    const CountHandler = (event) => {
      if (event == true && props.count > CartCount) setCartCount(CartCount + 1);
      else if (event == false && CartCount > 1) setCartCount(CartCount - 1);
    };
  
    const AddToCart = async (event) => {
      console.log('더한다!');
  
      const Payload = {
        goodsId : props.goodsId,
        amount : CartCount,
      }
  
      try {
        const res = await mutate.mutateAsync(Payload)
        console.log(res)
      } catch(error) {
        window.alert(`재고 수량 초과!`)
  
      }
      props.setIsOpen(false);
    };
  
    return (
      <>
        <ModalBackdrop onClick={ModalClose}>
          <ModalView>
            <ModalCostBox>
              <ModalGoodsNameSpan>{props.goodsName}</ModalGoodsNameSpan>
              <ModalCostBoxBottom>
                <ModalCostBottom>{checkPrice(props.price)} 원</ModalCostBottom>
                {/*----------------------------------------------------------------------------------*/}

                <ModalCountBox>
                  <ModalCountButton
                    imageUrl={'/minus.svg'}
                    onClick={() => CountHandler(false)}
                  ></ModalCountButton>
                  <ModalCount>{CartCount}</ModalCount>
                  <ModalCountButton
                    imageUrl={'/plus.svg'}
                    onClick={() => CountHandler(true)}
                  ></ModalCountButton>
                </ModalCountBox>

                {/*----------------------------------------------------------------------------------*/}

              </ModalCostBoxBottom>
              <ModalCostBoxBottom style={{ paddingTop: '80px' }}>
                <ModalCostBottom>합계</ModalCostBottom>
                <ModalCostBottom> {checkPrice(CartCount * props.price)} 원</ModalCostBottom>
              </ModalCostBoxBottom>
              <ModalCostBoxBottom>
                <ModalBottomButton
                  onClick={ModalClose}
                  textrgb="rgb(51, 51, 51)"
                  linergb="rgb(221, 221, 221)"
                  backrgb="rgb(255, 255, 255)"
                >
                  취소
                </ModalBottomButton>
                <ModalBottomButton
                  onClick={() => AddToCart()}
                  textrgb="rgb(255, 255, 255)"
                  linergb="rgb(221, 221, 221)"
                  backrgb="rgb(95, 0, 128)"
                >
                  장바구니 담기
                </ModalBottomButton>
              </ModalCostBoxBottom>
            </ModalCostBox>
          </ModalView>
        </ModalBackdrop>
      </>
    );
  };

  export default CartModal
  