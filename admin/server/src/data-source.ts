import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Course } from "./entity/Course";
import { LecturerCourse } from "./entity/LecturerCourse";
import { CoursePosition } from "./entity/CoursePosition";
import { ApplicantRanking } from "./entity/ApplicantRanking";
import { TutorApplication } from "./entity/tutorApplications";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "209.38.26.237",
  port: 3306,
  /* credentials */
  username: "S4001201",
  password: "Nihil@01",
  database: "S4001201",
  // synchronize: true will automatically create database tables based on entity definitions
  // and update them when entity definitions change. This is useful during development
  // but should be disabled in production to prevent accidental data loss.
  synchronize: false,
  logging: true,
  entities: [User, Course, LecturerCourse, CoursePosition, ApplicantRanking, TutorApplication],
  migrations: [],
  subscribers: [],
});
