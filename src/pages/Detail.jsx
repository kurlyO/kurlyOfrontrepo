import React from 'react';
import styled from 'styled-components';
import { StInput } from '../elements/Input';
import { StPuppleButton, StWhiteButton } from '../elements/Button';
import { useParams } from 'react-router-dom';


function Detail(){
 const pam = useParams()

    return(<>
    <PageContainer>
    <h3>
        {pam.id}
    </h3>
    </PageContainer>
    </>)   
}

export default Detail


//div 순서
/* 
1. 페이지 중앙정렬시킬 컨테이너 DIV
2. 제품 상세정보 좌우 정렬시킬 박스 DIV
3. 좌측 이미지 DIV
4. 우측 텍스트 담을 박스 DIV
5. 제품명과 가격 적을 상단 title DIV
6. 제품 정보 담을 DIV 리스트, 이건 컴포넌트로 만들어서 반복시키면 될 듯
7. 맨 밑에 상품선택 DIV
8. 가격, 장바구니 담기 우측 정렬시킬 DIV
9. 
*/

const PageContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding-top: 15px;
padding-bottom: 15px;

  & > *:not(:first-child) {
    margin-top: 15px;
  }
`

const