import * as React from 'react';
import styled from 'styled-components';
import { ReactComponent as BackBtn} from './svg/backBtn.svg'

const HeaderBlock = styled.div`
  position: fixed;
  z-index: 900;
  background: #fff;
  color: #000;
  width: 100%;
  max-width: var(--maxWidth);
  height: 56px;
  transition: 0.3s ease;
  border: none;
  border-bottom: 2px solid #EAEAEF;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  main {
    position: relative;
    width: 1300px;
    display: flex;
    justify-content: center;
    margin: 0 20px;
  }

  img {
    color: #fff;
  }
`

type HeaderProps = {
  title: string
}

export default function AppHeader({title}: HeaderProps) {
  return (
    <>
      <HeaderBlock>
        <main>
          <BackBtn onClick={() => window.history.back()} style={{position: 'absolute', left: '0px'}} />
          <b className="title5">{title}</b>
        </main>
      </HeaderBlock>
    </>
  )
}