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
  background-image: url('./assets/gif/confetti-min.gif');

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  p.register_complete__title {
    font-size: 28px;
    color: #fff;
    font-weight: 700;
    text-align: center;
    width: 100%;
  }

  p.register_complete__subtitle {
    font-size: 20px;
    color: #fff;
    font-weight: 500;
    text-align: center;
    margin-top: 8px;
  }

  section.register_complete__info {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    padding-top: 40px;
    z-index: 3;

    img {
      margin-top: 56px;
    }
  }
  section.register_complete__bottom {
    width: 952px;
    position: absolute;
    z-index: 1;
    top: 338px;
    left: 50%;
    transform: translateX(-50%);
  }

  @media all and (max-width: 320px) {
    section.register_complete__bottom {
      top: 40%
    }
    section.register_complete__info {
      img {
        margin-top: 4px;
        width: 50%;
      }
    }
  }

  @media all and (max-height: 667px) {
    section.register_complete__bottom {
      top: 50%
    }
    section.register_complete__info {
      img {
        margin-top: 50px;
        width: 60%;
      }
    }
  }

  @media all and (max-height: 568px) {
    section.register_complete__bottom {
      top: 40%
    }
    section.register_complete__info {
      img {
        margin-top: 20px;
        width: 46%;
      }
    }
  }

  @media all and (min-height: 1314px) {
    section.register_complete__bottom {
      top: auto;
      bottom: 0px;
    }
    section.register_complete__info {
      img {
        margin-top: 50%;
      }
    }
  }
`

const RegisterCompleteFooter = styled.footer`
  z-index: 6;
  position: absolute;
  height: 280px;
  bottom: 0px;
  left: 0px;
  width: 100%;
  display: flex;
  flex-direction: column;

  section.register_complete__description {
    text-align: center;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    line-height: 160%;
  }

  section.register_complete__action {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-height: 146px;
    background: #fff;
    padding: 0 20px;
    box-sizing: border-box;
    z-index: 5;
  }
`

const ImgModal = styled.section`
  position: absolute;
  z-index: 6;
  width: 100vw;
  height: 100vh;

  top: 0;
  left: 0;

  section.img__wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 20px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
    
    p {
      text-align: center;
      font-size: 18px;
      margin-top: 10px;
    }
  }
`

export default function RegisterCompletePage() {
  const item = useSelector((state: RootState) => state.item.item);
  const result = useSelector((state: RootState) => state.result.result);
  const [img, setImg] = React.useState('')
  const [open, setOpen] = React.useState(false)

  const onCapture = () => {
    const filename = `${result?.registeredUserOrder}번째 정복자 ${result?.buildingAccessibility?.registeredUserName}님`
    const shareImg = document.getElementById('share')
    if (shareImg)
    html2canvas(shareImg).then(canvas => {
      setImg(canvas.toDataURL('image/png'))
      console.log(canvas.toDataURL('image/png'))
      setOpen(true)
      // onSaveAs(canvas.toDataURL('image/png'), filename)
    })
  }

  // const onSaveAs = (uri: string, filename: string) => {
  //   const link = document.createElement('a')
  //   document.body.appendChild(link)
  //   link.href = uri
  //   link.download = filename
  //   link.click()
  //   document.body.removeChild(link)
  // }

  const setUserName = (username: string | undefined) => {
    if (username) return username
    else return '익명 비밀요원'
  }

  return (
    <>
      <RegisterCompleteBlock>
        <section style={{width: '100%', height: '100vh'}}>
          <section className="register_complete__info">
            <p className="register_complete__title">계단을 정복했어요🎉!</p>
            <p className="register_complete__subtitle">{result?.registeredUserOrder}호 정복자 {setUserName(result?.buildingAccessibility?.registeredUserName?.value)}</p>
            <img src="./assets/svg/character_astronut.svg" alt="character" />
          </section>
        </section>
        <section className="register_complete__bottom">
          <img width="100%" src="./assets/svg/bottom.svg" alt="bottom" />
        </section>
        <RegisterCompleteFooter>
          <section className="register_complete__description">
            <p><b>{item?.place.name}</b> 계단 정보를 등록했어요.</p>
            <p>모두가 가고 싶은 곳에 갈 수 있는</p>
            <p>사회에 기여하셨습니다. 정말 고마워요 ☺️</p>
          </section>
          <section className="register_complete__action">
            <button onClick={onCapture} className="next-btn">친구랑 같이 계단 정복하기</button>
            <Link to="/accessibility" style={{marginTop: '24px'}}><button className="text-btn">닫기</button></Link>
          </section>
        </RegisterCompleteFooter>
        <RegisterCompleteBlock style={{opacity: '0%'}}>
          <section id='share' style={{position: 'absolute', top: '0px', width: '500px', height: '500px', backgroundImage: `url('./assets/png/shareBG.png')`}}>
            <section style={{width: '100%', paddingTop: '20px'}} className="register_complete__info">
              <p className="register_complete__title">계단을 정복했어요🎉!</p>
              <p className="register_complete__subtitle">{result?.registeredUserOrder}호 정복자 {setUserName(result?.buildingAccessibility?.registeredUserName?.value)}</p>
              <section style={{marginTop: '300px', textAlign: 'center', color: '#fff', fontSize: '18px', fontWeight: 500, lineHeight: '160%'}}>
                <p><b>{item?.place.name}</b> 계단 정보를 등록했어요.</p>
                <p>모두가 가고 싶은 곳에 갈 수 있는</p>
                <p>사회에 기여하셨습니다. 정말 고마워요 ☺️</p>
              </section>
            </section>
          </section>
        </RegisterCompleteBlock>
      </RegisterCompleteBlock>
      {open &&
        <ImgModal onClick={() => setOpen(false)}>
          <section className="img__wrapper">
            <img width="100%" src={img} alt="tt"/>
            <p>이미지를 눌러서 다운로드 해주세요!</p>
          </section>
        </ImgModal>}
    </>
  )
}