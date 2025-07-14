// src/entities/TutorApplication.ts

// TutorApplication entity: represents tutor application records submitted by users
// Includes personal details, application metadata, and related ranking entries
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    OneToMany,
    BaseEntity
} from "typeorm";
// referenced user who submitted the application
import { ApplicantRanking } from "./ApplicantRanking"; // rankings associated with this application

// Map this class to the "tutorApplications" table
@Entity("tutorApplications")
export class TutorApplication extends BaseEntity {
    // Auto-generated primary key for each application
    @PrimaryGeneratedColumn()
    applicationID!: number;

    // Foreign key to the User entity (applicant)
    @Column({ name: "userId" })
    userId!: number;

    // Optional course code field if the applicant specified a code
    @Column({ nullable: true })
    courseCode!: string;

    // Applicant's first name
    @Column()
    firstName!: string;

    // Applicant's last name
    @Column()
    lastName!: string;

    // Applicant's contact email
    @Column()
    email!: string;

    // Optional mobile number
    @Column({ nullable: true })
    mobile!: string;

    // Optional human-readable course name
    @Column({ nullable: true })
    course!: string;

    // Role or position the applicant applied for
    @Column()
    position!: string;

    // Availability details, stored as text when provided
    @Column({ type: "text", nullable: true })
    availability!: string;

    // Previous role or experience summary
    @Column({ type: "text", nullable: true })
    previousRole!: string;

    // Skills listed by the applicant
    @Column({ type: "text", nullable: true })
    skills!: string;

    // Optional qualification details
    @Column({ nullable: true })
    qualification!: string;

    // Optional specialization details
    @Column({ nullable: true })
    specialization!: string;

    // Timestamp for when the application was submitted
    @CreateDateColumn({ type: "datetime" })
    submitted_at!: Date;

    // One-to-many relation: an application can have multiple ranking entries
    @OneToMany(() => ApplicantRanking, ranking => ranking.application)
    rankings!: ApplicantRanking[];
}
