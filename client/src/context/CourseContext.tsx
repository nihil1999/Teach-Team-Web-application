// Course context to provide access to the list of current semester courses.
// Initializes course data from localStorage or defaults if none exist.

import React, { createContext, useContext, useState, useEffect } from "react";
import { Course } from "../types/Course";
import { userApi } from "@/services/api";

interface CourseContextType {
  currentSemesterCourses: Course[] | null;
  setCurrentSemesterCourses: (currentSemesterCourses: Course[] | null) => void;
}

// Create the course context
const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [currentSemesterCourses, setCurrentSemesterCourses] = useState<Course[] | null>(null);

    useEffect(() => {
      const fetchData = async() => {
        try{
          const response = await userApi.getCourses();
          const courses = response.courses;
          if(courses){
            setCurrentSemesterCourses(courses);
          }
        }
        catch(error){
          console.error(error);
        }
      }
      fetchData();
    })

  return (
    <CourseContext.Provider value={{ currentSemesterCourses, setCurrentSemesterCourses }}>
      {children}
    </CourseContext.Provider>
  );
}

// Hook to access course context
export function useCourse() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourse must be used within an CourseProvider");
  }
  return context;
}
