// src/controllers/AvatarController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Avatar } from "../entities/avatar";

// Fetch all avatars from the database
export const getAvatars = async (req: Request, res: Response): Promise<any> => {
  try {
    const avatarRepo = AppDataSource.getRepository(Avatar);
    const avatars = await avatarRepo.find();

    res.status(200).json({
      message: "Avatars fetched successfully",
      avatars,
    });
  } catch (error) {
    console.error("Error fetching avatars:", error);
    res.status(500).json({
      message: "Failed to fetch avatars",
      avatars: [],
    });
  }
};