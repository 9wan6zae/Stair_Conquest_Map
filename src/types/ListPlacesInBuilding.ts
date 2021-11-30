import { SearchPlacesResult_Item } from "./SearchPlaces";

export interface ListPlacesInBuildingParams {
  buildingId: string;
}

export interface ListPlacesInBuildingResult {
  items: SearchPlacesResult_Item[];
}