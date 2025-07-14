import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user";
import { Course } from "./course";
import { Semester } from "./semester";

// Define the 'lecturer_courses' table
@Entity("lecturer_courses")
export class LecturerCourse {
  @PrimaryGeneratedColumn()
  id!: number;

// Link to lecturer (user)
@ManyToOne(() => User, u => u.lecturerCourses, { onDelete: 'RESTRICT' })
@JoinColumn({ name: 'userId' })
lecturer!: User;

// Link to course
@ManyToOne(() => Course, c => c.lecturerCourses, { onDelete: 'RESTRICT' })
@JoinColumn({ name: 'courseId' })
course!: Course;

// Link to semester
@ManyToOne(() => Semester, s => s.lecturerCourses, { onDelete: 'RESTRICT' })
@JoinColumn({ name: 'semesterId' })
semester!: Semester;
}