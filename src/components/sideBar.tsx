import * as React from 'react';
import styled, {css} from 'styled-components';

const SideBarBlock = styled.div<SideBarProps>`
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
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #000000;
  opacity: 0.6;
`

type SideBarProps = {
  open: boolean
}

export default function SideBar({open, children, setOpen}: any) {
  return (
    <>
      <SideBarBlock open={open}>
        {children}
      </SideBarBlock>
      {open && <Background onClick={() => setOpen(false)}/>}
    </>
  )
}