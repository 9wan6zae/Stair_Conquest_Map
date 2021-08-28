import * as React from 'react';
import * as accessibilityAPI from "../api/accessibility"
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import { GetAccessibilityResult } from '../types/Accessibility';
import MainHeader from '../components/mainHeader';
import styled, {css} from 'styled-components';

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
      <AccessibilityInfo>
        <section className="accessibility__header">
          <img src="./assets/svg/ic_building.svg" alt="building" />
          <div>
            <p className="accessibility__title">건물 정보</p>
            {accessibility?.buildingAccessibility?.registeredUserName && 
              <p className="accessibility__description">건물 정복자 <span className="accessibility__user">{accessibility?.buildingAccessibility?.registeredUserName?.value}</span> </p>
            }
            {!accessibility?.buildingAccessibility?.registeredUserName && 
              <p className="accessibility__not_info">등록된 정보가 없어요</p>
            }
          </div>
        </section>
        <section className="accessibility__info">
          {accessibility?.buildingAccessibility && buildingAttributes?.map((att, key) => (
            <section key={key} className="accessibility__form">
              {accessibility.buildingAccessibility && (
                <>
                  <div className="title">
                    <img src={att.icon[accessibility.buildingAccessibility[att.key]]} alt="icon" />
                    <div>
                      <p>{att.title}</p>
                      <p>{att.info[accessibility.buildingAccessibility[att.key]]}</p>
                    </div>
                  </div>
                  <SymbolWrapper status={att.icon[accessibility.buildingAccessibility[att.key]]}>
                    <img src={att.symbol[accessibility.buildingAccessibility[att.key]]} alt="symbol" />
                  </SymbolWrapper>
                </>
              )}
            </section>
          ))}
          {!accessibility?.buildingAccessibility &&
            <section className="accessibility__form">
              <p>건물의 정보를 등록하고 정복해 보세요</p>
            </section>
          }
        </section>
      </AccessibilityInfo>
      <AccessibilityInfo>
        <section className="accessibility__header">
          <img src="./assets/svg/ic_place.svg" alt="building" />
          <div>
            <p className="accessibility__title"><b>{item?.place.name}</b> 장소 정보</p>
            {accessibility?.placeAccessibility?.registeredUserName && 
              <p className="accessibility__description">장소 정복자 <span className="accessibility__user">{accessibility?.placeAccessibility?.registeredUserName?.value}</span> </p>
            }
            {!accessibility?.placeAccessibility?.registeredUserName && 
              <p className="accessibility__not_info">등록된 정보가 없어요</p>
            }
          </div>
        </section>
        <section className="accessibility__info">
          {accessibility?.placeAccessibility && placeAttributes?.map((att, key) => (
            <section key={key} className="accessibility__form">
              {accessibility.placeAccessibility && (
                <>
                  <div className="title">
                    <img src={att.icon[accessibility.placeAccessibility[att.key]]} alt="icon" />
                    <div>
                      <p>{att.title}</p>
                      <p>{att.info[accessibility.placeAccessibility[att.key]]}</p>
                    </div>
                  </div>
                  <SymbolWrapper status={att.icon[accessibility.placeAccessibility[att.key]]}>
                    <img src={att.symbol[accessibility.placeAccessibility[att.key]]} alt="symbol" />
                  </SymbolWrapper>
                </>
              )}
            </section>
          ))}
          {!accessibility?.placeAccessibility &&
            <section className="accessibility__form">
              <p>장소의 정보를 등록하고 정복해 보세요</p>
            </section>
          }
        </section>
      </AccessibilityInfo>
    </div>
  )
}