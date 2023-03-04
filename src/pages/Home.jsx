import { useState, React } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCookie } from '../utils/cookies';
import styled from 'styled-components';
import { useMutation, useQueries, useQuery } from 'react-query';
import { getMainList } from '../api/HomeAPI';


function ShowItems(props) {

  return (<><ItemBox>
    <ItemImage imageUrl={"/title.png"} />
    <h3>{props.id}</h3>
    <h3>{props.title}</h3>
  </ItemBox>
  </>)
}


function Home() {
  const navigate = useNavigate();
  const {isLoading, isError, data} = useQuery("main", getMainList)


  console.log(data)

  const testlist = {
    "items": [
      { "id": 1, "text" : "아바다케다브라"}, { "id": 1, "text" : "아바다케다브라"},{ "id": 1, "text" : "아바다케다브라"},{ "id": 1, "text" : "아바다케다브라"},{ "id": 1, "text" : "아바다케다브라"},
    ]


  }

  return (<>
  <PageContainer>
    <CategoryTitle>카테고리입니다</CategoryTitle>
  <CategoryContainer>

  </CategoryContainer>
    <ItemBoxContainer>
      {testlist.items.map((item) => {
        return (<> 
          <Link to = {`detail/${item.id}`} style={{color:"black", textDecoration: "none" }}>
          <ShowItems  id={item.id} title = {item.text}/>

          </Link>
        </>)
      })}
    </ItemBoxContainer>
s
  </PageContainer>

  </>)
    ;
}

export default Home;


const ItemBoxContainer = styled.div`
display:flex;
flex-wrap: wrap;
width: 80%;
align-items: center;
gap: 10px;

`

const ItemBox = styled.div`
display: flex;
flex-direction: column;
  width: 250px;
  height: 540px;
  border-radius: 5px;
  border: 5px solid black;
  background-color: gray;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`

const ItemImage = styled.div`
width: 100%;
height: 100%;
background-image: url(${(props) => props.imageUrl});
background-size: contain;
background-position: center;
background-repeat: no-repeat;
position: relative;
`

const PageContainer = styled.div`
  
`

const CategoryContainer = styled.div`
display: grid;
grid-template-columns: repeat(4, 180px);
gap: 16px 83px;
overflow: hidden;
margin-top: 28px;
padding: 30px 40px;
border: 1px solid rgb(226, 226, 226);
line-height: 20px
`
const CategoryTitle = styled.h3`
margin-top: 50px;
    font-weight: 500;
    font-size: 28px;
    color: rgb(51, 51, 51);
    line-height: 35px;
    letter-spacing: -1px;
    text-align: center;
`
const CategoryButton = styled.button`
  
`

const CategoryButtonText = styled.a`
-webkit-text-size-adjust: 100%;
    font-family: "Noto Sans", "malgun gothic", AppleGothic, dotum, sans-serif;
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
`