import * as React from 'react';
import styled, {css} from 'styled-components';
import { Item } from '../types/SearchPlaces';
import * as accessibilityAPI from '../api/accessibility'

import { RegisterAccessibilityParams, RegisterAccessibilityParams_RegisterPlaceAccessibilityParams, RegisterAccessibilityParams_RegisterBuildingAccessibilityParams } from '../types/Accessibility'

interface BtnProps {
  active: boolean
}

const ModalBlock = styled.div`
  width: 100%;
  height: 96%;
  position: fixed;
  bottom: 0;
  border-radius: 20px 20px 0 0;
  z-index: 99999;
  background: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.16);
`

const ButtonGroup = styled.section`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  margin: 10 0;
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

  &&:last-child {
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
  const [page, setPage] = React.useState(1);
  const [place, setPlace] = React.useState<RegisterAccessibilityParams_RegisterPlaceAccessibilityParams>(
    {
      placeId: item.place.id,
      isFirstFloor: true,
      hasStair: true,
      isWheelchairAccessible: true
    }
  )
  const [building, setBuilding] = React.useState<RegisterAccessibilityParams_RegisterBuildingAccessibilityParams>(
    {
      buildingId: item.building.id,
      hasElevator: true,
      hasObstacleToElevator: true,
      stairInfo: 0
    }
  );

  const UpdateInfo = async () => {
    if (place && building) {
      const info: RegisterAccessibilityParams = {
        placeAccessibilityParams: undefined,
        buildingAccessibilityParams: undefined
      }
      info.placeAccessibilityParams = place
      info.buildingAccessibilityParams = building

      const res = await accessibilityAPI.register(info)
      console.log(res)
    }
  }

  return (
    <>
      <ModalBlock>
        <h3>{item.place.name}</h3>
        <button onClick={UpdateInfo}>test</button>
        {page === 1 && (
          <>
            <section>
              <p>이 건물 입구에 계단이 있나요?</p>
              <ButtonGroup>
                <CustomBtn onClick={() => setBuilding({...building, stairInfo: 1})} active={building?.stairInfo === 1}>5칸 이하</CustomBtn>
                <CustomBtn onClick={() => setBuilding({...building, stairInfo: 2})} active={building?.stairInfo === 2}>10칸 이상</CustomBtn>
                <CustomBtn onClick={() => setBuilding({...building, stairInfo: 0})} active={building?.stairInfo === 0}>없어요</CustomBtn>
              </ButtonGroup>
            </section>
            <section>
              <p>이 건물 엘리베이터가 있나요?</p>
              <ButtonGroup>
                <CustomBtn onClick={() => setBuilding({...building, hasElevator: true})} active={building?.hasElevator === true}>있어요</CustomBtn>
                <CustomBtn onClick={() => setBuilding({...building, hasElevator: false})} active={building?.hasElevator === false}>없어요</CustomBtn>
              </ButtonGroup>
            </section>
            <section>
              <p>엘리베이터까지 가는 길에 계단이 있나요?</p>
              <ButtonGroup>
              <CustomBtn onClick={() => setBuilding({...building, hasObstacleToElevator: true})} active={building?.hasObstacleToElevator === true}>있어요</CustomBtn>
                <CustomBtn onClick={() => setBuilding({...building, hasObstacleToElevator: false})} active={building?.hasObstacleToElevator === false}>없어요</CustomBtn>
              </ButtonGroup>
            </section>
            <button onClick={() => setPage(2)}>다음</button>
          </>
        )}
        {page === 2 && (
          <>
            <section>
              <p>1층에 있는 장소인가요?</p>
              <ButtonGroup>
                <CustomBtn onClick={() => setPlace({...place, isFirstFloor: true})} active={place?.isFirstFloor === true}>네, 1층이에요</CustomBtn>
                <CustomBtn onClick={() => setPlace({...place, isFirstFloor: false})} active={place?.isFirstFloor === false}>아니요</CustomBtn>
              </ButtonGroup>
            </section>
            <section>
              <p>입구로 들어가는 길에 계단이 있나요?</p>
              <ButtonGroup>
                <CustomBtn onClick={() => setPlace({...place, hasStair: true})} active={place?.hasStair === true}>있어요</CustomBtn>
                <CustomBtn onClick={() => setPlace({...place, hasStair: false})} active={place?.hasStair === false}>없어요</CustomBtn>
              </ButtonGroup>
            </section>
            <section>
              <p>엘리베이터까지 가는 길에 계단이 있나요?</p>
              <ButtonGroup>
              <CustomBtn onClick={() => setPlace({...place, isWheelchairAccessible: true})} active={place?.isWheelchairAccessible === true}>휠체어 true</CustomBtn>
                <CustomBtn onClick={() => setPlace({...place, isWheelchairAccessible: false})} active={place?.isWheelchairAccessible === false}>false</CustomBtn>
              </ButtonGroup>
            </section>
          </>
        )}
      </ModalBlock>
      <section onClick={() => setOpen(false)} style={{zIndex: 9999, position: 'fixed', width: '100%', height: '100%', top: 0, left: 0}} />
    </>
  )
}