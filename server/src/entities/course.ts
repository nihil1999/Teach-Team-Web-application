import { Entity, PrimaryGeneratedColumn, Column, ManyToMany,ManyToOne,OneToMany, JoinTable } from "typeorm";
import { CoursePosition } from "./coursePosition";
import { Semester } from "./semester";
import { LecturerCourse } from "./lectureCourses";

// Define the 'courses' table
@Entity("courses")
export class Course {
  @PrimaryGeneratedColumn()
  course_id!: number;

  // Basic course info
  @Column({ type: "varchar", length: 10 })
  course_code!: string;

  @Column({ type: "varchar", length: 100 })
  course_name!: string;

  // Many-to-many relationship with course positions
  @ManyToMany(() => CoursePosition, (position) => position.courses)
  @JoinTable({
    name: "course_positions_map",  
    joinColumn: {
      name: "course_id",
      referencedColumnName: "course_id"
    },
    inverseJoinColumn: {
      name: "position_id",
      referencedColumnName: "position_id"
    }
  })
  positions!: CoursePosition[];

// Relation to semester
@ManyToOne(() => Semester, (semester) => semester.courses, { onDelete: "RESTRICT", onUpdate: "CASCADE" })
semester!: Semester;

// One-to-many relation with lecturer-course mapping
@OneToMany(() => LecturerCourse, (lc) => lc.course)
lecturerCourses!: LecturerCourse[];
}
