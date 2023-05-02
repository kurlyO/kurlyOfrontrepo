import styled from 'styled-components';

export const StInfoUl = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #666666;
  font-weight: 400;
  list-style: none;
  margin-top: 0px;
  margin-left: 0px;
`;

export const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  background-color: rgb(255, 255, 255);
  font-size: 14px;
  color: #333;
  margin-right: 100px;
`;
export const StCommonTitle = styled.div`
  margin-top: ${(props) => props.top};
  margin-bottom: 50px;
  font-size: 28px;
  line-height: 35px;
  font-weight: 1000;
  text-align: center;
  letter-spacing: -1px;
  color: #333;
  padding: 30px;
`;

// function Essential(props) {
//   return props.isValid ? (
//     <StInfoUl>
//       <li style={{ color: 'red' }}>{props.essential}</li>
//     </StInfoUl>
//   ) : (
//     <StInfoUl>
//       <li style={{ color: 'green' }}>{props.essential}</li>
//     </StInfoUl>
//   );
// }
