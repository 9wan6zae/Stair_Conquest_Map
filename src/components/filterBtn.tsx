import * as React from 'react';
import styled from "styled-components"

const FilterBtnBlock = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 159px;
  height: 56px;

  background: #FFFFFF;

  border: 2px solid #EAEAEF;
  box-sizing: border-box;
  border-radius: 20px;

  &:focus {
    background: #F2F2F5;
  }

  p {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 100%;

    letter-spacing: -0.005em;

    color: #6A6A73;
  }
`


type FilterBtnProps = {
  title: string
}

export default function FilterBtn({title}: FilterBtnProps) {
  return (
    <FilterBtnBlock>
      <p>{title}</p>
    </FilterBtnBlock>
  )
}