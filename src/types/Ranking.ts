import { Village } from "./Model"; 

export interface VillageRankingEntry {
  village: Village | undefined;
  /** 계단정복률 순위. */
  progressRank: number;
  /** 계단정복률. */
  progressPercentage: string;
}