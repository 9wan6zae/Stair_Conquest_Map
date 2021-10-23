import { Place, Building, StringValue, Location, Int32Value } from "./Model";

export interface SearchPlacesParams {
  searchText: string;
  /** 현재 위치. */
  currentLocation: Location | undefined;
  distanceMetersLimit: number;
  /** "전체"면 null. */
  siGunGuId: StringValue | undefined;
  /** "전체"면 null. */
  eupMyeonDongId: StringValue | undefined;
}

export interface SearchPlacesResult_Item {
  place: Place;
  building: Building;
  hasBuildingAccessibility: boolean;
  hasPlaceAccessibility: boolean;
  /** current_location이 올라왔을 경우에만 non-null. */
  distanceMeters: Int32Value | undefined;
}

export interface SearchPlacesResult {
  items: SearchPlacesResult_Item[];
}