export interface GoalWithChildren {
  id: number;
  description: string;
  weight: number;
  axisInstanceTitle: string;
  goalTypeName: string;
  projectName: string;
  ownerPhotoUrl: string;
  ownerFullName: string
  children: GoalWithChildren[];
}
