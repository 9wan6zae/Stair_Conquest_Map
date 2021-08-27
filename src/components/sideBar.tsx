import * as React from 'react';
import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom';

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
  ${props =>
    props.open && 
    css`
      right: 0;
    `}
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
  list: {
    icon: string,
    title: string,
    to: string
  }[]
  setOpen(flag: boolean): void | null
}

export default function SideBar({open, list, setOpen}: SideBarProps) {
  return (
    <>
      <SideBarBlock open={open}>
        {list.map((v, index) => (
            <div key={index}>
              <img src={v.icon} alt={v.title} />
              <Link to={v.to} key={index}>{v.title}</Link>
            </div>
          )
        )}
      </SideBarBlock>
      {open && <Background onClick={() => setOpen(false)}/>}
    </>
  )
}