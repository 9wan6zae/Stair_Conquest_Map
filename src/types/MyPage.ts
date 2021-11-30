import { Int32Value, StringValue, User, Village } from "./Model";

export interface GetMyPageViewDataResult_ConquerLevelInfo {
  /** 정복 레벨. 1, 2, 3, 4, Max 등과 같은 값이 들어갈 수 있다. */
  level: string;
  /** 정복 레벨 칭호. 예비 정복자, 새내기 정복자, 전설의 정복자 등과 같은 값이 들어갈 수 있다. */
  description: string;
}

export interface GetMyPageViewDataResult_PlaceAccessibilityCountDetailEntry {
  eupMyeonDongName: string;
  count: number;
}

export interface GetMyPageViewDataResult {
  user: User | undefined;
  favoriteVillages: Village[];
  /** 정복 레벨 정보. */
  conquerLevelInfo: GetMyPageViewDataResult_ConquerLevelInfo | undefined;
  /** 정복 순위. 순위가 없으면 채워지지 않고 내려간다. */
  conquerRank: Int32Value | undefined;
  /** 정복한 계단 수. */
  placeAccessibilityCount: number;
  placeAccessibilityCountDetailEntries: GetMyPageViewDataResult_PlaceAccessibilityCountDetailEntry[];
}

export interface UpdateUserInfoParams {
  /** 변경되지 않았어도 항상 올려준다. */
  nickname: string;
  /** 변경되지 않았어도 항상 올려준다. */
  instagramId: StringValue | undefined;
}

export interface UpdateUserInfoResult {
  user: User | undefined;
}