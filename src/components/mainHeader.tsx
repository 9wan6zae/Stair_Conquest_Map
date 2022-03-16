import * as React from 'react';
import { useState, useEffect } from 'react';
import styled, {css} from 'styled-components';
import { ReactComponent as MenuBtn} from './svg/menu.svg'

import SideBar from './sideBar';

const HeaderBlock = styled.div<HeaderProps>`
  position: fixed;
  z-index: 900;
  background: rgba(0,0,0,0);
  color: #fff;
  width: 100%;
  max-width: var(--maxWidth);
  height: 56px;
  transition: 0.3s ease;
  border: none;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  main {
    width: 1300px;
    display: flex;
    justify-content: space-between;
    margin: 0 20px;
  }

  img {
    color: #fff;
  }

  ${props =>
    props.change &&
    css`
      background: #fff;
      border-bottom: 2px solid #EAEAEF;
      p {
        color: #000;
      }
    `}
`

type HeaderProps = {
  change: boolean
}

MainHeader.defaultProps = {
  scroll: true,
  children: null
}

export default function MainHeader({children}: {children: React.ReactChild}) {
  const [change, setChange] = useState(false);
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(true);
  const [scroll, setScroll] = useState(false);

  const updateScoll = () => {
    let scollPosition = (window.scrollY || document.documentElement.scrollTop)
    setChange(scollPosition > 30)
  }

  useEffect(() => {
    if (load) {
      updateScoll()
      window.addEventListener('scroll', () => {
        updateScoll()
      })
      const path = window.location.pathname
      if (path === '/') setScroll(true)
    }
    return () => setLoad(false)
  }, [load])

  return (
    <>
      <HeaderBlock change={ !scroll || change } >
        <main>
          <a href="/"><p className="title4">계단정복지도</p></a>
          <MenuBtn stroke = { !scroll || change ? 'black' : 'var(--link)'} onClick={() => setOpen(true)}/>
        </main>
      </HeaderBlock>
      {!children && !scroll && (
        <div style={{paddingTop: "56px"}} />
      )}
      <SideBar open={open} setOpen={setOpen} />
      {children &&  (
        <>
          <div>{children}</div>
          <div style={{paddingTop: "154px"}} />
        </>
      )}
    </>
  )
}