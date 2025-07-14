// Represents an assignment of a lecturer to a specific course and semester
export interface LecturerCourseAssignment {
  id: number;
  semester: number;
  lecturer: any;
  course: any;
}

// Represents a course with its basic details and associated positions
export interface Course {
  id: number;
  courseCode: string;
  courseName: string;
  semester: number;
  positions: any;
}

// Represents a user within the system, such as admin, lecturer, or candidate
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isBlocked : boolean;
}

// Represents a tutor application record returned by the ranking API
export interface TutorApplication {
  applicationID: number;
  firstName: string;
  lastName: string;
  email: string;
  courseCode: string;
  course: string;
}