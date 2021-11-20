import { SearchPlacesResult } from "./SearchPlaces";

export interface ListPlacesInBuildingParams {
  buildingId: string;
}

export interface ListPlacesInBuildingResult {
  items: SearchPlacesResult[];
}