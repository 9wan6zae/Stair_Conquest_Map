import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { RootState } from '../modules';

const RegisterCompleteBlock = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background: var(--primary);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  p.register_complete__title {
    font-size: 28px;
    color: #fff;
    font-weight: 700;
    text-align: center;
  }

  p.register_complete__subtitle {
    font-size: 20px;
    color: #fff;
    font-weight: 500;
    text-align: center;
    margin-top: 8px;
  }

  section.register_complete__info {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding-top: 40px;
    z-index: 2
  }
  section.register_complete__description {
    text-align: center;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    margin-top: 16px;
    line-height: 160%;
  }

  section.register_complete__bottom {
    width: 952px;
    position: absolute;
    z-index: 1;
    top: 338px;
    left: 50%;
    transform: translateX(-50%);
  }

  section.register_complete__action {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 80px;
    z-index: 2;
    background: #fff;
    padding: 0 20px;
    box-sizing: border-box;
  }
`

export default function RegisterCompletePage() {
  const item = useSelector((state: RootState) => state.item.item);
  const result = useSelector((state: RootState) => state.result.result);

  return (
    <RegisterCompleteBlock>
      <section className="register_complete__info">
        <p className="register_complete__title">계단을 정복했어요🎉!</p>
        <p className="register_complete__subtitle">{result?.registeredUserOrder}호 정복자 {result?.buildingAccessibility?.registeredUserName?.value}</p>
        <img style={{marginTop: '56px'}} src="./assets/svg/character_astronut.svg" alt="character" />
        <section className="register_complete__description">
          <p><b>{item?.place.name}</b> 계단 정보를 등록했어요.</p>
          <p>모두가 가고 싶은 곳에 갈 수 있는 사회에</p>
          <p>기여하셨습니다. 정말 고마워요 ☺️</p>
        </section>
      </section>
      <section className="register_complete__bottom">
        <img width="100%" src="./assets/svg/bottom.svg" alt="bottom" />
      </section>
      <section className="register_complete__action">
        <Link to="/accessibility"><button className="next-btn">닫기</button></Link>
      </section>
    </RegisterCompleteBlock>
  )
}