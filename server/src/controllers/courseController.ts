import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Course } from "../entities/course";
import { LecturerCourse } from "../entities/lectureCourses";

// Get all courses with position mappings
export const getCourses = async (req: Request, res: Response): Promise<any> => {
  try {
    const courseRepo = AppDataSource.getRepository(Course);
    const courses = await courseRepo.find({ relations: ["positions"] });

    res.status(200).json({
      message: "Courses fetched successfully",
      courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      message: "Failed to fetch courses",
      courses: [],
    });
  }
};

// Get courses assigned to a specific lecturer
export const getLecturerCourses = async (req: Request, res: Response): Promise<any> => {
  const { userID } = req.params;
console.log('userID', userID);
  try {
    const lecturerCourseRepo = AppDataSource.getRepository(LecturerCourse);

    const lecturerCourses = await lecturerCourseRepo.find({
      where: {
        lecturer: { userId: Number(userID) }
      },
      relations: {
        course: true,
        semester: true
      }
    });

    // Return simplified course info
    const filteredCourses = lecturerCourses.map((lc) => ({
      courseCode: lc.course.course_code,
      courseName: lc.course.course_name,
      semesterName: lc.semester.semesterName
    }));

    return res.status(200).json({ courses: filteredCourses });
  } catch (error) {
    console.error("Error fetching lecturer courses:", error);
    return res.status(500).json({ message: "Failed to retrieve lecturer courses." });
  }
};

