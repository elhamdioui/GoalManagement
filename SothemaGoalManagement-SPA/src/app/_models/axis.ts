import { AxisPole } from "./axisPole";

export interface Axis {
  id: number;
  strategyId: number;
  axis: string;
  created: Date;
  axisPoles: AxisPole[]
}
