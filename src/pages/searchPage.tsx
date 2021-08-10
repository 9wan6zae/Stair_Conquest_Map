import * as React from 'react';
import MainHeader from '../components/mainHeader';
import { useState, useEffect } from 'react';
import * as searchAPI from '../api/search';
import RegisterModal from '../components/registerModal';
import { Item, SearchPlacesParams, SearchPlacesResult } from '../types/SearchPlaces';
import { Location } from '../types/Model';
import styled from "styled-components"

const ItemBox = styled.div`
  width: 100%;
  height: 56px;
  border: solid 2px black;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`

export default function SearchPage() {
  const [load, setLoad] = useState(true);
  const [params, setParams] = useState<SearchPlacesParams>(
    {
      searchText: '',
      currentLocation: {
        lat: 0,
        lng: 0
      },
      distanceMetersLimit: 0,
      siGunGuId: undefined,
      eupMyeonDongId: undefined
    }
  );

  const [selectItem, setSelectItem] = useState<Item>();

  const {searchText} = params

  const [searchPlacesResult, setSearchPlacesResult] = useState<SearchPlacesResult>(
    {
      items: [
        {
          place: {
            id: 'test',
            name: '목탄장',
            address: 'dsdsf'
          },
          building: {
            id: 'ttt',
            address: 'dsfd'
          },
          hasBuildingAccessibility: false,
          hasPlaceAccessibility: false
        },
        {
          place: {
            id: 'test2',
            name: '가나다',
            address: 'dsdsf'
          },
          building: {
            id: 'ttt',
            address: 'dsfd'
          },
          hasBuildingAccessibility: true,
          hasPlaceAccessibility: false
        },
      ]
    }
  );
  const [open, setOpen] = useState(false);

  const onChange = (e: any) => {
    const {value} = e.target
    setParams({...params, searchText: value})
  }

  const searchPlaces = async () => {
    if (params) {
      const res = await searchAPI.searchPlaces(params)
      console.log(res)
      setSearchPlacesResult(res.data)
    }
  }

  useEffect(() => {
    if (load) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords: Location = {lng: 0, lat: 0}
        coords.lat = pos.coords.latitude
        coords.lng = pos.coords.longitude
        setParams({...params, currentLocation: coords})
      })
    }
    return () => setLoad(false)
  }, [params, load])

  const openModal = (item: Item) => {
    setOpen(true)
    setSelectItem(item)
  }

  return (
    <>
      <MainHeader />
      <div style={{paddingTop: "56px"}}>
        <input type="text" name="searchText" value={searchText || ''} onChange={onChange} placeholder="장소, 주소 검색" />
        <button onClick={() => searchPlaces()}>검색</button>
      </div>
      {searchPlacesResult.items?.length > 0 && (
        searchPlacesResult.items.map(item => (
          <ItemBox key={item.place.id}>
            <section>
              <div>{item.place.name}</div>
              <div>{item.building.address}</div>
            </section>
            <section>
              {!item.hasBuildingAccessibility && !item.hasPlaceAccessibility && (
                <button onClick={() => openModal(item)}>정보 필수</button>
              )}
              {item.hasBuildingAccessibility && (
                <button onClick={() => openModal(item)}>정보 등록</button>
              )}
            </section>
          </ItemBox>
        ))
      )}
      {open && selectItem && (<RegisterModal item={selectItem} setOpen={setOpen}></RegisterModal>)}
    </>
  )
}