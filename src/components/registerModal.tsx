import * as React from 'react';
import { Link } from 'react-router-dom';
import styled, {css} from 'styled-components';
import { Item } from '../types/SearchPlaces';
import * as accessibilityAPI from '../api/accessibility'

import { RegisterAccessibilityParams, RegisterAccessibilityParams_RegisterPlaceAccessibilityParams, RegisterAccessibilityParams_RegisterBuildingAccessibilityParams } from '../types/Accessibility'
import { Background } from './sideBar';

type ModalBlockProps = {
  open: boolean
}

const ModalWrapper = styled.div<ModalBlockProps>`
  position: fixed;
  top: 100%;
  width: 100%;
  height: 100%;
  z-index: 901;
  transition: 0.6s ease
  ${props =>
    props.open && 
    css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      z-index: 901;
      display: flex;
      justify-content: center;
    `}
`

const ModalBlock = styled.div<ModalBlockProps>`
  width: 100%;
  max-width: var(--maxWidth);
  height: 96%;
  position: relative;
  overflow: auto;
  top: 100%;
  border-radius: 20px 20px 0 0;
  z-index: 999;
  background: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.16);

  transition: 0.3s ease;

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

  ${props =>
    props.open && 
    css`
      top: 4%;
    `}
`

const ButtonGroup = styled.section`
  position: relative;
  width: 100%;
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  margin-top: 20px;
`

export default function RegisterModal({open, setOpen, item}: {open: boolean, setOpen(flag: boolean): void, item: Item}) {
  return (
    <ModalWrapper open={open}>
      <ModalBlock id ="register-modal" open={open}>
        {open && <ModalContent item={item} setOpen = {setOpen}></ModalContent>}
      </ModalBlock>
      {open && <Background onClick={() => setOpen(false)}/>}
    </ModalWrapper>
  )
}

function ModalContent ({item, setOpen}: {item: Item, setOpen(flag: boolean): void}) {
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
    return () => {setLoad(false)}
  }, [item.hasBuildingAccessibility, item.hasPlaceAccessibility, load])

  React.useEffect(() => {
    if (load) document.body.style.overflow = "hidden"
    return () => {document.body.style.overflow = "auto"}
  }, [load])

  const [place, setPlace] = React.useState<RegisterAccessibilityParams_RegisterPlaceAccessibilityParams>(
    {
      placeId: item.place.id,
      isFirstFloor: true,
      stairInfo: 2,
      hasSlope: true,
    }
  )
  const [building, setBuilding] = React.useState<RegisterAccessibilityParams_RegisterBuildingAccessibilityParams | undefined>(
    {
      buildingId: item.building.id,
      entranceStairInfo: 2,
      hasSlope: true,
      hasElevator: true,
      elevatorStairInfo: 2
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

  const [quesiton_building, setQuestionBuilding] = React.useState([
    {
      quesiton: "이 건물 입구에 계단이 있나요?",
      attribute: "entranceStairInfo",
      disabled: false,
      buttons: [
        {text: "1칸", value: 2},
        {text: "2~5칸", value: 3},
        {text: "6칸 이상", value: 4},
        {text: "없어요", value: 1}
      ]
    },
    {
      quesiton: "이 건물 입구에 경사로가 있나요?",
      attribute: "hasSlope",
      disabled: false,
      buttons: [
        {text: "있어요", value: true},
        {text: "없어요", value: false}
      ]
    },
    {
      quesiton: "이 건물에 엘리베이터가 있나요?",
      attribute: "hasElevator",
      disabled: false,
      buttons: [
        {text: "있어요", value: true},
        {text: "없어요", value: false}
      ]
    },
    {
      quesiton: "엘리베이터까지 가는 길에 계단이 있나요?",
      attribute: "elevatorStairInfo",
      disabled: false,
      buttons: [
        {text: "1칸", value: 2},
        {text: "2~5칸", value: 3},
        {text: "6칸 이상", value: 4},
        {text: "없어요", value: 1}
      ]
    },
  ])

  const quesiton_place = [
    {
      quesiton: "1층에 있는 장소인가요?",
      attribute: "isFirstFloor",
      disabled: false,
      buttons: [
        {text: "있어요", value: true},
        {text: "없어요", value: false}
      ]
    },
    {
      quesiton: "입구로 들어가는 길에 계단이 있나요?",
      attribute: "stairInfo",
      disabled: false,
      buttons: [
        {text: "1칸", value: 2},
        {text: "2~5칸", value: 3},
        {text: "6칸 이상", value: 4},
        {text: "없어요", value: 1}
      ]
    },
    {
      quesiton: "입구로 들어가는 길에 경사로가 있나요?",
      attribute: "hasSlope",
      disabled: false,
      buttons: [
        {text: "있어요", value: true},
        {text: "없어요", value: false}
      ]
    },
  ]

  const prevAction = () => {
    setPage(1)
    const modal = document.getElementById('register-modal')
    modal?.scrollTo(0, 0)
  }

  const nextAction = () => {
    setPage(2)
    const modal = document.getElementById('register-modal')
    modal?.scrollTo(0, 0)
  }

  // const skipAction = () => {
  //   nextAction()
  //   setBuilding(undefined)
  // }

  return (
    <>
        {page === 1 && building && (
          <ModalContentLayout
            header={
              <>
                <h3 className="title3">{limitText(item.place.name)} 장소가 있는 건물</h3>
                <p className="register-modal__address">{item.place.address}</p>
              </>
            }
            info = {
              <>
                <img src="./assets/png/flag.png" alt="flag" />
                <p className="register-modal__info__title">앗, 이 건물의 첫 번째 정복자세요!</p>
                <p className="register-modal__info__description"><strong>{item.place.name}</strong>의 정보를 등록하기 전, 이 건물에 대해 알려 주시겠어요?</p>
              </>
            }
            footer = {
              <>
                {item.hasPlaceAccessibility &&
                      <Link to="/register_complete"><button className="next-btn" onClick={updateInfo}>등록하기</button></Link>
                }
                {!item.hasPlaceAccessibility &&
                  <section className="buttons">
                    <button className="prev-btn" onClick={() => setOpen(false)}>닫기</button>
                    <button className="next-btn" onClick={nextAction}>다음</button>
                    {/* <p style={{textAlign: 'center', marginTop: '24px', color: '#6A6A73', fontSize: '18px', fontWeight: 500}} onClick={skipAction}>건너뛰기</p> */}
                  </section>
                }
              </>
            }
            obj = {building}
            setObj={setBuilding}
            setQuestion={setQuestionBuilding}
            question={quesiton_building}
          />
        )}
        {page === 2 && (
          <ModalContentLayout
            header={
              <>
                <h3 className="title3">{item.place.name}</h3>
                <p className="register-modal__address">{item.place.address}</p>
              </>
            }
            info = {
              <>
                <img src="./assets/png/flag.png" alt="flag" />
                <p className="register-modal__info__title">이 장소의 접근성 정보를 알려주세요</p>
              </>
            }
            footer = {
              <section className="buttons">
                <button className="prev-btn" onClick={prevAction}>이전</button>
                <Link to="/register_complete" style={{width: '100%'}}><button className="next-btn" onClick={updateInfo}>등록하기</button></Link>
              </section>
            }
            obj = {place}
            setObj={setPlace}
            question={quesiton_place}
          />
        )}
      </>
  )
}

type Button = {
  text: string
  value: number | boolean
}

type Question = {
  quesiton: string,
  attribute: string,
  disabled: boolean,
  buttons: Button[]
}

type ModalContentLayoutProps = {
  header: React.ReactElement
  info: React.ReactElement
  obj: RegisterAccessibilityParams_RegisterPlaceAccessibilityParams | RegisterAccessibilityParams_RegisterBuildingAccessibilityParams
  question: Question[]
  footer: React.ReactElement
  setObj(obj: any): void
  setQuestion(question: any): void
}

type ButtonActionProps = {
  obj: RegisterAccessibilityParams_RegisterPlaceAccessibilityParams | RegisterAccessibilityParams_RegisterBuildingAccessibilityParams
  attribute: string,
  value: number | boolean,
  setObj(obj: any): void,
  setQuestion(question: any): void
}

ModalContentLayout.defaultProps = {
  setQuestion() {}
}

type BtnProps = {
  active: boolean
  disabled: boolean
}

type QuesitonSectionProps = {
  disabled: boolean
}

const QuesitonSection = styled.section<QuesitonSectionProps>`
  width: 100%;
  padding: 0 20px;
  margin-top: 52px;
  box-sizing: border-box;

  p.question__title {
    font-weight: 500;
    font-size: 16px;
    color: #000;
  }

  ${props => props.disabled &&
  css`
    p.question__title {
      font-weight: 500;
      font-size: 16px;
      color: rgb(179, 179, 179);
    }
  `}
