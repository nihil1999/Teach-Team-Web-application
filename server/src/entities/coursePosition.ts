import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Course } from "./course";

// Define the 'course_position' table
@Entity("course_position")
export class CoursePosition {
  @PrimaryGeneratedColumn()
  position_id!: number;

  // Name of the position (e.g., Tutor, Lab Assistant)
  @Column({ type: "varchar", length: 50 })
  position_name!: string;

  @ManyToMany(() => Course, (course) => course.positions)
  courses!: Course[];
}