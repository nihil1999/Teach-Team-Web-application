import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Course } from "./course";
import { LecturerCourse } from "./lectureCourses";

// Define the 'semesters' table
@Entity("semesters")
export class Semester {
  @PrimaryGeneratedColumn()
  id!: number;

  // Semester name must be unique
  @Column({ name: "semester_name", unique: true })
  semesterName!: string;

  // Relations to courses and lecturer-course mappings
  @OneToMany(() => Course, (course) => course.semester)
  courses!: Course[];

  @OneToMany(() => LecturerCourse, (lc) => lc.semester)
  lecturerCourses!: LecturerCourse[];
}