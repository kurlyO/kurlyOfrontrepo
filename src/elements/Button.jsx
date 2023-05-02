import styled from 'styled-components';

export const StPuppleButton = styled.button`
  display: block;
  font-weight: 1000;
  text-align: center;
  overflow: hidden;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 3px;
  color: rgb(255, 255, 255);
  background-color: rgb(95, 0, 128);
  margin-top: ${(props) => props.marginTop};
  border: none;
  cursor: pointer;
`;

export const StWhiteButton = styled.button`
  display: block;
  font-weight: 1000;
  padding: 0px 10px;
  text-align: center;
  overflow: hidden;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 3px;
  color: rgb(95, 0, 128);
  background-color: rgb(255, 255, 255);
  border: 1px solid purple;
  cursor: pointer;
  /* &:hover {
    background-color: skyblue;
    color: blue;
  } */
`;
