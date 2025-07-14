// src/graphql/typeDefs.ts

// GraphQL schema definitions: types, queries, and mutations for the admin dashboard API
import { gql } from "graphql-tag";

export const typeDefs = gql`
  # Represents a system user such as admin, lecturer, or candidate
  type User {
    id: ID!            # unique identifier for the user
    role: String!      # user's role (e.g., 'admin', 'lecturer', 'candidate')
    email: String!     # email address used for login and notifications
    firstName: String! # user's first name
    lastName: String!  # user's last name
    isBlocked: Boolean! # flag indicating if the account is blocked
  }

  # Describes a course offering with its code, name, semester, and positions
  type Course {
    id: ID!                     # primary key of the course
    courseName: String!         # human-readable course title
    courseCode: String!         # unique course code identifier
    semester: Int!              # semester number when offered
    positions: [CoursePosition!]! # list of position roles associated
  }

  # Defines a role or position that can be filled for a course
  type CoursePosition {
    id: ID!   # primary key of the position
    name: String! # descriptive name of the position
  }

  # Junction type linking a lecturer to a course and semester
  type LecturerCourse {
    id: ID!           # assignment record identifier
    lecturer: User!   # reference to the lecturer user
    course: Course!   # reference to the assigned course
    semester: Int!    # semester number for this assignment
  }

  # Tutor application details submitted by a candidate user
  type TutorApplication {
    applicationID: Int! # unique ID of the application
    firstName: String!  # applicant's first name
    lastName: String!   # applicant's last name
    email: String!      # applicant's email address
    courseCode: String! # code of the applied course
    course: String!     # human-readable course name
  }

  # Ranking entry for a tutor application, including optional comments
  type ApplicantRanking {
    id: Int!                  # unique ranking record ID
    rankLevel: String         # optional rank level (e.g., 'Top Choice')
    comment: String           # optional free-text feedback
    application: TutorApplication! # the application being ranked
  }

  # Mutations for creating, updating, and deleting records
  type Mutation {
    addCourse(
      courseName: String!
      courseCode: String!
      semester: Int!
      positionIds: [ID!]!
    ): Course           # create a new course and return it

    updateCourse(
      id: ID!
      courseName: String!
      courseCode: String!
      semester: Int!
      positionIds: [ID!]!
    ): Course           # update an existing course and return it

    deleteCourse(id: ID!): Boolean # delete a course, return success flag

    assignLecturerToCourse(
      lecturerId: ID!
      courseId: ID!
      semester: Int!
    ): LecturerCourse # assign a lecturer to a course

    blockUser(userId: Int!): String   # block a user account, return status message
    unblockUser(userId: Int!): String # unblock a user account, return status message
  }

  # Root queries for fetching data
  type Query {
    coursePositions: [CoursePosition!]!      # list all available course positions
    users: [User]                            # list all users in the system
    user(id: ID!): User                      # fetch a single user by ID
    getCourses: [Course]                     # list all courses
    getAllAssignedLecturers: [LecturerCourse] # list all lecturer-course assignments
    getAllApplicantsRanking: [TutorApplication!]! # applications that have been ranked
    getAllApplicantions: [TutorApplication!]!      # list all submitted applications
  }
`;
