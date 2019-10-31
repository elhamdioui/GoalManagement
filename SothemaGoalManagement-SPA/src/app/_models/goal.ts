import { GoalType } from "./goalType";
import { AxisInstance } from "./axisInstance";

export interface Goal {
  id: number;
  description: string;
  weight: number;
  created: Date;
  goalType: GoalType;
  axisInstance: AxisInstance;
  status: string;
}
