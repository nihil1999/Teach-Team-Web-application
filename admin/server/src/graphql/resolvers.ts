// src/graphql/resolvers.ts

// GraphQL resolvers: handle queries and mutations using TypeORM entities
import { User } from "../entity/User";                   // User entity for authentication and roles
import { Course } from "../entity/Course";               // Course entity representing course records
import { LecturerCourse } from "../entity/LecturerCourse"; // Junction entity linking lecturers to courses
import { CoursePosition } from "../entity/CoursePosition"; // Entity for available course positions
import { ApplicantRanking } from "../entity/ApplicantRanking"; // Entity for ranking tutor applications
import { TutorApplication } from "../entity/tutorApplications"; // Entity for tutor application submissions
import { relative } from "path";                          // Node.js path utility (not used below)

export const resolvers = {
  Query: {
    // Retrieve all users from the database
    users: async () => await User.find(),

    // Retrieve a single user by their ID
    user: async (_: any, { id }: { id: number }) =>
      await User.findOneBy({ id }),

    // Retrieve all course position records
    coursePositions: async () => CoursePosition.find(),

    // Retrieve all courses and log them for debugging purposes
    getCourses: async () => {
      const courses = await Course.find();
      console.log("Fetched courses:", courses);
      return courses;
    },

    // Retrieve all lecturer-course assignments with related lecturer and course data
    getAllAssignedLecturers: async () => {
      return await LecturerCourse.find({
        relations: ["lecturer", "course"]
      });
    },

    // Retrieve all applicant rankings, then return the associated applications
    getAllApplicantsRanking: async () => {
      const rankings = await ApplicantRanking.find({ relations: ["application"] });
      return rankings.map((r) => r.application);
    },

    // Retrieve every tutor application record
    getAllApplicantions: async () => {
      return await TutorApplication.find();
    }
  },

  Mutation: {
    // Add a new course with specified name, code, semester, and position IDs
    addCourse: async (
      _: any,
      { courseName, courseCode, semester, positionIds }: { courseName: string; courseCode: string; semester: number; positionIds: number[]; }
    ) => {
      const pos = await CoursePosition.findByIds(positionIds);
      const newCourse = Course.create({ courseName, courseCode, semester, positions: pos });
      return await newCourse.save();
    },

    // Update an existing course's details and positions by ID
    updateCourse: async (
      _: any,
      { id, courseName, courseCode, semester, positionIds }: { id: number; courseName: string; courseCode: string; semester: number; positionIds: number[]; }
    ) => {
      const course = await Course.findOneBy({ id });
      if (!course) throw new Error("Course not found");
      course.courseName = courseName;
      course.courseCode = courseCode;
      course.semester = semester;
      course.positions = await CoursePosition.findByIds(positionIds);
      return await course.save();
    },

    // Assign a lecturer to a course for a given semester
    assignLecturerToCourse: async (
      _: any,
      { lecturerId, courseId, semester }: { lecturerId: number; courseId: number; semester: number }
    ) => {
      const lecturer = await User.findOneBy({ id: lecturerId });
      const course = await Course.findOneBy({ id: courseId });
      if (!lecturer || !course) throw new Error("Lecturer or Course not found");
      const assignment = LecturerCourse.create({ lecturer, course, semester });
      return await assignment.save();
    },

    // Block a user account by setting its isBlocked flag to true
    blockUser: async (_: any, { userId }: { userId: number }) => {
      const user = await User.findOneBy({ id: userId });
      if (!user) throw new Error("User not found");
      user.isBlocked = true;
      await user.save();
      return "User blocked.";
    },

    // Unblock a user account by clearing its isBlocked flag
    unblockUser: async (_: any, { userId }: { userId: number }) => {
      const user = await User.findOneBy({ id: userId });
      if (!user) throw new Error("User not found");
      user.isBlocked = false;
      await user.save();
      return "User unblocked.";
    },

    // Delete a course record by its ID and return success status
    deleteCourse: async (_: any, { id }: { id: number }) => {
      const result = await Course.delete(id);
      return result.affected === 1;
    },
  },
};
