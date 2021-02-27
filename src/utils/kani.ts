import { number } from 'prop-types';

const KANI_ZYUUNIKAI = {
  DAITOKU: 12,
  SYOTOKU: 11,
  DAIZIN: 10,
  SYOZIN: 9,
  DAIREI: 8,
  SYOREI: 7,
  DAISHIN: 6,
  SHOSIN: 5,
  DAIGI: 4,
  SYOUGI: 3,
  DAICHI: 2,
  SHOUCHI: 1,
} as const;

type KANI_ZYUUNIKAI = typeof KANI_ZYUUNIKAI[keyof typeof KANI_ZYUUNIKAI];

export const numToKANI = (n: number): KANI_ZYUUNIKAI => {
  switch (n) {
    case 1:
      return KANI_ZYUUNIKAI.SHOUCHI;
    case 2:
      return KANI_ZYUUNIKAI.DAICHI;
    case 3:
      return KANI_ZYUUNIKAI.SYOUGI;
    case 4:
      return KANI_ZYUUNIKAI.DAIGI;
    case 5:
      return KANI_ZYUUNIKAI.SHOSIN;
    case 6:
      return KANI_ZYUUNIKAI.DAISHIN;
    case 7:
      return KANI_ZYUUNIKAI.SYOREI;
    case 8:
      return KANI_ZYUUNIKAI.DAIREI;
    case 9:
      return KANI_ZYUUNIKAI.SYOZIN;
    case 10:
      return KANI_ZYUUNIKAI.DAIZIN;
    case 11:
      return KANI_ZYUUNIKAI.SYOTOKU;
    case 12:
      return KANI_ZYUUNIKAI.DAITOKU;
    default:
      return KANI_ZYUUNIKAI.DAITOKU;
  }
};

export const getKANIString = (kani: KANI_ZYUUNIKAI): string => {
  switch (kani) {
    case 1:
      return '小智';
    case 2:
      return '大智';
    case 3:
      return '小義';
    case 4:
      return '大義';
    case 5:
      return '小信';
    case 6:
      return '大信';
    case 7:
      return '小礼';
    case 8:
      return '大礼';
    case 9:
      return '小仁';
    case 10:
      return '大仁';
    case 11:
      return '小徳';
    case 12:
      return '大徳';
    default:
      return '神';
  }
};

export const getKANIByExp = (exp: number): KANI_ZYUUNIKAI => {
  if (exp < getKANINextRank(KANI_ZYUUNIKAI.SHOUCHI))
    return KANI_ZYUUNIKAI.SHOUCHI;
  if (exp < getKANINextRank(KANI_ZYUUNIKAI.DAICHI))
    return KANI_ZYUUNIKAI.DAICHI;
  if (exp < getKANINextRank(KANI_ZYUUNIKAI.SYOUGI))
    return KANI_ZYUUNIKAI.SYOUGI;
  if (exp < getKANINextRank(KANI_ZYUUNIKAI.DAIGI)) return KANI_ZYUUNIKAI.DAIGI;
  if (exp < getKANINextRank(KANI_ZYUUNIKAI.SHOSIN))
    return KANI_ZYUUNIKAI.SHOSIN;
  if (exp < getKANINextRank(KANI_ZYUUNIKAI.DAISHIN))
    return KANI_ZYUUNIKAI.DAISHIN;
  if (exp < getKANINextRank(KANI_ZYUUNIKAI.SYOREI))
    return KANI_ZYUUNIKAI.SYOREI;
  if (exp < getKANINextRank(KANI_ZYUUNIKAI.DAIREI))
    return KANI_ZYUUNIKAI.DAIREI;
  if (exp < getKANINextRank(KANI_ZYUUNIKAI.SYOZIN))
    return KANI_ZYUUNIKAI.SYOZIN;
  if (exp < getKANINextRank(KANI_ZYUUNIKAI.DAIZIN))
    return KANI_ZYUUNIKAI.DAIZIN;
  if (exp < getKANINextRank(KANI_ZYUUNIKAI.SYOTOKU))
    return KANI_ZYUUNIKAI.SYOTOKU;
  if (exp < getKANINextRank(KANI_ZYUUNIKAI.DAITOKU))
    return KANI_ZYUUNIKAI.DAITOKU;
  return KANI_ZYUUNIKAI.DAITOKU;
};

