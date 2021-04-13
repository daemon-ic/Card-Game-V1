import { WNRS1Data } from "./WNRS1Data";
import { WNRS2Data } from "./WNRS2Data";
import { WNRS3Data } from "./WNRS3Data";
import { WNRSMasterData } from "./WNRSMasterData";

export const GamesData = [
  {
    name: "We're Not Really Strangers - Complete",
    questions: WNRSMasterData,
  },
  {
    name: "We're Not Really Strangers LVL 1 - Perception",
    questions: WNRS1Data,
  },
  {
    name: "We're Not Really Strangers LVL 2 - Connection",
    questions: WNRS2Data,
  },
  {
    name: "We're Not Really Strangers LVL 3 - Reflection",
    questions: WNRS3Data,
  },
];
