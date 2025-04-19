export interface User {
  id?: string;
  memberID: string;
  name: string;
  email: string;
  joinDate: string;
  phoneNumber: string;
  role: 'admin' | 'member';
}