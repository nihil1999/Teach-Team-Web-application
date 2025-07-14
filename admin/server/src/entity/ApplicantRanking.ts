// src/entities/ApplicantRanking.ts

// ApplicantRanking entity: represents a ranking entry for a tutor application by a specific user
// This table enforces uniqueness per application to prevent duplicate rankings
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Unique,
    BaseEntity,
} from "typeorm";
import { TutorApplication } from "./tutorApplications";

// Map this class to the "applicant_rankings" table and ensure each application has only one ranking
@Entity("applicant_rankings")
@Unique(["application"])
export class ApplicantRanking extends BaseEntity {
    // Auto-generated primary key
    @PrimaryGeneratedColumn()
    id!: number;

    // ID of the user who created this ranking (foreign key to users table)
    @Column({ name: "userId" })
    userId!: number;

    // Many-to-one relationship: each ranking is linked to one TutorApplication
    // Deleting or updating the application cascades to its rankings
    @ManyToOne(() => TutorApplication, (app) => app.rankings, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    // Join column maps this relation to the "applicationID" column in the database
    @JoinColumn({ name: "applicationID" })
    application!: TutorApplication;

    // Optional rank level assigned by the user, stored as a string up to 50 characters
    @Column({ name: "rankLevel", type: "varchar", length: 50, nullable: true })
    rankLevel!: string;

    // Optional free-text comment for additional feedback on the application
    @Column({ name: "comment", type: "text", nullable: true })
    comment!: string;
}
