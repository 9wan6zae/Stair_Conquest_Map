import * as React from 'react';
import styled from 'styled-components';
import { Background } from './sideBar';

const ModalBlock = styled.section`
  z-index: 902;
  width: 270px;
  height: 132px;
  opacity: 1;
  background: rgba(242, 242, 242, 0.8);
  backdrop-filter: blur(54.3656px);
  border-radius: 14px;

  animation: fadein 0.5s;

  @keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
  }

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  header {
    padding: 25px 16px 16px 16px;
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    height: 87px;
    border-bottom: 0.2px solid rgba(153, 153, 153, 0.7);
  }

  section.action {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;

    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 160%;
    color: #007AFF;
  }

  p.modal__title {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 120%;
    color: #000;
    margin-bottom: 8px;
  }

  p.modal__description {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 16px;

    text-align: center;
    letter-spacing: -0.078px;

    color: #000000;
  }
`

export default function Modal({title, description, setOpen, open, action}: {title: string, description: string, setOpen(open: boolean): void, open: boolean, action(): void}) {
  return (
    <>
      <ModalBlock>
        <header>
          <p className="modal__title">{title}</p>
          <p className="modal__description">{description}</p>
        </header>
        <section onClick={() => action()} className="action">
          확인
        </section>
      </ModalBlock>
      {open && <Background />}
    </>
  )
}