import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    OneToMany
} from "typeorm";
import { User } from "./user"; 
import { ApplicantRanking } from "./applicantRanking";

// Define the 'tutorApplications' table
@Entity("tutorApplications")
export class TutorApplication {
    @PrimaryGeneratedColumn()
    applicationID!: number;

    // Relation to User
    @ManyToOne(() => User, (user) => user.applications, { onDelete: "SET NULL" })
    @JoinColumn({ name: "userID" })
    user!: User;

    // Application details
    @Column({ nullable: true })
    courseCode!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    email!: string;

    @Column({ nullable: true })
    mobile!: string;

    @Column({ nullable: true })
    course!: string;

    @Column()
    position!: string;

    @Column({ type: "text", nullable: true })
    availability!: string;

    @Column({ type: "text", nullable: true })
    previousRole!: string;

    @Column({ type: "text", nullable: true })
    skills!: string;

    @Column({ nullable: true })
    qualification!: string;

    @Column({ nullable: true })
    specialization!: string;

    @CreateDateColumn({ type: "datetime" })
    submitted_at!: Date;

    @OneToMany(() => ApplicantRanking, ranking => ranking.application)
    rankings!: ApplicantRanking[];
}
