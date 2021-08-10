import { Place, Building, StringValue, Location } from "./Model";

export interface SearchPlacesResult {
  items: Item[];
}

export interface Item {
  place:    Place;
  building: Building;
  hasBuildingAccessibility: boolean;
  hasPlaceAccessibility: boolean;
}

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