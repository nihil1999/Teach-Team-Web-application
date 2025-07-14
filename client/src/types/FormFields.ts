// Defines the structure for tutor application form fields.
// Used for capturing and validating tutor application data.

import { User } from "./User";

export type FormFields = {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    course: string;
    position: string;
    availability: string;
    previousRole: string;
    skills: string;
    qualification: string;
    specialization: string;
};

export type Application = {
    userID: number;
    courseCode: string,
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    course: string;
    position: string;
    availability: string;
    previousRole: string;
    skills: string;
    qualification: string;
    specialization: string;
};

export interface TutorApplication {
  applicationID: number;
  courseCode: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  course: string;
  position: string;
  availability: string;
  previousRole: string;
  skills: string;
  qualification: string;
  specialization: string;
  submitted_at: string;
  user: User;
}

  