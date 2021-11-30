import * as React from 'react';
import styled from 'styled-components';

import MainHeader from '../components/mainHeader';
import { GetMyPageViewDataResult } from '../types/MyPage';
import * as MyPageAPI from '../api/myPage'
import { Link } from 'react-router-dom';

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

  p.instagram {
    font-weight: 500;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: -0.005em;
    color: #B5B5C0;
  }

  span.instagram__id {
    color: var(--emphasis);
  }

  span.instagram__link {
    color: var(--link);
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
  padding: 30px 20px 52px 20px;
  box-sizing: border-box;
  width: 100%;
  max-width: var(--maxWidth);
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

  p.card__link {
    color: ${props => props.contentColor};
    position: absolute;
    right: 19px;
    bottom: 10px;
    padding: 12px 0;
    font-size: 16px;
  }
 `

const PlacesListCard = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  overflow: hidden;
  padding: 28px 32px 0px 32px;
  box-sizing: border-box;
  width: 100%;
  min-height: 104px;
  border-radius: 20px;
  background-color: #EAEAEF;

  div.block-wrapper {
    margin: 0;
    width: 100%;
    max-width: 280px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  div.list-item {
    display: flex;
  }

  div.division {
    width: 0px;
    height: 44px;
    border: 1px solid #D0D0D9;
  }
 `

export default function MyPage() {
  const [data, setData] = React.useState<GetMyPageViewDataResult>()
  const ic_level: any = {
    '1': {ic: '🥚'},
    '2': {ic: '🐣'},
    '3': {ic: '⛳️'},
    '4': {ic: '👑'},
    'Max': {ic: '🦄'}
  }

  React.useEffect(() => {
    MyPageAPI.getMyPageViewData().then(res => setData(res.data))
  }, [])
  return (
    <div style={{background: '#F2F2F5'}}>
      <MainHeader />
      <AccountSection>
        <main>
          <p className="title3">{data?.user?.nickname}</p>
          <p className="instagram">
            <span style={{marginRight: '6px'}}>인스타그램</span>
            {data?.user?.instagramId?.value
              ? <span className="instagram__id">@{data?.user?.instagramId?.value}</span>
              : <Link to={{pathname: "updateProfile", state: {user: data?.user}}}><span className="instagram__link">계정 등록하기</span></Link>
            }
          </p>
          <Link to={{pathname: "updateProfile", state: {user: data?.user}}}><button className="edit-profile">프로필 편집</button></Link>
        </main>
      </AccountSection>
      <ConqureSection>
        <section className="title"><img src={`${process.env.PUBLIC_URL}/assets/svg/ic_level2.svg`} alt="레벨 아이콘" /> <span className="title">나의 정복활동</span></section>
        <ConqureCard titleColor="#6A6A73" contentColor="#3F3F45" backgroundColor="#EAEAEF">
          <p className="card__title">정복 레벨</p>
          <p className="card__main-content">Lv. {data?.conquerLevelInfo?.level}</p>
          <p className="card__sub-content">{data?.conquerLevelInfo?.description}</p>
          {data?.conquerLevelInfo?.level && <p className="icon">{ic_level[data?.conquerLevelInfo?.level].ic}</p>}
        </ConqureCard>
        <ConqureCard titleColor="#fff" contentColor="#fff" backgroundColor="#1D85FF">
          <p className="card__title">정복 순위</p>
          <p className="card__main-content">{data?.conquerRank?.value ? `${data?.conquerRank?.value}위` : '순위 없음'}</p>
          <p className="icon">🏅</p>
        </ConqureCard>
        <ConqureCard titleColor="#fff" contentColor="#fff" backgroundColor="#FF9D0A">
          <p className="card__title">정복한 계단</p>
          <p className="card__main-content">{data?.placeAccessibilityCount}개</p>
          <Link to="/listConqueredPlaces"><p className="card__link">모두 보기 <img style={{color: 'white'}} src={`${process.env.PUBLIC_URL}/assets/svg/arr_white.svg`} alt="link" /></p></Link>
        </ConqureCard>
        {data?.placeAccessibilityCountDetailEntries && 
          <PlacesListCard>
            <div className='block-wrapper'>
            {data?.placeAccessibilityCountDetailEntries.map((p, i) => (
              <div className="list-item" key={i}>
                <PlacesListBlock>
                  <p className="placename">{p.eupMyeonDongName}</p>
                  <p className="conquer-number">{p.count}개</p>
                </PlacesListBlock>
                {(i !== data?.placeAccessibilityCountDetailEntries.length - 1)
                  && i % 3 !== 2
                  && <div className="division" />}
              </div>
            ))}
            {[...Array(3 - Math.floor(data?.placeAccessibilityCountDetailEntries.length / 3))].map((p, i) => (
              <PlacesListBlock key={`blank${i}`} />
            ))}
            </div>
          </PlacesListCard>
        }
      </ConqureSection>
    </div>
  )
}

const PlacesListBlock = styled.div`
  margin-bottom: 24px;
  width: 71px;
  height: 48px;
  p.placename {
    font-weight: 500;
    font-size: 16px;
    color: #6A6A73;
  }
  p.conquer-number {
    font-weight: bold;
    font-size: 20px;
    color: var(--emphasis);
  }
`