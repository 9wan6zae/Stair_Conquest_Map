import * as React from 'react';
import styled from 'styled-components';

const ContentBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding-top: 52px;
  background: #fff;

  & > div > main {
    margin-top: 32px;
  }

  div.content__wrapper {
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    max-width: 700px;
  }
`

type ContentProp = {
  title?: string
  description?: string
  children?: React.ReactNode
}

export default function Content({title, description, children}: ContentProp) {
  return (
    <ContentBlock>
      <div className="content__wrapper">
        <p className="title3">{title}</p>
        <p className="description">{description?.split('\n').map((line, index) => {
          return <span key={index}>{line}<br/></span>
        })}</p>
        <main>
          {children}
        </main>
      </div>
    </ContentBlock>
  )
}