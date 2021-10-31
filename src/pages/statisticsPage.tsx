import * as React from 'react';
import styled from 'styled-components';
import * as StatisticsAPI from '../api/statistics'
import { Link } from 'react-router-dom';

import MainHeader from '../components/mainHeader';

import {GetVillageStatisticsResult} from '../types/Statistics'

import { SvgRender } from '../components/villageList';

import { ReactComponent as Bookmark } from '../components/svg/bookmark.svg';

const StatisticsBlock = styled.main`
  section.titleSection {
    margin-top: 52px;
    width: 100%;
    position: fixed;
    section {
      padding: 0 20px;
      box-sizing: border-box;
    }
  }

  & > p.link {
    color: #1067CD;
    font-weight: 500;
  }

  p.rankingInfo {
    color: #F67600;
    font-weight: bold;
    font-size: 20px;
    margin-top: 4px;
  }
`

const DetailInfo = styled.section`
  z-index: 10;
  position: absolute;
  box-shadow: 0px -4px 12px rgba(0, 0, 0, 0.15);
  top: 464px;
  width: 100%;
  background: #fff;
  border-radius: 20px 20px 0px 0px;
  padding: 36px 0px 20px 0px;
  box-sizing: border-box;
  
  section.conquestInfo {
    padding: 0 20px;

    section.rateSection {
      display: flex;
      justify-content: space-between;
      position: sticky;
      top: 70px;
      p.rateTitle {
        font-weight: 500;
        font-size: 20px;
        line-height: 100%;
      }
    }

    section.conquestNumSection {
      margin-top: 32px;
      display: flex;
      justify-content: space-between;

      & > section {
        width: 50%;
        p {
          color: #6A6A73;
          font-size: 16px;
          font-weight: bold;
          margin-top: 10px;
          margin-bottom: 6px;
        }
        p.count {
          font-weight: 500;
          font-size: 20px;
          line-height: 100%;

          span {
            color: rgb(181, 181, 191);
          }
        }
      }
    }
  }
  section.userInfo {
    padding: 0 20px;
    margin-top: 52px;

    p.user-count {
      font-size: 20px;
      font-weight: 500;
    }

    p.conquest-user {
      margin-top: 10px;
      color: #6A6A73;
      font-weight: bold;
      font-size: 16px;
    }

    p.user-name {
      margin-top: 6px;
      font-weight: 500;
      font-size: 20px;
      line-height: 100%;
      color: #1067CD;
    }

    p.instagram {
      margin-top: 6px;
      color: #B5B5C0;
      font-size: 16px;
      font-weight: 500;

      span {
        color: #F67600;
        font-weight: 500;
      }
    }
  }
  section.remain {
    margin-top: 52px;
    width: 100%;
    height: 294px;
    background: #F2F2F5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

export default function StatisticsPage({match}: {match: any}) {
  const [statistics, setStatistics] = React.useState<GetVillageStatisticsResult>()
  React.useEffect(() => {
    const id = match.params.id
    StatisticsAPI.getVillageStatistics({villageId: id}).then((res) => {
      setStatistics(res.data)
    })
  }, [match.params.id])
  return (
    <>
      <MainHeader />
      {statistics &&
        <StatisticsBlock>
          <section className="titleSection">
            <section>
              <Link to="/ranking"><p className="link">계단정복 랭킹</p></Link>
              <p style={{marginTop: '8px'}} className="title3">{statistics.villageRankingEntry?.village?.name}</p>
              <p className="rankingInfo">현재 {statistics.villageRankingEntry?.progressRank}위</p>
            </section>
            {statistics?.villageRankingEntry && statistics.villageRankingEntry.progressImage &&
              <SvgRender img = {statistics.villageRankingEntry.progressImage} percent={statistics.villageRankingEntry.progressPercentage} />
            }
          </section>          
          <DetailInfo>
            <section className="conquestInfo">
              <section className="rateSection">
                <p className="rateTitle">계단정복률 <span style={{fontWeight: 'bold', color: '#F67600'}}>{statistics.villageRankingEntry?.progressPercentage}%</span></p>
                <Bookmark />
              </section>
              <section className="conquestNumSection">
                <section>
                  <img src={`${process.env.PUBLIC_URL}/assets/png/ic_building.png`} alt="타입 아이콘" />
                  <p>건물 정복</p>
                  <p className="count">{statistics.buildingAccessibilityCount} <span>/ {statistics.totalBuildingCount}</span></p>
                </section>
                <section>
                <img src={`${process.env.PUBLIC_URL}/assets/png/ic_place.png`} alt="타입 아이콘" />
                  <p>장소 정복</p>
                  <p className="count">{statistics.placeAccessibilityCount} <span>/ {statistics.totalPlaceCount}</span></p>
                </section>
              </section>
              <div style={{marginTop: '24px', width: '100%', height: '0px', border: '1px solid #EAEAEF'}} />
            </section>
            <section className="userInfo">
              <section>
                <p className="user-count"><b>{statistics.registeredUserCount}명</b>과 함께 정복 중!</p>
              </section>
              <section style={{marginTop: '44px'}}>
                <img src={`${process.env.PUBLIC_URL}/assets/png/ic_building.png`} alt="타입 아이콘" />
                <p className="conquest-user">{statistics.eupMyeonDongName}건물 정복왕</p>
                <p className="user-name">{statistics.mostRegisteredUser?.nickname ? statistics.mostRegisteredUser?.nickname : '익명 비밀요원'}</p>
                {statistics.mostRegisteredUser?.instagramId && <p className="instagram">인스타그램 <span>@ {statistics.mostRegisteredUser?.instagramId}</span></p>}
              </section>
            </section>
            <section className="remain">
              <p style={{fontSize: '80px'}}>🎁</p>
              <p style={{fontSize: '18px', fontWeight: 500}}>다음 색칠까지 건물 {statistics.nextColoringRemainingCount}개 남았어요!</p>
              <p style={{marginTop: '4px', textAlign: 'center', color: '#9797A6', fontSize: '16px', fontWeight: 500}}>계단정보를 등록하고<br/>우리동네 지도를 예쁘게 칠해 보세요 ☺️</p>
            </section>
          </DetailInfo>
        </StatisticsBlock>
      }
    </>
  )
}