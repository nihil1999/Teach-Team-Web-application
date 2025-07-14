// Defines the User type and a list of default users with roles.
// Used for authentication and role-based access control in the app.

import { Avatar } from "./Avatar";

export type User = {
    userId: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    avatar: Avatar;
    isBlocked: boolean;
  };

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  avatar_id: number | null;
}
  
export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: string;
  avatar_id: number;
}
