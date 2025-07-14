// Required imports and environment config
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/user";
import dotenv from "dotenv";
import { Avatar } from "./entities/avatar";
import { Course } from "./entities/course";
import { CoursePosition } from "./entities/coursePosition";
import { TutorApplication } from "./entities/tutorApplication";
import { Semester } from "./entities/semester";
import { LecturerCourse } from "./entities/lectureCourses";
import { ApplicantRanking } from "./entities/applicantRanking";

dotenv.config();

// Database connection setup
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [User, Avatar, Course, CoursePosition, TutorApplication, Semester, LecturerCourse, ApplicantRanking],
  migrations: [],
  subscribers: [],
});