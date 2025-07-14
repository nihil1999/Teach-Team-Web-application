// src/services/courseService.ts
import { gql } from "@apollo/client";
import { client } from "./apollo-client";
import { Course, LecturerCourseAssignment } from "@/types/type";

/**---------------------------------------------------
 * 1. GraphQL documents: match your DB columns exactly
 *--------------------------------------------------*/

// — COURSES —

const GET_COURSES = gql`
  query GetCourses {
    getCourses {
      id           
      courseCode    
      courseName    
      semester
      positions {
        id
        name
      }    
    }
  }
`;

const GET_POSITIONS = gql`
  query GetCoursePositions {
    coursePositions {
      id
      name
    }
  }
`;


const ADD_COURSE = gql`
  mutation AddCourse(
    $courseCode: String!
    $courseName: String!
    $semester: Int!
    $positionIds: [ID!]!
  ) {
    addCourse(
      courseCode: $courseCode
      courseName: $courseName
      semester: $semester
      positionIds: $positionIds
    ) {
      id
      courseCode
      courseName
      semester
      positions {
        id
        name
      }
    }
  }
`;

const UPDATE_COURSE = gql`
  mutation UpdateCourse(
    $id: ID!
    $courseCode: String!
    $courseName: String!
    $semester: Int!
    $positionIds: [ID!]!
  ) {
    updateCourse(
      id: $id
      courseCode: $courseCode
      courseName: $courseName
      semester: $semester
      positionIds: $positionIds
    ) {
      id
      courseCode
      courseName
      semester
      positions {
        id
        name
      }
    }
  }
`;

const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id)
  }
`;

// — LECTURER_COURSES —

const GET_LECTURER_COURSES = gql`
  query GetLecturerCourses {
    getLecturerCourses {
      id           # PK
      semester   # maps to semesterId
      userId       # maps to userId
      courseId     # maps to courseId
    }
  }
`;

const ASSIGN_LECTURER_TO_COURSE = gql`
  mutation AssignLecturerToCourse($lecturerId: ID!, $courseId: ID!, $semester: Int!) {
    assignLecturerToCourse(lecturerId: $lecturerId, courseId: $courseId, semester: $semester) {
      id
      lecturer {
        firstName
        lastName
      }
      course {
        courseName
      }
      semester
    }
  }
`;

const GET_ASSIGNED_LECTURERS = gql`
  query {
    getAllAssignedLecturers {
      id
      lecturer {
        firstName
        lastName
      }
      course {
        courseName
      }
      semester
    }
  }
`;

const DELETE_LECTURER_ASSIGNMENT = gql`
  mutation DeleteLecturerCourseAssignment($id: ID!) {
    deleteLecturerCourseAssignment(id: $id)
  }
`;

/**---------------------------------------------------
 * 2. Service methods
 *--------------------------------------------------*/

export const courseService = {
  // ── COURSES ───────────────────────────────────────
  getPositions: async () => {
    const { data } = await client.query({ query: GET_POSITIONS });
    return data.coursePositions;
  },

  getCourses: async (): Promise<Course[]> => {
    console.log('get courses')
    const { data } = await client.query({
      query: GET_COURSES,
      fetchPolicy: "no-cache",
    });
    return data.getCourses;
  },

  getAllAssignedLecturers: async (): Promise<LecturerCourseAssignment[]> => {
    const { data } = await client.query({
      query: GET_ASSIGNED_LECTURERS,
      fetchPolicy: "no-cache"
    });
    return data.getAllAssignedLecturers;
  },

  addCourse: async (
    courseCode: string,
    courseName: string,
    semester: number,
    positionIds: number[]
  ): Promise<Course> => {
    const { data } = await client.mutate({
      mutation: ADD_COURSE,
      variables: { courseCode, courseName, semester, positionIds  },
    });
    return data.addCourse;
  },

  updateCourse: async (
    id: number,
    courseCode: string,
    courseName: string,
    semester: number,
    positionIds: number[]
  ): Promise<Course> => {
    const { data } = await client.mutate({
      mutation: UPDATE_COURSE,
      variables: { id, courseCode, courseName, semester, positionIds  },
    });
    return data.updateCourse;
  },

  deleteCourse: async (id: number): Promise<boolean> => {
    const { data } = await client.mutate({
      mutation: DELETE_COURSE,
      variables: { id },
    });
    return data.deleteCourse;
  },

  // ── LECTURER_COURSES ─────────────────────────────

  getLecturerCourses: async (): Promise<LecturerCourseAssignment[]> => {
    const { data } = await client.query({
      query: GET_LECTURER_COURSES,
      fetchPolicy: "no-cache",
    });
    return data.getLecturerCourses;
  },

  assignLecturerToCourse: async (
    lecturerId: number,
    courseId: number,
    semester: number
  ): Promise<LecturerCourseAssignment> => {
    const { data } = await client.mutate({
      mutation: ASSIGN_LECTURER_TO_COURSE,
      variables: {
        lecturerId: lecturerId.toString(),
        courseId: courseId.toString(),
        semester,
      },
    });
    return data.assignLecturerToCourse;
  },

  deleteLecturerCourseAssignment: async (id: number): Promise<boolean> => {
    const { data } = await client.mutate({
      mutation: DELETE_LECTURER_ASSIGNMENT,
      variables: { id },
    });
    return data.deleteLecturerCourseAssignment;
  },
};
