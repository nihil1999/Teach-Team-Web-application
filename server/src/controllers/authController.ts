import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user";
import bcrypt from "bcryptjs";

// Interface to help TypeScript understand req.body shape for registration
interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  avatar_id: number;
}

// ------------------- REGISTER -------------------

export const registerUser = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response
): Promise<any> => {
  const { firstName, lastName, email, password, role, avatar_id } = req.body;

  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(201).json({
      message: "All fields are required.",
      user: null,
    });
  }

  try {
    const userRepo = AppDataSource.getRepository(User);

    const existingUser = await userRepo.findOneBy({ email });
    if (existingUser) {
      return res.status(201).json({
        message: "Email already registered.",
        user: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepo.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      avatar: { avatarId: avatar_id },
    });

    const savedUser = await userRepo.save(newUser);

    return res.status(201).json({
      message: "User registered successfully",
      user: savedUser,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      message: "Server error",
      user: null,
    });
  }
};

// ------------------- LOGIN -------------------

export const loginUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(200).json({
      message: "Email and password are required.",
      user: null,
    });
  }

  try {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
      where: { email },
      relations: { avatar: true }
    });

    if (!user) {
      return res.status(200).json({
        message: "Invalid email or password.",
        user: null,
      });
    }

    let isMatch = false;

    if (user.password.startsWith("$2")) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      isMatch = password === user.password;
    }

    if (!isMatch) {
      return res.status(200).json({
        message: "Invalid email or password.",
        user: null,
      });
    }

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Server error",
      user: null,
    });
  }
};
