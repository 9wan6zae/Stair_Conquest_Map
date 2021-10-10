import * as React from 'react';
import styled, {css} from 'styled-components'
import { Background } from './sideBar';

type BottomModalProps = {
  open: boolean
  height: number
  setOpen(open: boolean): void
  title: string
  description: string
  content: React.ReactFragment
  footer: React.ReactFragment
}

type BottomModalWrapperProps = {
  open: boolean
}

type BottomModalBlockProps = {
  height: number
  open: boolean
}

const BottomModalWrapper = styled.div<BottomModalWrapperProps>`
  position: fixed;
  top: 100%;
  width: 100%;
  height: 100%;
  z-index: 901;
  transition: 0.6s ease
  ${props =>
    props.open && 
    css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      z-index: 901;
      display: flex;
      justify-content: center;
    `}
`

const BottomModalBlock = styled.div<BottomModalBlockProps>`
  box-sizing: border-box;
  background: #fff;
  border-radius: 20px 20px 0 0;
  position: absolute;
  z-index: 999;
  bottom: -${props => props.height}px;
  width: 100%;
  max-width: var(--maxWidth);
  height: ${props => props.height}px;

  transition: 0.3s ease;

  & > header {
    padding: 0 20px;
    margin-top: 52px;
    margin-bottom: 32px;
  }

  & > footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    margin-top: 32px;
    padding: 20px;
    box-sizing: border-box;
  }

  ${props =>
    props.open && 
    css`
      bottom: 0px;
    `}

`

export default function BottomModal({open, height, setOpen, title, description, content, footer}: BottomModalProps) {
  return (
    // <>
      
    //   {open && <BottomModalBlock height={height}>
    //     <p className="title3">{title}</p>
    //     <p className="description">{description}</p>
    //     {content}
    //     {footer}
    //   </BottomModalBlock>}
    // </>
    <BottomModalWrapper open={open}>
      <BottomModalBlock height={height} open={open}>
        <header>
          <p className="title3">{title}</p>
          <p className="description" style={{fontSize: '16px', marginTop: '8px'}}>{description}</p>
        </header>
        <main>
          {content}
        </main>
        <footer>
          {footer}
        </footer>
        {/* {open && 
          {content}
        } */}
      </BottomModalBlock>
      {open && <Background onClick={() => setOpen(false)}/>}
    </BottomModalWrapper>
  )
}