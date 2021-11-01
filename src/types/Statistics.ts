import { VillageRankingEntry, User } from "./Model";

export interface GetVillageStatisticsParams {
  villageId: string;
}

export interface GetVillageStatisticsResult {
  villageRankingEntry: VillageRankingEntry | undefined;
  /** 건물 접근성 정보 수. */
  buildingAccessibilityCount: number;
  /** 총 건물 수. */
  totalBuildingCount: number;
  /** 장소 접근성 정보 수. */
  placeAccessibilityCount: number;
  /** 총 장소 수. */
  totalPlaceCount: number;
  /** n명과 함께 정복 중! */
  registeredUserCount: number;
  /** OO동 건물 정복왕 */
  eupMyeonDongName: string;
  /** 정복왕 정보 */
  mostRegisteredUser: User | undefined;
  /** 다음 색칠까지 건물 n개 남았어요! */
  nextColoringRemainingCount: number;
}