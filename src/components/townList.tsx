import * as React from 'react';
import {TownType} from '../types/town'
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
  position: relative;
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
  width: 100%;
  height: 240px;
  background: #EAEAEF;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

type TownListProps = {
  towns: TownType[]
}

type TownProps = {
  town: TownType
  index: number
}

function Town({ town, index }: TownProps) {
  return (
    <>
      {index < 10 && (<TownWrapper>
        {index < 3 ? 
        (<BgBlock>
          <TopTownBlock>
            <RankingBlock bgColor="#67AEFF" color="#fff" >{index + 1}</RankingBlock>
            <p>{town.name}</p>
            <p className="process">{`${town.process}%`}</p>
          </TopTownBlock>
        </BgBlock>): 
        (<TownBlock>
          <RankingBlock bgColor="#EAEAEF" color="#1067CD" >{index + 1}</RankingBlock>
          <p>{town.name}</p>
          <p className="process">{`${town.process}%`}</p>
        </TownBlock>)}
      </TownWrapper>)}
    </>
  );
}

export default function TownList({towns}: TownListProps) {
  return (
    <>
      {towns.map((town, index) => (
        <Town town={town} index={index} key={index} />
      ))}
    </>
  )
}