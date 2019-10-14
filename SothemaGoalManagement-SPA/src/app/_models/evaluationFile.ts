import { BehavioralSkill } from './behavioralSkill';
import { Strategy } from "./strategy";
import { Axis } from './axis';

export interface EvaluationFile {
  id: number;
  title: string;
  year: number;
  strategy: Strategy;
  behavioralSkills: BehavioralSkill[];
  axisList: Axis[];
  ownerName: string;
  ownerId: number;
  status: string;
  created: Date;
  sealed?: boolean;
  sealedDate?: Date;
}
