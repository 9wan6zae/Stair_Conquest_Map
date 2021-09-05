import * as React from 'react';
import * as accessibilityAPI from "../api/accessibility"
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import { GetAccessibilityResult } from '../types/Accessibility';
import { BuildingAccessibility, PlaceAccessibility } from "../types/Model";
import MainHeader from '../components/mainHeader';
import styled, {css} from 'styled-components';
import { Item } from '../types/SearchPlaces';
import RegisterModal from '../components/registerModal';

const TitleSection = styled.section`
  width: 100%;
  max-width: var(--maxWidth);
  box-sizing: border-box;
  padding: 40px 20px;
  background: #fff;
`

const Division = styled.section`
  box-sizing: border-box;
  width: 100%;
  max-width: var(--maxWidth);
  border: 2px solid #EAEAEF;
`

const AccessibilityInfo = styled.section`
  margin-bottom: 15px;
  width: 100%;
  max-width: var(--maxWidth);
  box-sizing: border-box;
  padding: 36px 0px 53px 0px;
  background: #fff;

  .accessibility__title {
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 100%;
    margin-bottom: 10px;
  }

  .accessibility__description {
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 100%;
    color: #B5B5C0;
  }

  section.accessibility__header {
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    align-items: start;
    img {
      margin-right: 8px;
    }
  }
  border-bottom: 2px solid #D0D0D9;

  section.accessibility__info {
    box-sizing: border-box;
    padding-top: 60px;
  }
  section.accessibility__form {
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: start;
    div.title {
      display: flex;
      align-items: start;
      img {
        margin-right: 20px;
      }
    }
    margin-bottom: 44px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
  section.accessibility__not_register {
    margin-top: 32px;
    width: 100%;
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #F2F2F5;
    p {
      color: #9797A6;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 160%;
    }
  }

  p.att__title {
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 12px;
  }

  p.att__info {
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
  }
`
type SymbolWrapperProps = {
  status: string
}

const SymbolWrapper = styled.div<SymbolWrapperProps>`
  width: 60px;
  height: 60px;
  background: #F2F2F5;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => props.status === './assets/svg/ic_x.svg' && (
    css `
      border: 2px solid #DB0B24;
    `
  )}
`

export default function AccessibilityPage() {
  const item = useSelector((state: RootState) => state.item.item);
  const [accessibility, setAccessibility] = React.useState<GetAccessibilityResult | undefined>()

  const attributeStairInfo = {
    undefined: "정보 없음",
    NONE: "계단 없음",
    ONE: "계단 1칸",
    TWO_TO_FIVE: "계단 2~5칸",
    OVER_SIX: "계단 6칸 이상"
  }

  const attributeStairIcon = {
    undefined: './assets/svg/ic_check.svg',
    NONE: './assets/svg/ic_check.svg',
    ONE: './assets/svg/ic_check.svg',
    TWO_TO_FIVE: './assets/svg/ic_x.svg',
    OVER_SIX: './assets/svg/ic_x.svg'
  }

  const attributeStairSymbol = {
    undefined: './assets/svg/accessibility/ic_stair_true.svg',
    NONE: './assets/svg/accessibility/ic_stair_true.svg',
    ONE: './assets/svg/accessibility/ic_stair_true.svg',
    TWO_TO_FIVE: './assets/svg/accessibility/ic_stair_false.svg',
    OVER_SIX: './assets/svg/accessibility/ic_stair_false.svg'
  }

  const attributeIcon = {
    true: './assets/svg/ic_check.svg',
    undefined: './assets/svg/ic_x.svg'
  }

  const buildingAttributes: any[] = [
    {
      key: "entranceStairInfo",
      title: "건물 입구에",
      info: attributeStairInfo,
      icon: attributeStairIcon,
      symbol: attributeStairSymbol
    },
    {
      key: "hasSlope",
      title: "건물 입구에",
      info: { 
        true: "경사로 있음",
        undefined: "경사로 없음"
      },
      icon: {
        true: './assets/svg/ic_check.svg',
        undefined: './assets/svg/ic_check.svg'
      },
      symbol: {
        true: './assets/svg/accessibility/ic_slope_gray.svg',
        undefined: './assets/svg/accessibility/ic_slope_gray.svg',
      }
    },
    {
      key: "hasElevator",
      title: "엘리베이터",
      info: { 
        true: "있음",
        undefined: "없음"
      },
      icon: attributeIcon,
      symbol: {
        true: './assets/svg/accessibility/ic_elevator_true.svg',
        undefined: './assets/svg/accessibility/ic_elevator_false.svg',
      }
    },
    {
      key: "elevatorStairInfo",
      title: "엘리베이터까지",
      info: attributeStairInfo,
      icon: attributeStairIcon,
      symbol: attributeStairSymbol
    }
  ]

  const placeAttributes: any[] = [
    {
      key: "isFirstFloor",
      title: "층 정보",
      info: { 
        true: "1층에 있음",
        undefined: "1층이 없음"
      },
      icon: attributeIcon,
      symbol: {
        true: './assets/svg/accessibility/ic_firstfloor_true.svg',
        undefined: './assets/svg/accessibility/ic_firstfloor_false.svg',
      }
    },
    {
      key: "stairInfo",
      title: "장소 입구에",
      info: attributeStairInfo,
      icon: attributeStairIcon,
      symbol: attributeStairSymbol
    },
    {
      key: "hasSlope",
      title: "장소 입구에",
      info: { 
        true: "경사로 있음",
        undefined: "경사로 없음"
      },
      icon: {
        true: './assets/svg/ic_check.svg',
        undefined: './assets/svg/ic_check.svg'
      },
      symbol: {
        true: './assets/svg/accessibility/ic_slope_gray.svg',
        undefined: './assets/svg/accessibility/ic_slope_gray.svg',
      }
    },
  ]

  React.useEffect(() => {
    if (item === undefined) {
      window.location.href = '/'
    }
    accessibilityAPI.getAccessibility({
      placeId: `${item?.place.id}`
    }).then(res => {console.log(res.data); setAccessibility(res.data)})
  }, [item])

  return (
    <div style={{background: '#F2F2F5'}}>
      <MainHeader />
      <TitleSection>
        <p className="title3">{item?.place.name}</p>
        <p className="description">{item?.place.address}</p>
      </TitleSection>
      <Division />
      <AccessibilityLayout
        type = "건물"
        item = {item}
        accessibility = {accessibility?.buildingAccessibility}
        attribute = {buildingAttributes}
      />
      <AccessibilityLayout
        type = "장소"
        item = {item}
        accessibility = {accessibility?.placeAccessibility}
        attribute = {placeAttributes}
      />
    </div>
  )
}

