import * as React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../modules';

import { VillageRankingEntry } from '../types/Model';
import { TownWrapper, TopTownBlock, BgBlock, SvgRender, RankingBlock } from './villageList';

export default function RankingList() {
  const villages = useSelector((state: RootState) => state.village.villages);
  return (
    <>
      {villages.map((village, index) => (
        <Village village={village} index={index} key={index} />
      ))}
    </>
  )
}

type VillageProps = {
  village: VillageRankingEntry
  index: number
}

function Village({ village, index }: VillageProps) {
  const rank_mark = ['👑', '🌸', '☘️']
  return (
    <>
      {village && 
        <Link to={`/ranking/${village.village?.id}`}>
          <TownWrapper>
            <section style={{position: 'relative'}}>
              <BgBlock>
                <div style={{maxWidth: '340px', margin: '0 auto', borderRadius: '20px', overflow: 'hidden'}}>
                  {village.progressImage && <SvgRender img = {village.progressImage} percent = {village.progressPercentage} />}
                  {!village.progressImage && <img width='100%' height='304px' src={`${process.env.PUBLIC_URL}/assets/svg/comming_soon.svg`} alt="오픈 예정" />}
                </div>
              </BgBlock>
              <TopTownBlock>
                <RankingBlock bgColor="#67AEFF" color="#fff" >{index + 1}</RankingBlock>
                <p className="village_name">{village.village?.name} {rank_mark[index]}</p>
                {village.progressPercentage && <p className="process">{`${village.progressPercentage}%`}</p>}
              </TopTownBlock>
            </section>
          </TownWrapper>
        </Link>
      }
    </>
  );
}