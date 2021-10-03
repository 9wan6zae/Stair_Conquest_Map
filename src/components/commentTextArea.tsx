import * as React from 'react';
import styled from 'styled-components';

const CommentTextAreaBlock = styled.textarea`
  display: block;
  width: 100%;
  min-height: 136px;
  border-radius: 20px;
  border: 2px solid #EAEAEF;
  box-sizing: border-box;
  padding: 16px 20px;
  background: #F2F2F5;
  color: #000;
  font-size: 16px;
  font-weight: 500;
  line-height: 160%;

  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  resize: none;

  outline: none;

  text-overflow: scroll;

  &:focus {
    border: 2px solid #1D85FF !important;
  }

  &::placeholder {
    color: #B5B5C0;
  }
`

export default function CommentTextArea ({comment, onChange}: {comment: string, onChange(e: any): void}) {
  return (
  <CommentTextAreaBlock
    maxLength={100}
    placeholder="후문에는 계단이 없어 편하게 갈 수 있습니다 (최대 100자)"
    value={comment}
    onChange={onChange} />
  )
}