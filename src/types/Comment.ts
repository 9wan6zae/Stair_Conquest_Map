import { BuildingAccessibilityComment, PlaceAccessibilityComment } from "./Model";

export interface RegisterBuildingAccessibilityCommentParams {
  buildingId: string;
  comment: string;
}

export interface RegisterBuildingAccessibilityCommentResult {
  comments: BuildingAccessibilityComment[];
}

export interface RegisterPlaceAccessibilityCommentParams {
  placeId: string;
  comment: string;
}

export interface RegisterPlaceAccessibilityCommentResult {
  comments: PlaceAccessibilityComment[];
}