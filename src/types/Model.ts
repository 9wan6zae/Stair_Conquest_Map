export interface Timestamp {
  /** epoch millis */
  value: number;
}

export interface Int32Value {
  value: number;
}

export interface User {
  id: string;
  nickname: string;
  instagramId: StringValue | undefined;
}

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
  [key: string]: any
  id: string;
  isFirstFloor: boolean;
  stairInfo: StairInfo;
  hasSlope: boolean;
  placeId: string;
  /** 익명이면 null. */
  registeredUserName: StringValue | undefined;
}

/** 건물의 접근성 정보. */
export interface BuildingAccessibility {
  [key: string]: any
  id: string;
  entranceStairInfo: StairInfo;
  hasSlope: boolean;
  hasElevator: boolean;
  elevatorStairInfo: StairInfo;
  buildingId: string;
  /** 익명이면 null. */
  registeredUserName: StringValue | undefined;
  /** 도움이 돼요를 표시했는지 여부. */
  isUpvoted: boolean;
  /** 도움이 돼요를 받은 총 횟수. 이 숫자에 따라 버튼 텍스트에 '도움이 돼요'나 '정확한 정보에요'를 사용한다. */
  totalUpvoteCount: number;
}

export interface Village {
  id: string;
  name: string;
  isFavoriteVillage: boolean;
}

export interface VillageRankingEntry {
  village: Village | undefined;
  /** 계단정복률 순위. */
  progressRank: number;
  /** 계단정복률. */
  progressPercentage: string;
}

export interface SiGunGu {
  id: string;
  name: string;
}

export interface EupMyeonDong {
  id: string;
  name: string;
  siGunGuId: string;
}

export interface AchievementBadge {
  imageUrl: string;
}

export enum StairInfo {
  UNDEFINED = 0,
  NONE = 1,
  ONE = 2,
  TWO_TO_FIVE = 3,
  OVER_SIX = 4,
  UNRECOGNIZED = -1,
}

export interface PlaceAccessibilityComment {
  id: string;
  placeId: string;
  /** 익명이면 null. */
  user: User | undefined;
  comment: string;
  createdAt: Timestamp | undefined;
}

export interface BuildingAccessibilityComment {
  id: string;
  buildingId: string;
  /** 익명이면 null. */
  user: User | undefined;
  comment: string;
  createdAt: Timestamp | undefined;
}