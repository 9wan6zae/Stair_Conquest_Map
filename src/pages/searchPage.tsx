import * as React from 'react';
import MainHeader from '../components/mainHeader';
import InputBox from '../components/inputBox';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as searchAPI from '../api/search';
import RegisterModal from '../components/registerModal';
import { SearchPlacesResult_Item, SearchPlacesParams, SearchPlacesResult } from '../types/SearchPlaces';
import styled from "styled-components"

import { useSelector } from 'react-redux';
import { RootState } from '../modules';
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

export default function SearchPage({location}: {location: any}) {
  const login_success = useSelector((state: RootState) => state.login.loginSuccess);
  const dispatch = useDispatch();
  const [text, setText] = useState('')
  const params: SearchPlacesParams = {
    searchText: '',
    currentLocation: undefined,
    distanceMetersLimit: 0,
    siGunGuId: undefined,
    eupMyeonDongId: undefined
  }

  const [selectItem, setSelectItem] = useState<SearchPlacesResult_Item>(
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
      hasPlaceAccessibility: false,
      distanceMeters: undefined
    },
  );

  const [searchPlacesResult, setSearchPlacesResult] = useState<SearchPlacesResult>(
    {items: []}
  );
  const [open, setOpen] = useState(false);

  const onChange = (e: any) => {
    const {value} = e.target
    setText(value)
  }

  const searchPlaces = async (searchText: string, lat: number, lng: number) => {
    if (params) {
      params.searchText = decodeURI(searchText)
      params.currentLocation = {
        lat: +lat,
        lng: +lng
      }
      const res = await searchAPI.searchPlaces(params)
      setSearchPlacesResult(res.data)
    }
  }
  useEffect(() => {
    let lat = '0'
    let lng = '0'
    const session_lat = window.sessionStorage.getItem('lat')
    const session_lng = window.sessionStorage.getItem('lng')
    if (session_lat && session_lng) {
      lat = session_lat
      lng = session_lng
    }
    if ((lat === '0' && lng === '0')) {
      navigator.geolocation.getCurrentPosition(pos => {
        lat = pos.coords.latitude + ""
        lng = pos.coords.longitude + ""
        window.sessionStorage.setItem('lat', lat)
        window.sessionStorage.setItem('lng', lng)
      })
    }
    if(location.search.split('=')[1] && lat && lng) {
      searchPlaces(location.search.split('=')[1], +lat, +lng)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setItem = (item: SearchPlacesResult_Item) => {
    setSelectItem(item)
    dispatch(set_item(item));
  }

  const clearInfo = () => {
    setText('')
  }

  const NotRegister = (item: SearchPlacesResult_Item): boolean => {
    return !item.hasBuildingAccessibility && !item.hasPlaceAccessibility
  }

  const halfRegister = (item: SearchPlacesResult_Item): boolean => {
    return (item.hasBuildingAccessibility && !item.hasPlaceAccessibility) || (!item.hasBuildingAccessibility && item.hasPlaceAccessibility)
  }

  const fullRegister = (item: SearchPlacesResult_Item): boolean => {
    return item.hasBuildingAccessibility && item.hasPlaceAccessibility
  }

  const calcMeter = (meter: number | undefined) => {
    if (meter) {
      const modified_meter = meter > 1000 ? `${Math.round((meter/1000 + Number.EPSILON) * 100) / 100}km` : `${meter}m`
      return (
        <>
          <span className="search-list__distance">{modified_meter}</span>
          <span style={{width: '0px', minHeight: '12px', border: '1px solid #EAEAEF', margin: '-2px 8px', display: 'inline-block'}} />
        </>
      )
    }
  }

  const checkLogin = (item: SearchPlacesResult_Item) => {
    const notmember = window.sessionStorage.getItem('notmember')
    if (!(login_success || notmember)) {
      window.location.href = '/login'
    }
    else {
      setOpen(true)
      setItem(item)
    }
  }

  return (
    <>
      <MainHeader>
        <form>
          <div className="input__search-page">
            <section style={{width: '86%'}}>
                <InputBox name="searchText" value={text || ''} onChange={onChange} clearInfo={clearInfo} type="text" placeholder="장소, 주소 검색" /> 
            </section>
            <button style={{fontSize: 'inherit', background: 'none', border: 'none', outline: 'none', lineHeight: '60px', color: '#3491FF', fontWeight: 500}} type="submit">검색</button>
          </div>
        </form>
      </MainHeader>
      {searchPlacesResult.items?.length > 0 && (
        searchPlacesResult.items.map(item => (
          <ItemBox key={item.place.id}>
            <section className="info">
              <p className="search-list__title">{item.place.name}</p>
              {calcMeter(item.distanceMeters?.value)}
              <span className="search-list__address">{item.place.address}</span>
              { NotRegister(item) && (
                <p className="search-list__info">등록된 정보가 없어요</p>
              )}
              { halfRegister(item) && (
                <p className="search-list__info">
                {!item.hasBuildingAccessibility
                ? <span> 건물 </span>
                : <span>장소</span>}  
                정보 필요</p>
              )}
              { fullRegister(item) && (
                <p className="search-list__info" style={{color: '#b5b5c0'}}>정보 등록 완료</p>
              )}
            </section>
            <section className="btn">
              { NotRegister(item) && (
                <button className="register-btn not" onClick={() => checkLogin(item)}>정보 등록</button>
              )}
              { halfRegister(item) && (
                <Link to={{pathname: "/accessibility", state: {require: !item.hasBuildingAccessibility ? 'building' : 'place'}}}><button className="register-btn half" onClick={() => setItem(item)}>정보 등록</button></Link>
              )}
              { fullRegister(item) && (
                <Link to="/accessibility"><button className="register-btn full" onClick={() => setItem(item)}>정보 조회</button></Link>
              )}
            </section>
          </ItemBox>
        ))
      )}
      {!searchPlacesResult?.items && (
        <section style={{width: '100%', height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <img src="./assets/svg/ic_search.svg" alt="search" />
          <p style={{fontSize: '20px', color: '#B5B5C0', marginTop: '16px'}}>검색 결과가 없습니다.</p>
          <a target="_blank" rel="noreferrer" href="https://docs.google.com/forms/d/1LtDKXdULuXJMu19nTognnhWwCagsr4ek5w8yHkRgUXA/edit" className="link link-layout" style={{fontSize: '16px', marginTop: '24px'}}>
            <p>찾는 장소가 없으신가요?</p>
            <img src="./assets/svg/arr.svg" style={{marginLeft: '4px'}} alt="arr"/>
          </a>
        </section>
      )}
      <RegisterModal open={open} item={selectItem} setOpen={setOpen}></RegisterModal>
    </>
  )
}