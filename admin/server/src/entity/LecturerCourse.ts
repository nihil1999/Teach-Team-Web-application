// src/entities/LecturerCourse.ts

// LecturerCourse entity: links lecturers to courses for specific semesters
// Represents records in the "lecturer_courses" table
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { User } from "./User";
import { Course } from "./Course";

// Map this class to the "lecturer_courses" table
@Entity({ name: "lecturer_courses" })
export class LecturerCourse extends BaseEntity {
  // Auto-generated primary key for each assignment record
  @PrimaryGeneratedColumn()
  id!: number;

  // Foreign key column storing the lecturer's user ID
  @Column({ name: "userId" })
  lecturerId!: number;

  // Foreign key column storing the associated course ID
  @Column({ name: "courseId" })
  courseId!: number;

  // Column indicating which semester this assignment applies to
  @Column({ name: "semesterId" })
  semester!: number;

  // Many-to-one relationship to the User entity (the lecturer)
  // Join on the "userId" column to fetch lecturer details
  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  lecturer!: User;

  // Many-to-one relationship to the Course entity
  // Join on the "courseId" column to fetch course details
  @ManyToOne(() => Course)
  @JoinColumn({ name: "courseId" })
  course!: Course;
}