export const getKANINextRank = (kani: KANI_ZYUUNIKAI): number => {
  switch (kani) {
    case 1:
      return 2500;
    case 2:
      return 5000;
    case 3:
      return 8800;
    case 4:
      return 13000;
    case 5:
      return 33000;
    case 6:
      return 89000;
    case 7:
      return 120000;
    case 8:
      return 180000;
    case 9:
      return 300000;
    case 10:
      return 700000;
    case 11:
      return 999999;
    case 12:
      return 9999999;
    default:
      return 99999999;
  }
};

export class ProgressBarProgress {
  beforePercentage: number;
  afterPercentage: number;
  beforeRank: KANI_ZYUUNIKAI;
  afterRank: KANI_ZYUUNIKAI;

  constructor(
    beforePercentage: number,
    afterPercentage: number,
    beforeRank: KANI_ZYUUNIKAI,
    afterRank: KANI_ZYUUNIKAI,
  ) {
    this.beforePercentage = beforePercentage;
    this.afterPercentage = afterPercentage;
    this.beforeRank = beforeRank;
    this.afterRank = afterRank;
  }
}

/*
(今のレート, 増分) => {
beforePercentage: [0~100], // プログレス移動前のバーの割合
afterPercentage: [0~100], // プログレス移動後のバーの割合
beforeRank: Rank, // プログレス移動前のランク
afterRank: Rank // プログレス移動後のランク
}
 */
export const initializeProgressBar = (
  exp: number,
  incremental: number,
): ProgressBarProgress => {
  const rank = getKANIByExp(exp);
  const nowKANIExpMin = rank == 1 ? 0 : getKANINextRank(numToKANI(rank - 1));
  const nextKANIExpMin = getKANINextRank(rank);
  const beforePercentage =
    ((exp - nowKANIExpMin) * 100) / (nextKANIExpMin - nowKANIExpMin);
  let afterPercentage =
    ((exp + incremental - nowKANIExpMin) * 100) /
    (nextKANIExpMin - nowKANIExpMin);

  if (afterPercentage >= 100) {
    const nextNextKANIExpMin = getKANINextRank(numToKANI(rank + 1));
    afterPercentage =
      ((exp + incremental - nextKANIExpMin) * 100) /
      (nextNextKANIExpMin - nextKANIExpMin);
  }
  return new ProgressBarProgress(
    beforePercentage,
    afterPercentage,
    rank,
    getKANIByExp(exp + incremental),
  );
};

// progressbar = 100 %

// (現在の経験値-今の冠位のmin経験値)/(次の冠位のmin経験値-今の冠位のmin経験値)
// ⇛ (現在の経験値+今得た経験値-今の冠位のmin経験値)/(次の冠位のmin経験値-今の冠位のmin経験値)
// [20] => 100 => 0 => [30], level up

/*

interface Rank {
  to_string()
  rank: number// 偉いのが12, 1~12
  nextExp: number// 1から次ランクになるための最低経験値
}

beforeRank.nextExp => beforeRankの次のランクになるための経験値

(難易度、解いた問題) => {
  earnExp: number // 獲得経験値
}

(今のレート, 増分) => {
beforePercentage: [0~100], // プログレス移動前のバーの割合
afterPercentage: [0~100], // プログレス移動後のバーの割合
beforeRank: Rank, // プログレス移動前のランク
afterRank: Rank // プログレス移動後のランク
}


*/

// levelup: true, before:20, after:30
// levelup: false, before:20, after:30
// 20 => 30
