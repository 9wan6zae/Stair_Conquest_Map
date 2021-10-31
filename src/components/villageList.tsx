import * as React from 'react';
import { VillageRankingEntry, VillageRankingEntry_VillageProgressImage } from '../types/Model';
import styled from 'styled-components'

import { useSelector } from 'react-redux';
import { RootState } from '../modules';

type RankingBlockProps = {
  bgColor: string
  color: string
}

export const TownWrapper = styled.section`
  margin: 24px 0;

  p {
    margin-left: 16px;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: -0.005em;
    color: #6A6A73
  }

  @media all and (max-width: 360px) {
    p.village_name {
      width: 140px;
    }
  }
`

export const RankingBlock = styled.div<RankingBlockProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 56px;
  height: 56px;
  background: ${props => props.bgColor};
  color: ${props => props.color};
`

export const TopTownBlock = styled.div`
  z-index: 5;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 56px;
  background: #fff;
  border: 2px solid #EAEAEF;
  box-sizing: border-box;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;

  p.process {
    position: absolute;
    right: 20px;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 100%;

    text-align: right;
    letter-spacing: -0.005em;
    color: #9797A6;
  }
`

const TownBlock = styled.div`
  position: relative;
  width: 100%;
  height: 56px;
  background: #fff;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;

  p.process {
    position: absolute;
    right: 0px;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 100%;

    text-align: right;
    letter-spacing: -0.005em;
    color: #9797A6;
  }
`

export const BgBlock = styled.div`
  border: 2px solid #EAEAEF;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  background: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

type VillageProps = {
  village: VillageRankingEntry
  index: number
}

export function SvgRender ({img, percent}: {img: VillageRankingEntry_VillageProgressImage, percent: string}) {
  const fillColor = (percent: string) => {
    const idx = Math.floor(img.numberOfBlocks * +percent * 0.01)
    for (let i = idx; i <= img.numberOfBlocks; i++) {
      const color = document.getElementById(img.id + "_" + i +"")
      if (color)
        color.style.fill = "white"
    }
  }

  React.useEffect(() => {
    fillColor(percent)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const rendering = (img: VillageRankingEntry_VillageProgressImage) => {
    const result = []
    for (let i = 0; i < img.paths.length; i++) {
      result.push(
        React.createElement(img.paths[i].type, {...img.paths[i].props, key: i})
      )
    }
    return result
  }
  return (
		<svg xmlns="http://www.w3.org/2000/svg" x='0px' y='0px' width="100%" height="304px" viewBox="0 0 375 340" xmlSpace="preserve">
			<g>
				{rendering(img)}
			</g>
		</svg>
  )
}

function Village({ village, index }: VillageProps) {
  const rank_mark = ['👑', '🌸', '☘️']
  return (
    <>
      {village && index < 10 && 
        <>
          <TownWrapper>
            {index < 3 ? 
              <>
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
              </>
            :
            <>
              <TownBlock>
                <RankingBlock bgColor="#EAEAEF" color="#1067CD" >{index + 1}</RankingBlock>
                <p className="village_name">{village.village?.name}</p>
                {village.progressPercentage && <p className="process">{`${village.progressPercentage}%`}</p>}
              </TownBlock>
            </>
          }
        </TownWrapper>
      </>
      }
    </>
  );
}

export default function VillageList() {
  const villages = useSelector((state: RootState) => state.village.villages);
  return (
    <>
      {villages.map((village, index) => (
        <Village village={village} index={index} key={index} />
      ))}
    </>
  )
}