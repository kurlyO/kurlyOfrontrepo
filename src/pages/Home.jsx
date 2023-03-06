import { useState, React } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCookie } from '../utils/cookies';
import styled from 'styled-components';
import { useMutation, useQueries, useQuery } from 'react-query';
import { getMainList } from '../api/HomeAPI';
import { cartAdd } from '../api/CartAPI';

const CartModal = (props) =>{
  const [CartCount, setCartCount] = useState(1)
  const [Total, setTotal] = useState(CartCount * props.price)

  const ModalClose = (event) =>{
    if(event.target == event.currentTarget){
      props.setIsOpen(false)
    }
  }

  const CountHandler = (event) =>{
    if(event == true && props.count) setCartCount(CartCount + 1)
    else if(CartCount > 1)setCartCount(CartCount - 1)

  }

  const AddToCart = async (event) =>{
    console.log("더한다!")
    try{
    }
    catch{

    }
    props.setIsOpen(false)
  }


      return(<>

<ModalBackdrop onClick={ModalClose}>
<ModalView>
  <ModalCostBox>
  <ModalGoodsNameSpan>{props.goodsName}</ModalGoodsNameSpan>
  <ModalCostBoxBottom>
        <ModalCostBottom>{props.price} 원</ModalCostBottom>
        <ModalCountBox>
          <ModalCountButton imageUrl = {'/minus.svg'} onClick={()=> CountHandler(false)}></ModalCountButton>
          <ModalCount>{CartCount}</ModalCount>
          <ModalCountButton imageUrl = {'/plus.svg'}  onClick={()=> CountHandler(true)}></ModalCountButton>

        </ModalCountBox>
  </ModalCostBoxBottom>
        <ModalCostBoxBottom style={{ paddingTop: '80px' }}>
          <ModalCostBottom>합계</ModalCostBottom>
          <ModalCostBottom> {CartCount * props.price} 원</ModalCostBottom>
        </ModalCostBoxBottom>
        <ModalCostBoxBottom>
          <ModalBottomButton onClick={ModalClose} textrgb ='rgb(51, 51, 51)' linergb = 'rgb(221, 221, 221)' backrgb = 'rgb(255, 255, 255)'>취소</ModalBottomButton>
          <ModalBottomButton onClick={()=>AddToCart()} textrgb ='rgb(255, 255, 255)' linergb = 'rgb(221, 221, 221)' backrgb = 'rgb(95, 0, 128)'>장바구니 담기</ModalBottomButton>

        </ModalCostBoxBottom>

  </ModalCostBox>
</ModalView>



</ModalBackdrop>
      
      </>)
}

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
`
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
`

const ModalCostBox = styled.div`
max-height: 355px;
min-height: 120px;
display: block;
`
const ModalCostBoxBottom = styled.div`
  
  display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    padding-top: 6px;
`

const ModalCostBottom = styled.span`

 font-weight: bold;
    font-size: 18px;
    color: rgb(51, 51, 51);
    line-height: 21px;
`
const ModalCountBox = styled.div`
  flex-direction: row;
    align-items: center;
    border: 1px solid rgb(221, 223, 225);
    border-radius: 3px;
    display: flex;
    justify-content: center;
    width: 101px;
    height: 36px;
`

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
`

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
    border: 1px solid  ${(props) => props.linergb};
`

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
`

function ShowItems(props) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const AddMutate = useMutation(cartAdd, {
    onSuccess: (data) =>{

      console.log("추가 성공!")

    }})

  const CartAdd = (event) =>{
    setIsOpen(true)
    if(getCookie('token') != null){
      //여기에 서버 POST 할거야
      event.preventDefault();
      event.stopPropagation();
      //AddMutate.mutate()
      
      console.log("아씨오!")
    }
    else{
      //여기다 로컬 저장할거고
      event.preventDefault();
      event.stopPropagation();
      console.log("아바다케다브라")
    }
  }
  
  return (
    <>
    <Link to = {`detail/${props.goodsId}`} style={{ color: 'black', textDecoration: 'none' }}>
      <ItemBox>
        <ItemImage imageUrl={props.imageUrl}>
          <ItemCartButton onClick={CartAdd}/>

        </ItemImage>
        <h3>{props.id}</h3>
        <h3>{props.title}</h3>
        <h3>{props.price}</h3>
      </ItemBox>
    </Link>
    {(isOpen == true) ? <CartModal count = {props.count} isOpen = {isOpen} setIsOpen = {setIsOpen} price = {props.price} goodsName = {props.title}/> : null}
    </>
  );
}

function Home() {
  const navigate = useNavigate();
  //   const { isLoading, isError, data } = useQuery('main', getMainList);
  //   if (isLoading) {
  //     return <div>로딩중.........로딩중.........딩중.........로딩중.........</div>;
  //   }
  //   if (isError) {
  //     return <div>에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!</div>;
  //   }

  //   console.log(data);
  let list = null

  const {isLoading, isError, data, refetch} = useQuery('getList', ()=> getMainList(), {
    onSuccess: (res) => {
      console.log("와우!")
    }


  })

  if (isLoading) {
    return <div>로딩중.........로딩중.........딩중.........로딩중.........</div>
  }
  if (isError) {
    return <div>에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!</div>
  }
  const MainList = async()=>{
     list = await getMainList()
  }
  console.log(data.data)
  return (
    <>
      <PageContainer>
        <CategoryTitle>카테고리입니다</CategoryTitle>
        <CategoryContainer></CategoryContainer>
        <ItemBoxContainer>
          {data.data.data.map((item) => {
            return (
                  <ShowItems key = {item.goodsId} imageUrl = {item.image} id={item.goodsId} title={item.goodsName} price={item.price} count = {item.count} goodsId = {item.goodsId}/>
            );
          })}
        </ItemBoxContainer>
      </PageContainer>
    </>
  );
}

export default Home;

const ItemBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  align-items: center;
  gap: 10px;
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
background-image: url("/cart.svg");
padding: 10px;
margin: 5px;
border: none;
background-color: transparent;
`

const PageContainer = styled.div``;

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
const CategoryTitle = styled.h3`
  margin-top: 50px;
  font-weight: 500;
  font-size: 28px;
  color: rgb(51, 51, 51);
  line-height: 35px;
  letter-spacing: -1px;
  text-align: center;
`;
const CategoryButton = styled.button``;

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
