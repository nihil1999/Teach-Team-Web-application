// src/entities/User.ts

// User entity: represents system users including admins, lecturers, and candidates
// Maps to the "users" table and stores authentication and role information
import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

// Map this class to the "users" table in the database
@Entity({ name: "users" })
export class User extends BaseEntity {
  // Primary key column for the user, mapped to "user_id"
  @PrimaryColumn({ name: "user_id" })
  id!: number;

  // Column storing the user's role (e.g., 'admin', 'lecturer', 'candidate')
  @Column({ name: "role" })
  role!: string;

  // Column for the user's login email address
  @Column({ name: "email" })
  email!: string;

  // Column for the user's first name, mapped to "first_name"
  @Column({ name: "first_name" })
  firstName!: string;

  // Column for the user's last name, mapped to "last_name"
  @Column({ name: "last_name" })
  lastName!: string;

  // Boolean flag indicating if the user's account is blocked
  // Default value is false when a new user is created
  @Column({ name: "isBlocked", type: "boolean", default: false })
  isBlocked!: boolean;
}
