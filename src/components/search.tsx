import * as React from 'react';
import styled from 'styled-components';

const SearchBlock = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: 56px;
  background: #F2F2F5;
  border-radius: 20px;

  display: flex;
  align-items: center;
  padding: 0 24px;

  color: #9797A6;
  font-size: 18px;
  font-weight: 500;

  border: none;
  outline: none;
`

export default function Search({placeholder, type, readonly}: {placeholder: string, type: string, readonly: boolean}) {
  return (
    <>
      <SearchBlock readOnly={readonly} type={type} placeholder={placeholder}/>
    </>
  )
}