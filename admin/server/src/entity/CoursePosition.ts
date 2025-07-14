// src/entities/CoursePosition.ts

// CoursePosition entity: defines the types of positions available for courses
// Many-to-many relationship with Course means each position can apply to multiple courses
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany
} from "typeorm";
import { Course } from "./Course";

// Map this class to the "course_position" table in the database
@Entity({ name: "course_position" })
export class CoursePosition extends BaseEntity {
  // Auto-generated primary key column named "position_id"
  @PrimaryGeneratedColumn({ name: "position_id" })
  id!: number;

  // Column for the human-readable position name, mapped to "position_name"
  @Column({ name: "position_name" })
  name!: string;

  // Many-to-many relationship: each position may be linked with multiple courses
  @ManyToMany(() => Course, (course) => course.positions)
  courses!: Course[];
}
