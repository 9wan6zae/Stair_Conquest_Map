import * as React from 'react';
import styled from 'styled-components';
import MainHeader from '../components/mainHeader';
import VillageList from '../components/rankingList';
import Content from '../components/content';


const RankingBlock = styled.main`
  padding: 0 20px;
  box-sizing: border-box;
`

export default function RankingPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0)
    window.sessionStorage.removeItem('lat')
    window.sessionStorage.removeItem('lng')
  }, [])
  return (
    <>
      <MainHeader />
      <Content title={"계단정보 랭킹"} description={"계단정복지도, 우리동네는\n얼마나 채웠을까요?"} />
      <RankingBlock>
        <VillageList />
      </RankingBlock>
    </>
  )
}