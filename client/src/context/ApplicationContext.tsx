// Course context to provide access to the list of current semester courses.
// Initializes course data from localStorage or defaults if none exist.

import React, { createContext, useContext, useState } from "react";
import { TutorApplication } from "@/types/FormFields";

interface ApplicationContextType {
  currentUserApplication: TutorApplication[] | null;
  setCurrentUserApplication: (currentUserApplication: TutorApplication[] | null) => void;
}

// Create the course context
const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export function ApplicationProvider({ children }: { children: React.ReactNode }) {
  const [currentUserApplication, setCurrentUserApplication] = useState<TutorApplication[] | null>(null);

  return (
    <ApplicationContext.Provider value={{ currentUserApplication, setCurrentUserApplication }}>
      {children}
    </ApplicationContext.Provider>
  );
}

// Hook to access course context
export function useApplication() {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error("useCourse must be used within an CourseProvider");
  }
  return context;
}
