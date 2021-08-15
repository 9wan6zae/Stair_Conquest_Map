export interface StringValue {
  value: string;
}

export interface OurMapError {
  message: string;
}

export interface Location {
  lng: number;
  lat: number;
}

export interface User {
  id: string;
  nickname: string;
  instagramId: StringValue | undefined;
}

export interface Place {
  id: string;
  /** 장소의 human-readable한 이름. */
  name: string;
  /** 장소의 human-readable한 주소. */
  address: string;
}

export interface Building {
  id: string;
  /** 건물의 human-readable한 주소. */
  address: string;
}

/** 장소의 접근성 정보. */
export interface PlaceAccessibility {
  id: string;
  isFirstFloor: boolean;
  hasStair: boolean;
  isWheelchairAccessible: boolean;
  placeId: string;
  /** 익명이면 null. */
  registeredUserName: StringValue | undefined;
}

/** 건물의 접근성 정보. */
export interface BuildingAccessibility {
  id: string;
  hasElevator: boolean;
  hasObstacleToElevator: boolean;
  stairInfo: BuildingAccessibility_StairInfo;
  buildingId: string;
  /** 익명이면 null. */
  registeredUserName: StringValue | undefined;
  /** 도움이 돼요를 표시했는지 여부. */
  isUpvoted: boolean;
  /** 도움이 돼요를 받은 총 횟수. 이 숫자에 따라 버튼 텍스트에 '도움이 돼요'나 '정확한 정보에요'를 사용한다. */
  totalUpvoteCount: number;
}

export enum BuildingAccessibility_StairInfo {
  NONE = 0,
  LESS_THAN_FIVE = 1,
  OVER_TEN = 2,
  UNRECOGNIZED = -1,
}

export interface Village {
  id: string;
  name: string;
  isFavoriteVillage: boolean;
}