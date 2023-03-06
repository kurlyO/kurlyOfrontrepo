import { useState, React } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCookie } from '../utils/cookies';
import styled from 'styled-components';
import { useMutation, useQueries, useQuery } from 'react-query';
import { getMainList } from '../api/HomeAPI';

function ShowItems(props) {
  const CartAdd = (event) =>{
    if(getCookie('token') != null){
      //여기에 서버 POST 할거야
      event.preventDefault();
      event.stopPropagation();
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
  console.log(data.data.result)
  return (
    <>
      <PageContainer>
        <CategoryTitle>카테고리입니다</CategoryTitle>
        <CategoryContainer></CategoryContainer>
        <ItemBoxContainer>
          {data.data.result.map((item) => {
            return (
                  <ShowItems key = {item.goodsId} imageUrl = {item.image} id={item.goodsId} title={item.goodsName} price={item.price} goodsId = {item.goodsId}/>
            );
          })}
        </ItemBoxContainer>
        s
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
