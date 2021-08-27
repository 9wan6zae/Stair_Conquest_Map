import * as React from 'react';
import { Link } from 'react-router-dom';
import styled, {css} from 'styled-components';
import { Item } from '../types/SearchPlaces';
import * as accessibilityAPI from '../api/accessibility'

import { RegisterAccessibilityParams, RegisterAccessibilityParams_RegisterPlaceAccessibilityParams, RegisterAccessibilityParams_RegisterBuildingAccessibilityParams } from '../types/Accessibility'

interface BtnProps {
  active: boolean
}

const ModalBlock = styled.div`
  width: 100%;
  max-width: var(--maxWidth);
  height: 96%;
  position: relative;
  overflow: auto;
  top: 4%;
  border-radius: 20px 20px 0 0;
  z-index: 999;
  background: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.16);

  & > header {
    margin-bottom: 28px;
    margin-top: 40px;
    padding: 0 20px;
    width: 100%;
    box-sizing: border-box;
    & > h3 {
      margin: 0
    }
  }
`

const ButtonGroup = styled.section`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`

const CustomBtn = styled.button<BtnProps>`
  min-width: 100px;
  width: 100%;
  height: 54px;
  background: #F2F2F5;
  border-radius: 20px;
  box-sizing: border-box;
  color: #B5B5C0;
  border: none;
  margin-right: 16px;

  font-size: 16px;
  font-weight: 500;

  &:last-child {
    margin: 0;
  }

  ${props => props.active &&
    css`
      background: #fff;
      border: 2px solid #1D85FF;
      color: #1D85FF
    `}
`

