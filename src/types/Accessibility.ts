import { StringValue, StairInfo, BuildingAccessibility, PlaceAccessibility, PlaceAccessibilityComment, BuildingAccessibilityComment } from "./Model";

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
  comment: StringValue | undefined;
}

export interface RegisterAccessibilityParams_RegisterBuildingAccessibilityParams {
  [key: string]: any
  buildingId: string;
  entranceStairInfo: StairInfo | undefined;
  hasSlope: boolean | undefined;
  hasElevator: boolean | undefined;
  elevatorStairInfo: StairInfo | undefined;
  comment: StringValue | undefined;
}

export interface RegisterAccessibilityResult {
  buildingAccessibility: BuildingAccessibility | undefined;
  buildingAccessibilityComments: BuildingAccessibilityComment[];
  placeAccessibility: PlaceAccessibility | undefined;
  placeAccessibilityComments: PlaceAccessibilityComment[];
  /** n번째 정복자. */
  registeredUserOrder: number;
}

export interface GetAccessibilityParams {
  placeId: string;
}

export interface GetAccessibilityResult {
  [key: string]: any
  /** 정보가 아직 채워지지 않았으면 null */
  buildingAccessibility: BuildingAccessibility | undefined;
  buildingAccessibilityComments: BuildingAccessibilityComment[];
  /** 정보가 아직 채워지지 않았으면 null */
  placeAccessibility: PlaceAccessibility | undefined;
  placeAccessibilityComments: PlaceAccessibilityComment[];
  /** '이 건물의 다른 점포 등록하기'를 보여줄지 여부. */
  hasOtherPlacesToRegisterInBuilding: boolean;
}