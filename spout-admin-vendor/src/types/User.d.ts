export interface User {
  id: string;
  role: Role;
  vendor: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  countryCode: string;
  avatar: string;
  whatappId: string;
  subjectId: string;
  username: string;
  position: string;
  teams: Team[];
}
