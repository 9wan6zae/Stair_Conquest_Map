import { BuildingAccessibility_StairInfo } from "./Model";

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
  placeId: string;
  isFirstFloor: boolean;
  hasStair: boolean;
  isWheelchairAccessible: boolean;
}

export interface RegisterAccessibilityParams_RegisterBuildingAccessibilityParams {
  buildingId: string;
  hasElevator: boolean;
  hasObstacleToElevator: boolean;
  stairInfo: BuildingAccessibility_StairInfo;
}