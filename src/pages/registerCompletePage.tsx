import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { RootState } from '../modules';

import html2canvas from 'html2canvas'

const RegisterCompleteBlock = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background: var(--primary);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  p.register_complete__title {
    font-size: 28px;
    color: #fff;
    font-weight: 700;
    text-align: center;
  }

  p.register_complete__subtitle {
    font-size: 20px;
    color: #fff;
    font-weight: 500;
    text-align: center;
    margin-top: 8px;
  }

  section.register_complete__info {
    display: flex;
    flex-direction: column;
    align-items: center;

    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    padding-top: 40px;
    z-index: 3;
  }
  section.register_complete__description {
    text-align: center;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    margin-top: 16px;
    line-height: 160%;
  }

  section.register_complete__bottom {
    width: 952px;
    position: absolute;
    z-index: 1;
    top: 338px;
    left: 50%;
    transform: translateX(-50%);
  }

  section.register_complete__action {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-height: 146px;
    z-index: 2;
    background: #fff;
    padding: 0 20px;
    box-sizing: border-box;
    animation: fadein 5s;
    z-index: 5;
  }

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    80% {
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
`

export default function RegisterCompletePage() {
  const item = useSelector((state: RootState) => state.item.item);
  const result = useSelector((state: RootState) => state.result.result);

  const onCapture = () => {
    const filename = `${result?.registeredUserOrder}번째 정복자 ${result?.buildingAccessibility?.registeredUserName}님`
    const shareImg = document.getElementById('share')
    if (shareImg)
    html2canvas(shareImg).then(canvas => {
      onSaveAs(canvas.toDataURL('image/png'), filename)
    })
    // const area = document.getElementById('area')
    // const filename = `${result?.registeredUserOrder}번째 정복자 ${result?.buildingAccessibility?.registeredUserName}님`
    // if (area) {
    //   html2canvas(area).then(canvas => {
    //     onSaveAs(canvas.toDataURL('image/png'), filename)
    //   })
    // }
  }

  const onSaveAs = (uri: string, filename: string) => {
    const link = document.createElement('a')
    document.body.appendChild(link)
    link.href = uri
    link.download = filename
    link.click()
    document.body.removeChild(link)
  }

  const setUserName = (username: string | undefined) => {
    if (username) return username
    else return '익명 비밀요원'
  }

  return (
    <>
      <RegisterCompleteBlock id="area">
        <section style={{width: '100%', height: '100vh'}}>
          <section className="register_complete__info">
            <p className="register_complete__title">계단을 정복했어요🎉!</p>
            <p className="register_complete__subtitle">{result?.registeredUserOrder}호 정복자 {setUserName(result?.buildingAccessibility?.registeredUserName?.value)}</p>
            <img style={{marginTop: '56px'}} src="./assets/svg/character_astronut.svg" alt="character" />
            <section className="register_complete__description">
              <p><b>{item?.place.name}</b> 계단 정보를 등록했어요.</p>
              <p>모두가 가고 싶은 곳에 갈 수 있는</p>
              <p>사회에 기여하셨습니다. 정말 고마워요 ☺️</p>
            </section>
          </section>
        </section>
        <section className="register_complete__bottom">
          <img width="100%" src="./assets/svg/bottom.svg" alt="bottom" />
        </section>
        <section className="register_complete__action">
          <button onClick={onCapture} className="next-btn">친구랑 같이 계단 정복하기</button>
          <Link to="/accessibility" style={{marginTop: '24px'}}><button className="text-btn">닫기</button></Link>
        </section>
        <div style={{opacity: '0%'}}>
          <section id='share' style={{position: 'absolute', top: '0px', width: '500px', height: '500px', backgroundImage: `url('./assets/png/shareBG.png')`}}>
            <section style={{width: '100%', paddingTop: '20px'}} className="register_complete__info">
              <p className="register_complete__title">계단을 정복했어요🎉!</p>
              <p className="register_complete__subtitle">{result?.registeredUserOrder}호 정복자 {setUserName(result?.buildingAccessibility?.registeredUserName?.value)}</p>
              <section style={{marginTop: '300px'}} className="register_complete__description">
                <p><b>{item?.place.name}</b> 계단 정보를 등록했어요.</p>
                <p>모두가 가고 싶은 곳에 갈 수 있는</p>
                <p>사회에 기여하셨습니다. 정말 고마워요 ☺️</p>
              </section>
            </section>
          </section>
        </div>
      </RegisterCompleteBlock>
    </>
  )
}