export default function RegisterModal({setOpen, item}: {setOpen(flag: boolean): void, item: Item}) {
  const [load, setLoad] = React.useState(true)
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    if (load) {
      if (!item.hasBuildingAccessibility && !item.hasPlaceAccessibility) {
        setPage(1)
      } else if(item.hasBuildingAccessibility) {
        setPage(2)
      }
    }
    return () => setLoad(false)
  }, [item.hasBuildingAccessibility, item.hasPlaceAccessibility, load])

  React.useEffect(() => {
    if (load) document.body.style.overflow = "hidden"
    return () => {document.body.style.overflow = "auto"}
  }, [load])

  const [place, setPlace] = React.useState<RegisterAccessibilityParams_RegisterPlaceAccessibilityParams>(
    {
      placeId: item.place.id,
      isFirstFloor: true,
      hasStair: true,
      isWheelchairAccessible: true
    }
  )
  const [building, setBuilding] = React.useState<RegisterAccessibilityParams_RegisterBuildingAccessibilityParams | undefined>(
    {
      buildingId: item.building.id,
      hasElevator: true,
      hasObstacleToElevator: true,
      stairInfo: 1
    }
  );

  const updateInfo = async () => {
    if (place || building) {
      const info: RegisterAccessibilityParams = {
        placeAccessibilityParams: undefined,
        buildingAccessibilityParams: undefined
      }
      info.placeAccessibilityParams = place
      info.buildingAccessibilityParams = building
      console.log(info)
      await accessibilityAPI.register(info)
    }
  }

  const limitText = (text: string) => {
    const limit = 15
    if (text.length > limit) {
      return text.substr(0, limit) + '..'
    } else return text
  }

  const quesiton_building = [
    {
      quesiton: "이 건물 입구에 계단이 있나요?",
      attribute: "stairInfo",
      buttons: [
        {text: "5칸 미만", value: 1},
        {text: "5칸 이상", value: 2},
        {text: "없어요", value: 0}
      ]
    },
    {
      quesiton: "이 건물 엘리베이터가 있나요?",
      attribute: "hasElevator",
      buttons: [
        {text: "있어요", value: true},
        {text: "없어요", value: false}
      ]
    },
    {
      quesiton: "엘리베이터까지 가는 길에 계단이 있나요?",
      attribute: "hasObstacleToElevator",
      buttons: [
        {text: "있어요", value: true},
        {text: "없어요", value: false}
      ]
    },
  ]

  const quesiton_place = [
    {
      quesiton: "1층에 있는 장소인가요?",
      attribute: "isFirstFloor",
      buttons: [
        {text: "있어요", value: true},
        {text: "없어요", value: false}
      ]
    },
    {
      quesiton: "입구로 들어가는 길에 계단이 있나요?",
      attribute: "hasStair",
      buttons: [
        {text: "있어요", value: true},
        {text: "없어요", value: false}
      ]
    },
    {
      quesiton: "휠체어로 이용가능한 곳인가요?",
      attribute: "isWheelchairAccessible",
      buttons: [
        {text: "가능해요", value: true},
        {text: "불가능해요", value: false}
      ]
    },
  ]

  const nextAction = () => {
    setPage(2)
    const modal = document.getElementById('register-modal')
    modal?.scrollTo(0, 0)
  }

  const skipAction = () => {
    nextAction()
    setBuilding(undefined)
  }

  return (
    <div id="register-modal">
      <ModalBlock>
        {page === 1 && (
          <>
            <header>
              <h3 className="title3">{limitText(item.place.name)} 장소가 있는 건물</h3>
              <p className="register-modal__address">{item.place.address}</p>
            </header>
            <main>
              <section>
                <section className="register-modal__info">
                  <img src="./assets/png/flag.png" alt="flag" />
                  <p className="register-modal__info__title">앗, 이 건물의 첫 번째 정복자세요!</p>
                  <p className="register-modal__info__description"><strong>{item.place.name}</strong>의 정보를 등록하기 전, 이 건물에 대해 알려 주시겠어요?</p>
                </section>
                {building && quesiton_building.map((q, i) => (
                  <section className="register-modal__question" key={i}>
                    <p className="question__title">{q.quesiton}</p>
                    <ButtonGroup>
                      {q.buttons.map((b, i) => (
                        <CustomBtn key={i} onClick={() => setBuilding({...building, [q.attribute]: b.value})} active={building[q.attribute] === b.value}>{b.text}</CustomBtn>
                      ))}
                    </ButtonGroup>
                  </section>
                ))}
              </section>
              <footer className="register-modal__footer">
                {item.hasPlaceAccessibility &&
                  <>
                     <Link to="/register_complete"><button className="next-btn" onClick={updateInfo}>등록하기</button></Link>
                  </>
                }
                {!item.hasPlaceAccessibility &&
                  <>
                    <button onClick={skipAction}>건너뛰기</button>
                    <button className="next-btn" onClick={nextAction}>다음</button>
                  </>
                }
              </footer>
            </main>
          </>
        )}
        {page === 2 && (
          <>
            <header>
              <h3 className="title3">{item.place.name}</h3>
              <p className="register-modal__address">{item.place.address}</p>
            </header>
            <main>
              <section>
                <section className="register-modal__info">
                  <img src="./assets/png/flag.png" alt="flag" />
                  <p className="register-modal__info__title">이 장소의 접근성 정보를 알려주세요</p>
                </section>
                {place && quesiton_place.map((q, i) => (
                  <section className="register-modal__question" key={i}>
                    <p>{q.quesiton}</p>
                    <ButtonGroup>
                      {q.buttons.map((b, i) => (
                        <CustomBtn key={i} onClick={() => setPlace({...place, [q.attribute]: b.value})} active={place[q.attribute] === b.value}>{b.text}</CustomBtn>
                      ))}
                    </ButtonGroup>
                  </section>
                ))}
              </section>
              <footer className="register-modal__footer">
                <Link to="/register_complete"><button className="next-btn" onClick={updateInfo}>등록하기</button></Link>
              </footer>
            </main>
          </>
        )}
      </ModalBlock>
      <section onClick={() => setOpen(false)} style={{zIndex: 900, position: 'fixed', width: '100%', height: '100%', top: 0, left: 0}} />
    </div>
  )
}