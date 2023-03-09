import styled, { css } from 'styled-components';

export const StLoginInput = styled.input`
  width: 100%;
  height: 54px;
  font-size: 14px;
  padding: 0px 11px 1px 15px;
  border-radius: 4px;
  border: 1px solid rgb(221, 221, 221);
  font-weight: 400;
  line-height: 1.5;
  color: rgb(51, 51, 51);
  outline: none;
`;

export const StInputBox = styled.div`
  display: inline-flex;
  width: 100%;
  ${(props) =>
    props.showBorder &&
    css`
      border-top: 2px solid black;
    `}
  padding: 10px 20px;
`;

export const StInputTextBox = styled.div`
  width: 139px;
  padding-top: 12px;
`;

export const StInputText = styled.div`
  font-weight: 1000;
  color: rgb(51, 51, 51);
  line-height: 20px;
`;

export const StInput = styled.input`
  width: 349px;
  height: 46px;
  padding: 0px 11px 1px 15px;
  border-radius: 4px;
  border: 1px solid rgba(221, 221, 221);
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: rgb(51, 51, 51);
  outline: none;
  box-sizing: border-box;
  ${(props) =>
    props.flex &&
    css`
      flex: 1 1 0%;
    `}
`;

export const StDupButton = styled.button`
  width: 120px;
  height: 44px;
  margin-left: 8px;
  font-weight: 1000;
  border-radius: 3px;
  color: rgb(95, 0, 128);
  background-color: rgb(255, 255, 255);
  border: 1px solid purple;
  cursor: pointer;
`;

//span
export const StSpan = styled.span`
  color: #ee6a7b;
`;
