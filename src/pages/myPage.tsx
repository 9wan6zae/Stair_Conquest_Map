import * as React from 'react';
import styled from 'styled-components';

import MainHeader from '../components/mainHeader';

const AccountSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  box-sizing: border-box;
  width: 100%;
  max-width: var(--maxWidth);
  height: 226px;
  background: #fff;
  margin-bottom: 15px;
  border-bottom: 2px solid #D0D0D9;

  span.instagram {
    font-weight: 500;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: -0.005em;
    color: #B5B5C0;
  }

  button.edit-profile {
    margin-top: 20px;
    width: 125px;
    height: 54px;
    background: #fff;
    border-radius: 20px;
    border: 2px solid #EAEAEF;
    font-weight: 500;
    font-size: 16px;
    line-height: 100%;
    text-align: center;
    letter-spacing: -0.005em;
    color: #6A6A73;
  }
`

const ConqureSection = styled.section`
  padding: 30px 20px 0px 20px;
  box-sizing: border-box;
  width: 100%;
  max-width: var(--maxWidth);
  height: 320px;
  background: #fff;

  section.title {
    display: flex;
    align-items: center;
    margin-bottom: 32px;
  }

  span.title {
    margin-left: 6px;
    font-weight: bold;
    font-size: 20px;
    line-height: 100%;
    letter-spacing: -0.005em;
    color: #000000;
  }
`

interface CardProps {
  titleColor: string
  contentColor: string
  backgroundColor: string
}

const ConqureCard = styled.div<CardProps>`
  position: relative;
  overflow: hidden;
  padding: 28px 24px 0px 32px;
  box-sizing: border-box;
  width: 100%;
  height: 180px;
  border-radius: 20px;
  background-color: ${props => props.backgroundColor};
  margin-bottom: 24px;

  p.card__title {
    color: ${props => props.titleColor};
    font-size: 18px;
    font-weight: 500;
  }

  p.card__main-content {
    color: ${props => props.contentColor};
    font-size: 24px;
    font-weight: bold;
    margin-top: 16px;
    margin-bottom: 12px;
  }

  p.card__sub-content {
    color: ${props => props.contentColor};
    font-size: 16px;
    font-weight: bold;
  }

  p.icon {
    position: absolute;
    right: 24px;
    top: 60px;
    height: 100%;
    font-size: 120px;
  }
 `

export default function MyPage() {
  return (
    <div style={{background: '#F2F2F5'}}>
      <MainHeader />
      <AccountSection>
        <main>
          <p className="title3">test</p>
          <p><span className="instagram">인스타그램</span></p>
          <button className="edit-profile">프로필 편집</button>
        </main>
      </AccountSection>
      <ConqureSection>
        <section className="title"><img src={`${process.env.PUBLIC_URL}/assets/svg/ic_level2.svg`} alt="레벨 아이콘" /> <span className="title">나의 정복활동</span></section>
        <ConqureCard titleColor="#6A6A73" contentColor="#3F3F45" backgroundColor="#EAEAEF">
          <p className="card__title">정복 레벨</p>
          <p className="card__main-content">Lv. 1</p>
          <p className="card__sub-content">예비 정복자</p>
          <p className="icon">🥚</p>
        </ConqureCard>
        <ConqureCard titleColor="#fff" contentColor="#fff" backgroundColor="#1D85FF">
          <p className="card__title">정복 순위</p>
          <p className="card__main-content">순위 없음</p>
          <p className="icon">🏅</p>
        </ConqureCard>
        <ConqureCard titleColor="#fff" contentColor="#fff" backgroundColor="#FF9D0A">
          <p className="card__title">정복한 계단</p>
          <p className="card__main-content">0 개</p>
          {/* <p className="icon">🥚</p> */}
        </ConqureCard>
      </ConqureSection>
    </div>
  )
}