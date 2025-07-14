import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { TutorApplication } from "../entities/tutorApplication";
import { User } from "../entities/user";
import { LecturerCourse } from "../entities/lectureCourses";

export const saveApplication = async (req: Request, res: Response): Promise<any> => {
    try {
        const {
            userID,
            courseCode,
            firstName,
            lastName,
            email,
            mobile,
            course,
            position,
            availability,
            previousRole,
            skills,
            qualification,
            specialization,
        } = req.body;

        // Find the user
        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { userId: userID } });

        if (!user) {
            return res.status(200).json({ message: "User not found.", applicationID: null });
        }

        // Create new application
        const appRepo = AppDataSource.getRepository(TutorApplication);
        const newApp = appRepo.create({
            user,
            courseCode,
            firstName,
            lastName,
            email,
            mobile,
            course,
            position,
            availability,
            previousRole,
            skills,
            qualification,
            specialization,
        });

        await appRepo.save(newApp);

        res.status(201).json({ message: "Application submitted successfully", applicationID: newApp.applicationID });
    } catch (error) {
        console.error("Error submitting tutor application:", error);
        res.status(500).json({ message: "Failed to submit application", applicationID: null });
    }
};

export const getApplicationByUserId = async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = Number(req.params.userId);
        console.log('user id:', userId);
        if (!userId) {
            return res.status(200).json({ message: "userId is required", applications: [] });
        }

        const appRepo = AppDataSource.getRepository(TutorApplication);
        const applications = await appRepo.find({
            where: { user: { userId: userId } },
            relations: ["user"], // include user details if needed
        });

        if (!applications.length) {
            return res.status(200).json({ message: "No applications found for this user", applications: [] });
        }

        res.status(200).json({
            message: "Applications fetched successfully",
            applications,
        });
    } catch (error) {
        console.error("Error fetching applications by userId:", error);
        res.status(500).json({
            message: "Failed to fetch applications",
            applications: [],
        });
    }
};

export const updateTutorApplication = async (req: Request, res: Response): Promise<any> => {
    try {
        const { applicationID, ...updatedFields } = req.body;

        const repo = AppDataSource.getRepository(TutorApplication);
        const existing = await repo.findOne({ where: { applicationID } });

        if (!existing) {
            return res.status(404).json({ message: "Application not found" });
        }

        repo.merge(existing, updatedFields); // safely merges updated fields
        const result = await repo.save(existing);

        res.status(200).json({ message: "Application updated successfully", applicationID: result.applicationID });
    } catch (error) {
        console.error("Update failed:", error);
        res.status(500).json({ message: "Failed to update application" });
    }
};

export const getApplicationsByLecturer = async (req: Request, res: Response): Promise<any> => {
    const { lecturerId } = req.params;

    try {
        const lecturerCourseRepo = AppDataSource.getRepository(LecturerCourse);
        const applicationRepo = AppDataSource.getRepository(TutorApplication);

        // Get all courses assigned to the lecturer
        const lecturerCourses = await lecturerCourseRepo.find({
            where: { lecturer: { userId: Number(lecturerId) } },
            relations: ["course"]
        });
        if (lecturerCourses.length === 0) {
            return res.status(200).json({ applications: [] });
        }
        const courseCodes = lecturerCourses.map((lc) => lc.course.course_code);

        // Get tutor applications for those courses
        const applications = await applicationRepo.find({
            where: courseCodes.map((code) => ({ courseCode: code }))
        });

        // Transform data to only return required fields
        const transformed = applications.map((form) => ({
            applicationId: form.applicationID,
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
            course: form.course,
            availability: form.availability,
            skills: form.skills,
            academics: form.qualification,
            position: form.position
        }));

        return res.status(200).json({ applications: transformed });
    } catch (error) {
        console.error("Error fetching applications:", error);
        return res.status(500).json({ message: "Failed to retrieve applications." });
    }
};

export const getAllApplications = async (req: Request, res: Response): Promise<any> => {
    try {
        console.log('Get all applications')
        const repo = AppDataSource.getRepository(TutorApplication);
        const allApplications = await repo.find();

        if (!allApplications) {
            return res.status(200).json({ message: "Application not found" });
        }

        res.status(200).json({ allApplications });
    } catch (error) {
        console.error("Update failed:", error);
        res.status(500).json({ message: "Failed to update application" });
    }
};