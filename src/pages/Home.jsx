import {  useEffect, useState, React } from 'react';
import {useNavigate, Link } from 'react-router-dom';
import { getCookie } from '../utils/cookies';
import styled from 'styled-components';
import { useMutation, useQueries, useQuery } from 'react-query';
import { getCateList, getMainList } from '../api/HomeAPI';
import { cartAdd } from '../api/CartAPI';
import CartModal from '../components/Modal/Modal';
import {  ItemBoxContainer, ItemBox, ItemImage, ItemCartButton, PageContainer, CategoryContainer, CategoryButton, CategoryText, CategoryTitle, CategoryButtonText } from '../components/PageStyle/HomeStyle';

function ShowItems(props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const AddMutate = useMutation(cartAdd, {
    onSuccess: (data) => {
      console.log('추가 성공!');
    },
  });

  const CartAdd = (event) => {
    setIsOpen(true);
    if (getCookie('token') != null) {
      //여기에 서버 POST 할거야
      event.preventDefault();
      event.stopPropagation();
      //AddMutate.mutate()

      console.log('아씨오!');
    } else {
      //여기다 로컬 저장할거고
      event.preventDefault();
      event.stopPropagation();
      console.log('아바다케다브라');
    }
  };

  return (
    <>
      <Link to={`detail/${props.goodsId}`} style={{ color: 'black', textDecoration: 'none' }}>
        <ItemBox>
          <ItemImage imageUrl={props.imageUrl}>
            <ItemCartButton onClick={CartAdd} />
          </ItemImage>
          <h3>{props.title}</h3>
          <h3>{props.price}</h3>
        </ItemBox>
      </Link>
      {isOpen == true ? (
        <CartModal
          count={props.count}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          price={props.price}
          goodsName={props.title}
          goodsId={props.goodsId}
        />
      ) : null}
    </>
  );
}

function Home() {
  const navigate = useNavigate();
  const [pageList, setPageList] = useState([])
  const [CateUp, setCateUp] = useState(false)
  const [CurrentCate, setCurrentCate] = useState('')
  const [checkCategoryBool, setCheckCategoryBool] = useState(false)
  const getList = useQuery(['getList'], getMainList)
  const getCategory = useQuery(['getCate', CurrentCate], () => getCateList(CurrentCate), {enabled:CateUp})
  let list = null;
  useEffect(() => {
    if(getList.data){
      setPageList(getList.data.data.data)
      console.log("작동")
      //console.log(getList.data.data.data)
    }
  }, [getList.data])  
  //console.log(getList)
  //console.log(pageList)
  
  useEffect(() => {
    if(getCategory.data){
      //console.log(getCategory.data.data.data)
      setPageList(getCategory.data.data.data)
      console.log("asdasd")
      //console.log(getList.data.data.data)
    }
  }, [getCategory.data])  

  const CategoryHandler = (event) =>{
    //console.log(event)
    setCurrentCate(event)
    setCateUp(true)
    //getCateList(event)
    //console.log('aaaa')

    //네트워크 펼쳐서 리패치가 뭘 받아오는지 체크하는거 잊지말고
    getCategory.refetch(event)
    //console.log(getCategory)
    //이 밑에선 반영이 안돼!
    //setPageList(getCategory.data)
  }
  const MainList = async () => {
    list = await getMainList();
  };
  //console.log(pageList) 

  if (getList.isLoading) { 
    return <div>로딩중.........로딩중.........딩중.........로딩중.........</div>;
  }
  else if (getList.isError) {
    return <div>에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!</div>;
  }
  return (
    <>
      <PageContainer>
        <CategoryTitle>카테고리입니다</CategoryTitle>
        <CategoryContainer>
          <CategoryButton onClick={() => CategoryHandler('채소')}>
            <CategoryButtonText>채소</CategoryButtonText>
          </CategoryButton>

          <CategoryButton onClick={() => CategoryHandler('육류')}>
            <CategoryButtonText>육류</CategoryButtonText>
          </CategoryButton>

          <CategoryButton onClick={() => CategoryHandler('유제품')}>
            <CategoryButtonText>유제품</CategoryButtonText>
          </CategoryButton>

          <CategoryButton onClick={() => CategoryHandler('과일')}>
            <CategoryButtonText>과일</CategoryButtonText>
          </CategoryButton>

          <CategoryButton onClick={() => CategoryHandler('해산물')}>
            <CategoryButtonText>해산물</CategoryButtonText>
          </CategoryButton>

          <CategoryButton onClick={() => CategoryHandler('간편식')}>
            <CategoryButtonText>간편식</CategoryButtonText>
          </CategoryButton>

          <CategoryButton onClick={() => CategoryHandler('가공식품')}>
            <CategoryButtonText>가공식품</CategoryButtonText>
          </CategoryButton>

        </CategoryContainer>
        {/**/}<ItemBoxContainer>
          {pageList?.map((item) => {
            return (
              <ShowItems
                key={item.goodsId}
                imageUrl={item.image}
                id={item.goodsId}
                title={item.goodsName}
                price={item.price}
                count={item.count}
                goodsId={item.goodsId}
              />
            );
          })}
        </ItemBoxContainer>
      </PageContainer>
    </>
  );
}

export default Home;
