import * as React from 'react';
import * as ListOtherPlacesAPI from '../api/listOtherPlaces'
import MainHeader from '../components/mainHeader';
import { SearchPlacesResult, SearchPlacesResult_Item } from '../types/SearchPlaces';
import { ListPlaces } from './searchPage';

import { useDispatch } from 'react-redux';
import { set_item } from '../modules/item';

export default function ListOtherPlaces({location}: {location: any}) {
  const dispatch = useDispatch();
  const [places, setPlaces] = React.useState<SearchPlacesResult>({items: []})
  React.useEffect(() => {
    const buildingId = location.state.buildingId
    ListOtherPlacesAPI.listPlacesInBuilding({buildingId}).then((res) => setPlaces(res.data))
  }, [location.state.buildingId])

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
      <MainHeader />
      <section style={{marginTop: '20px'}}>
        <ListPlaces places={places} selectItem={selectItem} setItem={setItem}  />
      </section>
    </>
  )
}