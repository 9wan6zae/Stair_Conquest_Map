import * as React from 'react';
import styled from 'styled-components';

const ContentBlock = styled.div`
  max-width: 700px;
  padding: 0 20px;
  padding-top: 52px;
  background: #fff;

  main {
    margin-top: 32px;
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
      <p className="title3">{title}</p>
      <p className="description">{description?.split('\n').map((line, index) => {
        return <span key={index}>{line}<br/></span>
      })}</p>
      <main>
        {children}
      </main>
    </ContentBlock>
  )
}