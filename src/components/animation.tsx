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
      left: -229px;
    }
    20% {
      opacity: 1;
      left: -229px;
    }
    60% {
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

const TextBoxBlock = styled.section`
  position: absolute;
  z-index: 3;
  bottom: 196px;
  left: 200px;
  opacity: 0;
  animation-name: fadein, fadeout__textBox;
  animation-delay: 0s, 2s;
  animation-duration: 2s, 0.3s;
  animation-timing-function: ease-in, ease-in-out;

  width: 110px;
  height: 90px;

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 0;
    }
    60% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeout__textBox {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  p {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 160%;

    text-align: center;
    letter-spacing: -0.005em;

    color: #000000;
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

  const character = ['old', 'wheelchair', 'baby']
  const textList = [
    ['어떻게', '지나간담?'],
    ['아이고,', '불편해!'],
    ['이런,', '못 가겠네!']
  ]
  const [imgUrl, setImgUrl] = useState("/assets/svg/old.svg")
  const [count, setCount] = useState(0);
  const [change, setChange] = useState(false);

  const textBox = "/assets/svg/textBox.svg"

  const changeImgUrl = (count: number) => {
    setImgUrl(`/assets/svg/${character[count]}.svg`)
  }

  useEffect(() => {
    const chracterChange = setInterval(() => {
      setChange(true)
      changeImgUrl(count)
      if (count === 2) {
        setCount(0)
      }
      else {
        setCount(count + 1)
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
            <TextBoxBlock>
              <section style={{width: '100%', height: '100%', backgroundImage: `url(${textBox})`, paddingTop: '16px', boxSizing: 'border-box'}}>
                <p>{textList[count][0]}</p>
                <p>{textList[count][1]}</p>
              </section>
            </TextBoxBlock>
          </>
        )}
      </div>
    </div>
  )
}