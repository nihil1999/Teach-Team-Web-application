// src/entities/Course.ts

// Course entity: represents the "courses" table and its many-to-many relationship with CoursePosition
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable } from 'typeorm';
import { CoursePosition } from './CoursePosition';

// Map this class to the "courses" table in the database
@Entity({ name: 'courses' })
export class Course extends BaseEntity {
  // Auto-generated primary key column named "course_id"
  @PrimaryGeneratedColumn({ name: 'course_id' })
  id!: number;

  // Column for the course's display name, mapped to "Course_name"
  @Column({ name: 'Course_name' })
  courseName!: string;

  // Column for the unique course code, mapped to "Course_code"
  @Column({ name: 'Course_code' })
  courseCode!: string;

  // Column storing the semester identifier, mapped to "semesterId"
  @Column({ name: 'semesterId' })
  semester!: number;

  // Many-to-many relationship with CoursePosition
  // Eager loading ensures positions are retrieved whenever a Course is fetched
  @ManyToMany(() => CoursePosition, { eager: true })
  @JoinTable({
    // Specify join table details for the many-to-many link
    name: 'course_positions_map',            // join table name
    joinColumn: { name: 'course_id' },       // this entity's key column
    inverseJoinColumn: { name: 'position_id' } // related entity's key column
  })
  positions!: CoursePosition[];
}
