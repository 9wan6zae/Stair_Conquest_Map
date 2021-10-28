import * as React from 'react';
import { VillageRankingEntry, VillageRankingEntry_VillageProgressImage } from '../types/Model';
import styled from 'styled-components'

type RankingBlockProps = {
  bgColor: string
  color: string
}

const TownWrapper = styled.section`
  margin: 24px 0;
`

const RankingBlock = styled.div<RankingBlockProps>`
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

const TopTownBlock = styled.div`
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

  p {
    margin-left: 16px;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: -0.005em;
    color: #6A6A73
  }

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

  p {
    margin-left: 16px;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: -0.005em;
    color: #6A6A73
  }

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

const BgBlock = styled.div`
  position: relative;
  width: 100%;
  background: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

type VillageListProps = {
  villages: VillageRankingEntry[]
}

type VillageProps = {
  village: VillageRankingEntry
  index: number
}

function SvgRender ({img, idx}: {img: any, idx: number}) {
  const fillColor = (idx: number) => {
    for (let i = idx; i <= img.numberOfBlocks; i++) {
      const color = document.getElementById(img.id + "_" + i +"")
      if (color)
        color.style.fill = "white"
    }
  }

  React.useEffect(() => {
    fillColor(idx)
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
		<svg style={{borderRadius: '20px', border: '2px solid #EAEAEF', boxSizing: 'border-box'}} xmlns="http://www.w3.org/2000/svg" x='0px' y='0px' width="100%" height="304px" viewBox="0 0 375 304" xmlSpace="preserve">
			<g>
				{rendering(img)}
			</g>
		</svg>
  )
}

function Village({ village, index }: VillageProps) {
  return (
    <>
      {village && index < 10 && (<TownWrapper>
        {index < 3 ? 
        (<BgBlock>
          {village.progressImage && <SvgRender img = {village.progressImage} idx = {Math.floor(village.progressImage.numberOfBlocks * +village.progressPercentage)} />}
          {!village.progressImage && <img height='304px' style={{borderRadius: '20px', border: '2px solid #EAEAEF'}} src={`${process.env.PUBLIC_URL}/assets/svg/오픈 예정.svg`} alt="오픈 예정" />}
          <TopTownBlock>
            <RankingBlock bgColor="#67AEFF" color="#fff" >{index + 1}</RankingBlock>
            <p>{village.village?.name}</p>
            <p className="process">{`${village.progressPercentage}%`}</p>
          </TopTownBlock>
        </BgBlock>):
        (<TownBlock>
          <RankingBlock bgColor="#EAEAEF" color="#1067CD" >{index + 1}</RankingBlock>
          <p>{village.village?.name}</p>
          <p className="process">{`${village.progressPercentage}%`}</p>
        </TownBlock>)}
      </TownWrapper>)}
    </>
  );
}

export default function VillageList({villages}: VillageListProps) {
  return (
    <>
      {villages.map((village, index) => (
        <Village village={village} index={index} key={index} />
      ))}
    </>
  )
}