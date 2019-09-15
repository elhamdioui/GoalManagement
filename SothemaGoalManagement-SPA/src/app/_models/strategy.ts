import { StatusTemplate } from './statusTemplate';

export interface Strategy {
  id: number;
  title: string;
  description: string;
  ownerName: string;
  ownerId: number;
  status: StatusTemplate;
  created: Date;
}
