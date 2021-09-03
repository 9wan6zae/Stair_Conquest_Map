import * as React from 'react';
import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../modules';

type SideBarBlockProps = {
  open: boolean
}

const SideBarBlock = styled.div<SideBarBlockProps>`
  position: fixed;
  top: 0;
  right: -250px;
  width: 250px;
  height: 100%;
  background: #fff;
  z-index: 1000;
  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 0px 24px 24px 24px;

  box-sizing: border-box;

  section.sidebar__items {
    padding-top: 58px;
  }

  p.sidebar__description {
    color: #B5B5C0;
    font-size: 14px;
    font-weight: 500;
  }

  ${props =>
    props.open && 
    css`
      right: 0;
    `}
`

const SideBarItem = styled.section`
  width: 100%;
  height: 28px;
  display: flex;
  align-items: center;
  margin-bottom: 32px;

  img {
    margin-right: 8px;
  }

  p {
    width: 152px;
    font-size: 20px;
    font-weight: 500;
  }
`

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 901;
  width: 100%;
  height: 100%;
  background: rgba(16, 103, 205, 0.6);
  backdrop-filter: blur(16px);
`

type SideBarProps = {
  open: boolean
  setOpen(flag: boolean): void | null
}

export default function SideBar({open, setOpen}: SideBarProps) {
  const loginStatus = useSelector((state: RootState) => state.login.loginSuccess);
  const [list, setList] = React.useState(
    [
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
  )

  React.useEffect(() => {
    if (loginStatus) {
      const tempList = [...list]
      tempList[0].title = "로그아웃"
      setList(tempList)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginStatus])
  return (
    <>
      <SideBarBlock open={open}>
        <section className="sidebar__items">
          {list.map((v, index) => (
              <SideBarItem key={index}>
                <img src={v.icon} alt={v.title} />
                <Link to={v.to} key={index}><p>{v.title}</p></Link>
              </SideBarItem>
            )
          )}
        </section>
        <p className="sidebar__description">2021, Eggrock™</p>
      </SideBarBlock>
      {open && <Background onClick={() => setOpen(false)}/>}
    </>
  )
}