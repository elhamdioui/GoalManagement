import { BehavioralSkill } from './behavioralSkill';
import { Strategy } from "./strategy";

export interface EvaluationFile {
  id: number;
  title: string;
  year: number;
  strategy: Strategy;
  behavioralSkills: BehavioralSkill[];
  ownerName: string;
  ownerId: number;
  status: string;
  created: Date;
  sealed?: boolean;
  sealedDate?: Date;
}
