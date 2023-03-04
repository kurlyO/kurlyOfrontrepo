import { useState, React } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCookie } from '../utils/cookies';
import styled from 'styled-components';
import { useMutation } from 'react-query';


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


  const testlist = {
    "items": [
      { "id": 1, "text" : "아바다케다브라"}, { "id": 1, "text" : "아바다케다브라"},{ "id": 1, "text" : "아바다케다브라"},{ "id": 1, "text" : "아바다케다브라"},{ "id": 1, "text" : "아바다케다브라"},
    ]


  }

  return (<>

    <ItemBoxContainer>
      {testlist.items.map((item) => {
        return (<>
          <Link to = {`detail/${item.id}`} style={{color:"black", textDecoration: "none" }}>
          <ShowItems id={item.id} title = {item.text}/>

          </Link>
        </>)
      })}
    </ItemBoxContainer>


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
  height: 500px;
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