import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user";
import { Avatar } from "../entities/avatar";
import bcrypt from "bcryptjs"; 

// Define input structure
interface UpdateInput {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: string;
  avatar_id: number;
}

// Update user profile
export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.params;
  const { firstName, lastName, email, password, role, avatar_id } = req.body;

  try {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
      where: { userId: Number(userId) },
      relations: { avatar: true }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update basic user fields
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.role = role;

    if (password && password.trim() !== "") {
      user.password = await bcrypt.hash(password, 10);
    }

    if (avatar_id) {
  const avatarRepo = AppDataSource.getRepository(Avatar);
  const avatar = await avatarRepo.findOneBy({ avatarId: avatar_id });

  if (!avatar) {
    return res.status(404).json({ message: "Avatar not found." });
  }

  user.avatar = avatar;
}

    // Save and return updated user
    const updatedUser = await userRepo.save(user);
    return res.json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ message: "Server error", user: null });
  }
};
