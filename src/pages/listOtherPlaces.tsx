import * as React from 'react';

export default function ListOtherPlaces({location}: {location: any}) {
  React.useEffect(() => {
    const buildingId = location.state.buildingId
    console.log(buildingId)
  }, [location.state.buildingId])
  return (
    <></>
  )
}