type Attribute = {
  key: string,
  title: string,
  info: { 
    [key: string]: string,
    true: string,
    undefined: string,
    LESS_THAN_FIVE: string,
    OVER_TEN: string
  },
  icon: {
    [key: string]: string,
    true: string,
    undefined: string,
    LESS_THAN_FIVE: string,
    OVER_TEN: string
  },
  symbol: {
    [key: string]: string,
    true: string,
    undefined: string,
    LESS_THAN_FIVE: string,
    OVER_TEN: string
  }
}

type AccessibilityLayoutProps = {
  type: string
  item: Item | undefined
  attribute: Attribute[],
  accessibility: BuildingAccessibility | PlaceAccessibility | undefined
}

function AccessibilityLayout({type, item, accessibility, attribute}: AccessibilityLayoutProps) {
  const [open, setOpen] = React.useState(false);
  const setImgSrc = (type: string) => {
    const uri = type === "건물" ? "building" : "place"
    return  `./assets/svg/ic_${uri}.svg`
  }
  const reulReturner = (label: string | undefined) => {
    if (label) {
      const strGA = 44032; //가
      const strHI = 55203; //힣

      const lastStrCode = label.charCodeAt(label.length-1);
      let prop = true
      let msg;

      if(lastStrCode < strGA || lastStrCode > strHI) return false

      if (( lastStrCode - strGA ) % 28 === 0) prop = false

      msg = prop ? '을' : '를'

      return msg;
    }
  }
  return (
    <>
      <AccessibilityInfo>
        <section className="accessibility__header">
          <img src={setImgSrc(type)} alt="type" />
          <div>
            <p className="accessibility__title"><b>{item?.place.name}</b> {type} 정보</p>
            {accessibility && 
              <p className="accessibility__description">{type} 정복자
                {
                  accessibility?.registeredUserName &&
                  <span className="accessibility__user">{accessibility?.registeredUserName?.value}</span>
                }
                {
                  !accessibility?.registeredUserName &&
                  <span className="accessibility__user" style={{color: '#6A6A73'}}>익명 비밀요원</span>
                }
              </p>
            }
            {!accessibility &&
              <p className="accessibility__not_info">등록된 정보가 없어요</p>
            }
          </div>
        </section>
        {accessibility && <section className="accessibility__info">
          {attribute?.map((att, key) => (
            <section key={key} className="accessibility__form">
              <>
                <div className="title">
                  <img src={att.icon[accessibility[att.key]]} alt="icon" />
                  <div>
                    <p className="att__title">{att.title}</p>
                    { att.icon[accessibility[att.key]] !== './assets/svg/ic_x.svg' &&
                      <p className="att__info">{att.info[accessibility[att.key]]}</p>
                    }
                    { att.icon[accessibility[att.key]] === './assets/svg/ic_x.svg' &&
                      <p className="att__info" style={{color: "#DB0B24"}}>{att.info[accessibility[att.key]]}</p>
                    }
                  </div>
                </div>
                <SymbolWrapper status={att.icon[accessibility[att.key]]}>
                  <img src={att.symbol[accessibility[att.key]]} alt="symbol" />
                </SymbolWrapper>
              </>
            </section>)
          )}
        </section>}
        {!accessibility &&
          <section className="accessibility__not_register">
            <p>{type}의 정보를 등록하고</p>
            <p><b>{item?.place.name}</b>{reulReturner(item?.place.name)} 정복해 보세요 😆</p>
            <button className="register-btn not" style={{marginTop: '10px'}} onClick={() => setOpen(true)}>정보 등록</button>
          </section>
        }
      </AccessibilityInfo>
      {item &&
      <>
        <RegisterModal
          open={open}
          setOpen={setOpen}
          item={item}
          type={type}
        />
        </>
      }
    </>
  )
}