import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// Define the 'avatars' table
@Entity({ name: "avatars" })
export class Avatar {
  @PrimaryGeneratedColumn({ name: "avatar_id" })
  avatarId!: number;

  // URL for the avatar image
  @Column({ name: "avatar_url" })
  avatarUrl!: string;
}