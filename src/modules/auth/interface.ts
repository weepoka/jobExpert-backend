export interface IUser {
  _id?: string;
  uid?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: "Admin" | "Student" | "Teacher";
  hasEmailVerified?: boolean;
  hasPhoneVerified?: boolean;
  avatar?: string;
}
