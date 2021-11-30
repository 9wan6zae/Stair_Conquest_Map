import * as React from 'react';
import * as MyPageAPI from '../api/myPage'
import { SearchPlacesResult, SearchPlacesResult_Item } from '../types/SearchPlaces';
import { ListPlaces } from './searchPage';

import { useDispatch } from 'react-redux';
import { set_item } from '../modules/item';
import AppHeader from '../components/appHeader';

export default function ListOtherPlaces() {
  const dispatch = useDispatch();
  const [places, setPlaces] = React.useState<SearchPlacesResult>({items: []})
  React.useEffect(() => {
    MyPageAPI.listConqueredPlaces().then((res) => setPlaces(res.data))
  }, [])

  const [selectItem, setSelectItem] = React.useState<SearchPlacesResult_Item>(
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

  const setItem = (item: SearchPlacesResult_Item) => {
    setSelectItem(item)
    dispatch(set_item(item));
  }
  return (
    <>
      <AppHeader title="내가 정복한 계단" />
      <section style={{marginTop: '87px', paddingBottom: '10px'}}>
        <ListPlaces places={places} selectItem={selectItem} setItem={setItem}  />
      </section>
    </>
  )
}