import { StairInfo, BuildingAccessibility, PlaceAccessibility } from "./Model";

export interface RegisterAccessibilityParams {
  /** 최초 등록 시에만 올려준다. */
  buildingAccessibilityParams:
    | RegisterAccessibilityParams_RegisterBuildingAccessibilityParams
    | undefined;
  /** 항상 올려준다. */
  placeAccessibilityParams:
    | RegisterAccessibilityParams_RegisterPlaceAccessibilityParams
    | undefined;
}

export interface RegisterAccessibilityParams_RegisterPlaceAccessibilityParams {
  [key: string]: any
  placeId: string;
  isFirstFloor: boolean | undefined;
  stairInfo: StairInfo | undefined;
  hasSlope: boolean | undefined;
}

export interface RegisterAccessibilityParams_RegisterBuildingAccessibilityParams {
  [key: string]: any
  buildingId: string;
  entranceStairInfo: StairInfo | undefined;
  hasSlope: boolean | undefined;
  hasElevator: boolean | undefined;
  elevatorStairInfo: StairInfo | undefined;
}

export interface GetAccessibilityParams {
  placeId: string;
}

export interface GetAccessibilityResult {
  [key: string]: BuildingAccessibility | PlaceAccessibility | undefined
  /** 정보가 아직 채워지지 않았으면 null */
  buildingAccessibility: BuildingAccessibility | undefined;
  /** 정보가 아직 채워지지 않았으면 null */
  placeAccessibility: PlaceAccessibility | undefined;
}

export interface RegisterAccessibilityResult {
  buildingAccessibility: BuildingAccessibility | undefined;
  placeAccessibility: PlaceAccessibility | undefined;
  /** n번째 정복자. */
  registeredUserOrder: number;
}