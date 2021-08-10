import * as React from 'react';
import AppHeader from '../components/mainHeader';
import Animation from '../components/animation';
import Content from '../components/content';
import Search from '../components/search';
import FilterBtn from '../components/filterBtn';
import TownList from '../components/townList';

import { Link } from 'react-router-dom';

export default function MainPage() {
  const towns = [
    {
      name: '분당구 이매동',
      process: 5
    },
    {
      name: '중원구 상대원동',
      process: 4
    },
    {
      name: '수정구 이런저런동',
      process: 0.3
    },
    {
      name: '분당구 이매동',
      process: 5
    },
    {
      name: '중원구 상대원동',
      process: 4
    },
    {
      name: '수정구 이런저런동',
      process: 0.3
    },
    {
      name: '분당구 이매동',
      process: 5
    },
    {
      name: '중원구 상대원동',
      process: 4
    },
    {
      name: '수정구 이런저런동',
      process: 0.3
    },
    {
      name: '분당구 이매동',
      process: 5
    },
    {
      name: '중원구 상대원동',
      process: 4
    }
  ]

  return (
    <>
      <AppHeader></AppHeader>
      <Animation />
      <Content title={"계단정보 등록"} description={"동네에 자주 가는 장소의\n계단 정보를 알려주세요"}>
        <Link to="/search" style={{textDecoration: 'none'}}><Search placeholder="장소, 주소 검색" type="text"/></Link>
        <section style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between'}}>
          <FilterBtn title="전체 (시+구)"></FilterBtn>
          <FilterBtn title="전체 (동)"></FilterBtn>
        </section>
      </Content>
      <Content title={"우리동네 랭킹"} description={"계단정복지도, 우리 동네는\n얼마나 채웠을까요?"}>
        <TownList towns={towns} />
      </Content>
    </>
  )
}