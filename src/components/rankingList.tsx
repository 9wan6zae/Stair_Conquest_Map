import * as React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../modules';

import { VillageRankingEntry } from '../types/Model';
import { TownWrapper, ImageBlock } from './villageList';

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
  return (
    <>
      {village && 
        <Link to={`/ranking/${village.village?.id}`}>
          <TownWrapper>
            <ImageBlock village={village} index={index} />
          </TownWrapper>
        </Link>
      }
    </>
  );
}