import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from "styled-components"

const CharacterBlock = styled.section`
  position: absolute;
  z-index: 3;
  bottom: 30px;
  opacity: 0;
  animation-name: move, fadeout;
  animation-delay: 0s, 2s;
  animation-duration: 2s, 0.3s;
  animation-timing-function: linear, ease-in-out;

  @keyframes move {
    0% {
      opacity: 1;
      left: -120px;
    }
    30% {
      opacity: 1;
      left: 20px;
    }
    100% {
      opacity: 1;
      left: 20px;
    }
  }

  @keyframes fadeout {
    from {
      left: 20px;
      opacity: 1;
    }
    to {
      left: 20px;
      opacity: 0;
    }
  }
`

const ReactionBlock = styled.section`
  position: absolute;
  z-index: 3;
  bottom: 180px;
  left: 200px;
  opacity: 0;
  animation-name: fadein, fadeout__reaction;
  animation-delay: 0s, 2s;
  animation-duration: 2s, 0.3s;
  animation-timing-function: ease-in, ease-in-out;

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeout__reaction {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`

const BgBox = styled.figure`
  width: 100%;
  padding-top: 96%;
  background-image: url("/assets/svg/bg.svg");
  background-size: contain;
  margin: 0;
`

export default function Animation() {

  const character = ['old', 'wheelChair', 'baby']
  const [imgUrl, setImgUrl] = useState("/assets/svg/old.svg")
  const [count, setCount] = useState(0);
  const [change, setChange] = useState(false);

  const reaction = "/assets/svg/reaction.svg"

  const changeImgUrl = (count: number) => {
    setImgUrl(`/assets/svg/${character[count]}.svg`)
  }

  useEffect(() => {
    const chracterChange = setInterval(() => {
      setChange(true)
      changeImgUrl(count)
      setCount(count + 1)
      if (count === 2) {
        setCount(0)
      }
      setTimeout(() => setChange(false), 2300)
    }, 2400)
    return () => {clearInterval(chracterChange)}
  })

  useEffect(() => {
    return () => setChange(false);
  }, [])


  return (
    <div>
      <div style={{position: 'relative', width: '100%', overflow: 'hidden'}}>
        <BgBox />
        {change && (
          <>
            <CharacterBlock className="character">
              <img src={imgUrl} alt="character" />
            </CharacterBlock>
            <ReactionBlock>
              <img src={reaction} alt="reaction" />
            </ReactionBlock>
          </>
        )}
      </div>
    </div>
  )
}