`

const CustomBtn = styled.button<BtnProps>`
  min-width: 100px;
  width: 100%;
  height: 54px;
  max-width: 48%;
  background: #F2F2F5;
  border-radius: 20px;
  box-sizing: border-box;
  color: #B5B5C0;
  border: none;

  margin-bottom: 12px;

  font-size: 16px;
  font-weight: 500;

  &:last-child {
    margin: 0;
  }

  ${props => props.active &&
    css`
      background: #fff;
      border: 2px solid #1D85FF;
      color: #1D85FF;
    `}
  ${props => props.disabled &&
    css`
      background: rgb(251, 251, 252);
      border: none;
      color: rgb(233, 233, 236);
    `}
`

function ModalContentLayout({header, info, obj, question, footer, setObj, setQuestion}: ModalContentLayoutProps) {
  const buttonAction = ({obj, attribute, value, setObj}: ButtonActionProps) => {
    setObj({...obj, [attribute]: value})
    if (attribute === 'hasElevator') {
      if (!value) {
        const tempParam = {...obj}
        tempParam.hasElevator = value
        tempParam.elevatorStairInfo = 0
        setObj(tempParam)
        const tempQuestion = [...question]
        tempQuestion[3].disabled = true
        setQuestion(tempQuestion)
      }
      else {
        const tempParam = {...obj}
        tempParam.hasElevator = value
        tempParam.elevatorStairInfo = 2
        setObj(tempParam)
        const tempQuestion = [...question]
        tempQuestion[3].disabled = false
        setQuestion(tempQuestion)
      }
    }
  }
  return (
    <>
    <header>
      {header}
    </header>
    <main>
      <section>
        <section className="register-modal__info">
          {info}
        </section>
        {obj && question.map((q, i) => (
              <QuesitonSection disabled={q.disabled} key={i}>
                <p className="question__title">{q.quesiton}</p>
                <ButtonGroup>
                  {q.buttons.map((b, i) => (
                    <CustomBtn key={i} disabled={q.disabled} onClick={() => buttonAction({obj, attribute: q.attribute, value: b.value, setObj, setQuestion})} active={obj[q.attribute] === b.value}>{b.text}</CustomBtn>
                  ))}
                </ButtonGroup>
              </QuesitonSection>
            ))}
      </section>
      <footer className="register-modal__footer">
        {footer}
      </footer>
    </main>
    </>
  )
}