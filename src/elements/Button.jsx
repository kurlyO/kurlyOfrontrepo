import styled from 'styled-components';

export const StPuppleButton = styled.button`
  display: block;

  text-align: center;
  overflow: hidden;
  width: 100%;
  height: 54px;
  border-radius: 3px;
  color: rgb(255, 255, 255);
  background-color: rgb(95, 0, 128);
  border: none;
  &:hover {
    background-color: skyblue;
    color: blue;
  }
`;

export const StWhiteButton = styled.button`
  display: block;
  padding: 0px 10px;
  text-align: center;
  overflow: hidden;
  width: 100%;
  height: 54px;
  border-radius: 3px;
  color: rgb(95, 0, 128);
  background-color: rgb(255, 255, 255);
  border: 1px solid purple;
  &:hover {
    background-color: skyblue;
    color: blue;
  }
`;
