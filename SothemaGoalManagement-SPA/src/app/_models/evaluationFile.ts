import { BehavioralSkill } from './behavioralSkill';
import { Strategy } from "./strategy";

export interface EvaluationFile {
  id: number;
  title: string;
  year: number;
  strategy: Strategy;
  behavioralSkills: BehavioralSkill[];
  createdByName: string;
  createdById: number;
  status: string;
  created: Date;
}
