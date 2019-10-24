import { UserStatus } from './userStatus';
import { Department } from './department';
import { Photo } from './photo';

export interface User {
  id: number;
  userName: string;
  employeeNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  title: string;
  lastEvaluationFile: string;
  department: Department;
  userStatus: UserStatus;
  recruitmentDate: Date;
  lastActive: Date;
  created: Date;
  photoUrl: string;
  photos?: Photo[];
  roles?: string[];
}
