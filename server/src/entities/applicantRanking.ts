import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { User } from "./user";
import { TutorApplication } from "./tutorApplication";

// Define the 'applicant_rankings' table with a unique constraint
@Entity("applicant_rankings")
@Unique(["user", "application"])
export class ApplicantRanking {
  @PrimaryGeneratedColumn()
  id!: number;

  // Linked user (lecturer)
  @ManyToOne(() => User, (user) => user.rankings, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user!: User;

  // Linked tutor application
  @ManyToOne(() => TutorApplication, (app) => app.rankings, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "applicationID" })
  application!: TutorApplication;

  @Column({ name: "rankLevel", type: "varchar", length: 50, nullable: true })
  rankLevel!: string;

  @Column({ name: "comment", type: "text", nullable: true })
  comment!: string;
}
