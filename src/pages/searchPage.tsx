import * as React from 'react';
import MainHeader from '../components/mainHeader';
import InputBox from '../components/inputBox';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as searchAPI from '../api/search';
import RegisterModal from '../components/registerModal';
import { Item, SearchPlacesParams, SearchPlacesResult } from '../types/SearchPlaces';
import { Location } from '../types/Model';
import styled from "styled-components"

import { useDispatch } from 'react-redux';
import { set_item } from '../modules/item';

const ItemBox = styled.section`
  width: 100%;
  padding: 0 20px;
  margin-bottom: 38px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  section.info {
    margin-right: 10px;
    max-width: 60%;
  }
`

export default function SearchPage() {
  const dispatch = useDispatch();
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

  const [selectItem, setSelectItem] = useState<Item>(
    {
      place: {
        id: '',
        name: '',
        address: ''
      },
      building: {
        id: '',
        address: ''
      },
      hasBuildingAccessibility: false,
      hasPlaceAccessibility: false
    },
  );

  const {searchText} = params

  const [searchPlacesResult, setSearchPlacesResult] = useState<SearchPlacesResult>(
    {
      items: [
        {
          place: {
            id: 'test',
            name: '채선당 행복가마솥밥 롯데마트점',
            address: '분당구 황새울로 340'
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
            id: 'ttdsdft',
            address: 'dsfd'
          },
          hasBuildingAccessibility: true,
          hasPlaceAccessibility: false
        },
        {
          place: {
            id: 'test4',
            name: '가나다',
            address: 'dsdsf'
          },
          building: {
            id: 'ttdsdfsst',
            address: 'dsfd'
          },
          hasBuildingAccessibility: false,
          hasPlaceAccessibility: true
        },
        {
          place: {
            id: 'test3',
            name: '가나dddd다',
            address: 'dssdfsdfdsf'
          },
          building: {
            id: 'ttfsffft',
            address: 'dsfdsfsdfdsfd'
          },
          hasBuildingAccessibility: true,
          hasPlaceAccessibility: true
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
    dispatch(set_item(item));
  }

  const clearInfo = (name: string) => {
    setParams({...params, [name]: ''})
  }

  const NotRegister = (item: Item): boolean => {
    return !item.hasBuildingAccessibility && !item.hasPlaceAccessibility
  }

  const halfRegister = (item: Item): boolean => {
    return (item.hasBuildingAccessibility && !item.hasPlaceAccessibility) || (!item.hasBuildingAccessibility && item.hasPlaceAccessibility)
  }

  const fullRegister = (item: Item): boolean => {
    return item.hasBuildingAccessibility && item.hasPlaceAccessibility
  }

  return (
    <>
      <MainHeader>
        <div className="input__search-page">
          <section style={{width: '86%'}}>
            <InputBox name="searchText" value={searchText || ''} onChange={onChange} clearInfo={clearInfo} type="text" placeholder="장소, 주소 검색" />
          </section>
          <span style={{lineHeight: '60px', color: '#3491FF', fontWeight: 500}} onClick={() => searchPlaces()}>검색</span>
        </div>
      </MainHeader>
      {searchPlacesResult.items?.length > 0 && (
        searchPlacesResult.items.map(item => (
          <ItemBox key={item.place.id}>
            <section className="info">
              <p className="search-list__title">{item.place.name}</p>
              <p className="search-list__address">{item.place.address}</p>
              { NotRegister(item) && (
                <p className="search-list__info">등록된 정보가 없어요</p>
              )}
              { halfRegister(item) && (
                <>
                  <span className="search-list__info" style={{color: '#b5b5c0'}}>정보 등록률</span>
                  <span className="search-list__info" style={{marginLeft: '6px'}}>50%</span>
                </>
              )}
              { fullRegister(item) && (
                <>
                  <span className="search-list__info" style={{color: '#b5b5c0'}}>정보 등록률</span>
                  <span className="search-list__info" style={{marginLeft: '6px', color: '#6A6A73'}}>100%</span>
                </>
              )}
            </section>
            <section className="btn">
              { NotRegister(item) && (
                <button className="register-btn not" onClick={() => openModal(item)}>정보 등록</button>
              )}
              { halfRegister(item) && (
                <button className="register-btn half" onClick={() => openModal(item)}>정보 등록</button>
              )}
              { fullRegister(item) && (
                <Link to="/accessibility"><button className="register-btn full" onClick={() => openModal(item)}>정보 조회</button></Link>
              )}
            </section>
          </ItemBox>
        ))
      )}
      <RegisterModal open={open} item={selectItem} setOpen={setOpen}></RegisterModal>
    </>
  )
}