// Course context to provide access to the list of current semester courses.
// Initializes course data from localStorage or defaults if none exist.

import React, { createContext, useContext, useState, useEffect } from "react";
import { LecturerCourse } from "../types/Course";
import { userApi } from "@/services/api";
import { useAuth } from "./AuthContext";

interface CourseContextType {
  lecturerCourses: LecturerCourse[] | null;
  setLecturerCourses: (LecturerCourses: LecturerCourse[] | null) => void;
}

// Create the course context
const LecturerContext = createContext<CourseContextType | undefined>(undefined);

export function LecturerProvider({ children }: { children: React.ReactNode }) {
  const [lecturerCourses, setLecturerCourses] = useState<LecturerCourse[] | null>(null);
  const { currentUser } = useAuth();
    useEffect(() => {
      const fetchData = async() => {
        try{
            console.log('userID in context', currentUser?.userId);
        if(currentUser?.userId){
          const response = await userApi.getCoursesByLecturerId(currentUser?.userId);
          const courses = response.courses;
          if(courses){
            console.log(courses);
            setLecturerCourses(courses);
          }
        }}
        catch(error){
          console.error(error);
        }
      }
      fetchData();
    }, [currentUser?.userId]);

  return (
    <LecturerContext.Provider value={{ lecturerCourses, setLecturerCourses }}>
      {children}
    </LecturerContext.Provider>
  );
}

// Hook to access course context
export function useLecturer() {
  const context = useContext(LecturerContext);
  if (context === undefined) {
    throw new Error("useCourse must be used within an CourseProvider");
  }
  return context;
}
