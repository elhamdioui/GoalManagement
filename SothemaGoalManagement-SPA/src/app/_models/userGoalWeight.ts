import { Evaluator } from "./evaluator";
import { Goal } from "./goal";

export interface UserGoalWeight {
  evaluatee: Evaluator;
  cascadededGoal: Goal,
  selected: boolean;
  parentGoalId: number;
  axisInstanceTitle: string;
}
