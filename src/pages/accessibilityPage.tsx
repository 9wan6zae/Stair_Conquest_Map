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
  padding: 36px 20px 53px 20px;
  background: #fff;

  .accessibility__title {
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 100%;
  }

  .accessibility__description {
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 100%;
    color: #B5B5C0
  }

  section.accessibility__header {
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

  const buildingAttributes: any[] = [
    {
      key: "hasElevator",
      title: "엘리베이터",
      info: { 
        true: "있음",
        undefined: "없음"
      },
      icon: {
        true: './assets/svg/ic_check.svg',
        undefined: './assets/svg/ic_x.svg'
      },
      symbol: {
        true: './assets/svg/accessibility/ic_elevator_true.svg',
        undefined: './assets/svg/accessibility/ic_elevator_false.svg',
      }
    },
    {
      key: "hasObstacleToElevator",
      title: "엘리베이터까지",
      info: { 
        true: "계단 있음",
        undefined: "계단 없음"
      },
      icon: {
        true: './assets/svg/ic_x.svg',
        undefined: './assets/svg/ic_check.svg'
      },
      symbol: {
        true: './assets/svg/accessibility/ic_stair_false.svg',
        undefined: './assets/svg/accessibility/ic_stair_true.svg',
      }
    },
    {
      key: "stairInfo",
      title: "건물 1층까지",
      info: { 
        undefined: "계단 없음",
        LESS_THAN_FIVE: "계단 5칸 미만",
        OVER_TEN: "계단 5칸 이상"
      },
      icon: {
        undefined: './assets/svg/ic_check.svg',
        LESS_THAN_FIVE: './assets/svg/ic_check.svg',
        OVER_TEN: './assets/svg/ic_x.svg'
      },
      symbol: {
        undefined: './assets/svg/accessibility/ic_building_true.svg',
        LESS_THAN_FIVE: './assets/svg/accessibility/ic_building_true.svg',
        OVER_TEN: './assets/svg/accessibility/ic_building_false.svg',
      }
    }
  ]

  const placeAttributes: any[] = [
    {
      key: "isFirstFloor",
      title: "장소가",
      info: { 
        true: "1층에 있음",
        undefined: "1층이 아님"
      },
      icon: {
        true: './assets/svg/ic_check.svg',
        undefined: './assets/svg/ic_x.svg'
      },
      symbol: {
        true: './assets/svg/accessibility/ic_elevator_true.svg',
        undefined: './assets/svg/accessibility/ic_elevator_false.svg',
      }
    },
    {
      key: "hasStair",
      title: "입구로 들어가는 길에",
      info: { 
        true: "계단 있음",
        undefined: "계단 없음"
      },
      icon: {
        true: './assets/svg/ic_x.svg',
        undefined: './assets/svg/ic_check.svg'
      },
      symbol: {
        true: './assets/svg/accessibility/ic_stair_false.svg',
        undefined: './assets/svg/accessibility/ic_stair_true.svg',
      }
    },
    {
      key: "isWheelchairAccessible",
      title: "휠체어를 이용할 수",
      info: { 
        true: '있음',
        undefined: '없음'
      },
      icon: {
        true: './assets/svg/ic_check.svg',
        undefined: './assets/svg/ic_x.svg'
      },
      symbol: {
        true: './assets/svg/accessibility/ic_building_true.svg',
        undefined: './assets/svg/accessibility/ic_building_false.svg',
      }
    }
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
  return (
    <AccessibilityInfo>
        <section className="accessibility__header">
          <img src="./assets/svg/ic_place.svg" alt="building" />
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
        <button onClick={() =>  setOpen(!open)}>test</button>
        {item && <RegisterModal
          open={open}
          setOpen={setOpen}
          item={item}
        />}
        <section className="accessibility__info">
          {accessibility && attribute?.map((att, key) => (
            <section key={key} className="accessibility__form">
              {accessibility && (
                <>
                  <div className="title">
                    <img src={att.icon[accessibility[att.key]]} alt="icon" />
                    <div>
                      <p>{att.title}</p>
                      <p>{att.info[accessibility[att.key]]}</p>
                    </div>
                  </div>
                  <SymbolWrapper status={att.icon[accessibility[att.key]]}>
                    <img src={att.symbol[accessibility[att.key]]} alt="symbol" />
                  </SymbolWrapper>
                </>
              )}
            </section>
          ))}
          {!accessibility &&
            <section className="accessibility__form">
              <p>장소의 {type}를 등록하고 정복해 보세요</p>
            </section>
          }
        </section>
      </AccessibilityInfo>
  )
}