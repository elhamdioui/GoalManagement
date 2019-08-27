import { Photo } from './photo';

export interface User {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  title: string;
  department: string,
  lastActive: Date;
  created: Date;
  photoUrl: string;
  photos?: Photo[];
  roles?: string[];
}
