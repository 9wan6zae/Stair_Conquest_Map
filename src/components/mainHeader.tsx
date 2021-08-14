import * as React from 'react';
import { useState, useEffect } from 'react';
import styled, {css} from 'styled-components';
import { ReactComponent as MenuBtn} from './svg/menu.svg'
import { Link } from 'react-router-dom';

import SideBar from './sideBar';

const HeaderBlock = styled.div<HeaderProps>`
  position: fixed;
  z-index: 900;
  background: rgba(0,0,0,0);
  color: #fff;
  width: 100%;
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
      color: #000;
      border-bottom: 2px solid #EAEAEF;
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
  const sideBarList = [
    {
      icon: "./assets/svg/account.svg",
      title: "회원가입 / 로그인",
      to: "/login"
    },
    {
      icon: "./assets/svg/info.svg",
      title: "계단정복지도 소개",
      to: "/login"
    },
    {
      icon: "./assets/svg/ranking.svg",
      title: "우리동네 랭킹",
      to: "/login"
    },
    {
      icon: "./assets/svg/info.svg",
      title: "만든 사람들",
      to: "/login"
    },
  ]

  const updateScoll = () => {
    let scollPosition = (window.scrollY || document.documentElement.scrollTop)
    setChange(scollPosition > 0)
  }

  useEffect(() => {
    if (scroll && load) {
      updateScoll()
      window.addEventListener('scroll', () => {
      updateScoll()
      })
    }
    return () => setLoad(false)
  }, [load, scroll])

  useEffect(() => {
    if(load) {
      const path = window.location.pathname
      if (path === '/') setScroll(true)
    }
    return () => setLoad(false)
  }, [load])

  return (
    <>
      <HeaderBlock change={ !scroll || change } >
        <main>
          <Link to="/"><p className="title4">계단 정복 지도</p></Link>
          <MenuBtn stroke = { !scroll || change ? 'black' : '#1067CD'} onClick={() => setOpen(true)}/>
        </main>
      </HeaderBlock>
      <SideBar open={open} setOpen={setOpen} list={sideBarList}/>
      {children &&  (
        <>
          <div style={{color: 'black'}}>test</div>
          <div>{children}</div>
        </>
      )}
    </>
  )
}