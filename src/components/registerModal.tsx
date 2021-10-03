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

const ModalHeader = styled.section`
  position: sticky;
  height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  top: 0;
  background: #fff;
  z-index: 5;
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
`

type RegisterModalBtnProps = {
  active: boolean
}

const RegisterModalBtn = styled.button<RegisterModalBtnProps>`
  min-height: 56px;
  max-height: 56px;
  width: 100%;
  background-color: var(--primary);
  color: #fff;
  font-size: 18px;
  font-weight: 700;

  border-radius: 20px;
  border: none;

  ${props => !props.active &&
  css `
    opacity: 0.3
  `}
`

export default function RegisterModal({open, setOpen, item, type}: {open: boolean, setOpen(flag: boolean): void, item: Item, type?: string}) {
  return (
    <ModalWrapper open={open}>
      <ModalBlock id ="register-modal" open={open}>
        {open && 
          <ModalContent item={item} setOpen = {setOpen} type={type}></ModalContent>
        }
      </ModalBlock>
      {open && <Background onClick={() => setOpen(false)}/>}
    </ModalWrapper>
  )
}

function ModalContent ({item, setOpen, type}: {item: Item, setOpen(flag: boolean): void, type?: string}) {
  const [load, setLoad] = React.useState(true)
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    if (load) {
      if (type === "건물") setPage(2)
    }
    return () => {setLoad(false)}
  }, [type, load])

  React.useEffect(() => {
    if (load) document.body.style.overflow = "hidden"
    return () => {document.body.style.overflow = "auto"}
  }, [load])

  const checkFillInfo = (obj: RegisterAccessibilityParams_RegisterBuildingAccessibilityParams | RegisterAccessibilityParams_RegisterPlaceAccessibilityParams) => {
    let pass = true
    for (let key in obj) {
      if (key !== 'comment' && obj[key] === undefined) {
        pass = false
        break
      }
    }
    return pass
  }

  const [place, setPlace] = React.useState<RegisterAccessibilityParams_RegisterPlaceAccessibilityParams>(
    {
      placeId: item.place.id,
      isFirstFloor: undefined,
      stairInfo: undefined,
      hasSlope: undefined,
      comment: undefined
    }
  )
  const [building, setBuilding] = React.useState<RegisterAccessibilityParams_RegisterBuildingAccessibilityParams | undefined>(
    {
      buildingId: item.building.id,
      entranceStairInfo: undefined,
      hasSlope: undefined,
      hasElevator: undefined,
      elevatorStairInfo: undefined,
      comment: undefined
    }
  );

  const updateInfo = async (obj: RegisterAccessibilityParams_RegisterBuildingAccessibilityParams | RegisterAccessibilityParams_RegisterPlaceAccessibilityParams) => {
    if (checkFillInfo(obj)) {
      if (place || building) {
        const info: RegisterAccessibilityParams = {
          placeAccessibilityParams: undefined,
          buildingAccessibilityParams: undefined
        }
        if (type === "건물") info.buildingAccessibilityParams = building
        else if (type === "장소")  info.placeAccessibilityParams = place
        else {
          info.placeAccessibilityParams = place
          info.buildingAccessibilityParams = building
        }
        setOpen(false)
        console.log(info)
        await accessibilityAPI.register(info)
      }
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
      quesiton: "1층에 있는 점포인가요?",
      attribute: "isFirstFloor",
      disabled: false,
      buttons: [
        {text: "네, 1층이에요", value: true},
        {text: "아니요", value: false}
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
      quesiton: "점포 안으로 들어갈 수 있는 경사로가 있나요?",
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

  const nextAction = (obj: RegisterAccessibilityParams_RegisterBuildingAccessibilityParams | RegisterAccessibilityParams_RegisterPlaceAccessibilityParams) => {
    if (checkFillInfo(obj)) {
      setPage(2)
      const modal = document.getElementById('register-modal')
      modal?.scrollTo(0, 0)
    }
  }

  // const skipAction = () => {
  //   setPage(2)
  //   const modal = document.getElementById('register-modal')
  //   modal?.scrollTo(0, 0)
  //   setBuilding(undefined)
  // }

  return (
    <>
        {page === 1 && (
          <>
            <ModalHeader>
              <>
                <div onClick={() => setOpen(false)} style={{paddingLeft: '20px', boxSizing: 'border-box'}}>
                  <img src="./assets/svg/ic_arr_left.svg" alt="back_btn" />
                </div>
              </>
            </ModalHeader>
            <ModalContentLayout
              header={
                <>
                  <h3 className="title3">{item.place.name}</h3>
                  <p className="register-modal__address">{item.place.address}</p>
                </>
              }
              info = {
                <>
                  <p style={{fontSize: "80px"}}>🚥</p>
                  <p className="register-modal__info__title">이 장소의 접근성 정보를 알려주세요 😉</p>
                </>
              }
              footer = {
                <>
                  {type === "장소" &&
                        <Link to="/register_complete" style={{pointerEvents: checkFillInfo(place) ? 'auto' : 'none'}}><RegisterModalBtn active={checkFillInfo(place)}  onClick={() => updateInfo(place)}>등록하기</RegisterModalBtn></Link>
                  }
                  {type !== "장소" &&
                    <>
                      <RegisterModalBtn active={checkFillInfo(place)} onClick={() => nextAction(place)}>다음</RegisterModalBtn>
                      {/* <p style={{textAlign: 'center', marginTop: '24px', color: '#6A6A73', fontSize: '18px', fontWeight: 500}} onClick={skipAction}>건너뛰기</p> */}
                    </>
                    // <Link to="/register_complete" style={{pointerEvents: checkFillInfo(place) ? 'auto' : 'none'}}><RegisterModalBtn active={checkFillInfo(place)} onClick={() => updateInfo(place)}>등록하기</RegisterModalBtn></Link>
                  }
                </>
              }
              obj = {place}
              setObj={setPlace}
              question={quesiton_place}
            />
          </>
        )}
        {page === 2 && building && (
          <>
            <ModalHeader>
                {type !== "건물" && <div onClick={() => prevAction()} style={{paddingLeft: '20px', boxSizing: 'border-box'}}>
                  <img src="./assets/svg/ic_arr_left.svg" alt="back_btn" />
                </div>}
                {type === "건물" && <div onClick={() => setOpen(false)} style={{paddingLeft: '20px', boxSizing: 'border-box'}}>
                  <img src="./assets/svg/ic_arr_left.svg" alt="back_btn" />
                </div>}
            </ModalHeader>
            <ModalContentLayout
              header={
                <>
                  <h3 className="title3">{limitText(item.place.name)} 장소가 있는 건물</h3>
                  <p className="register-modal__address">{item.place.address}</p>
                </>
              }
              info = {
                <>
                  <p style={{fontSize: "80px"}}>⛳</p>
                  <p className="register-modal__info__title">앗, 이 건물의 첫 번째 정복자세요!</p>
                  <p className="register-modal__info__description"><strong>{item.place.name}</strong>의 정보를 등록하기 전, 이 건물에 대해 알려 주시겠어요?</p>
                </>
              }
              footer = {
                // <>
                //   {type === "건물" &&
                //         <Link to="/register_complete" style={{pointerEvents: checkFillInfo(building) ? 'auto' : 'none'}}><RegisterModalBtn active={checkFillInfo(building)}  onClick={() => updateInfo(building)}>등록하기</RegisterModalBtn></Link>
                //   }
                //   {type !== "건물" &&
                //     <>
                //       <RegisterModalBtn active={checkFillInfo(building)} onClick={() => nextAction(building)}>다음</RegisterModalBtn>
                //       {/* <p style={{textAlign: 'center', marginTop: '24px', color: '#6A6A73', fontSize: '18px', fontWeight: 500}} onClick={skipAction}>건너뛰기</p> */}
                //     </>
                //   }
                // </>
                <Link to="/register_complete" style={{pointerEvents: checkFillInfo(building) ? 'auto' : 'none'}}><RegisterModalBtn active={checkFillInfo(building)} onClick={() => updateInfo(building)}>등록하기</RegisterModalBtn></Link>
              }
              obj = {building}
              setObj={setBuilding}
              setQuestion={setQuestionBuilding}
              question={quesiton_building}
            />
          </>
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
    margin-bottom: 20px;
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

const CommetTextArea = styled.textarea`
  display: block;
  width: 100%;
  min-height: 136px;
  border-radius: 20px;
  border: 2px solid #EAEAEF;
  box-sizing: border-box;
  padding: 16px 20px;
  background: #F2F2F5;
  color: #000;
  font-size: 16px;
  font-weight: 500;
  line-height: 160%;

  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  resize: none;

  outline: none;

  text-overflow: scroll;

  &:focus {
    border: 2px solid #1D85FF !important;
  }

  &::placeholder {
    color: #B5B5C0;
  }
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
  const onChange = (e: any) => {
    let {value} = e.target

    value = value.replace('\n', '')

    setComment(value)

    if (value !== '') {
      setObj({...obj, comment : {value: value}})
    }
  }
  const [comment, setComment] = React.useState('')

  return (
    <>
      <header>
        {header}
      </header>
      <main className="register-modal__main">
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
          <QuesitonSection disabled={false}>
            <p className="question__title">더 도움이 될 정보가 있다면 설명해주세요! <span style={{fontSize: '14px', color: '#9797a5'}}>(선택)</span></p>
            <CommetTextArea
              maxLength={100}
              placeholder="후문에는 계단이 없어 편하게 갈 수 있습니다 (최대 100자)"
              value={comment}
              onChange={onChange} />
          </QuesitonSection>
        </section>
        <footer className="register-modal__footer">
          {footer}
        </footer>
      </main>
    </>
  )
}