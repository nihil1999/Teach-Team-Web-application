// Displays the list of tutor applications submitted by the logged-in user.
// Allows tutors to update their existing applications.

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { userApi } from "@/services/api";
import { TutorApplication } from "@/types/FormFields";
import { useApplication } from "@/context/ApplicationContext";

const SubmittedApplications = () => {
  const [currentTutorApplications, setCurrentTutorApplications] = useState<TutorApplication[]>([]);
  const { currentUser } = useAuth();
  const router = useRouter();
  const { setCurrentUserApplication } = useApplication();

  useEffect(() => {
    const fetchData = async () => {
      try{
      console.log('currentUser', currentUser?.userId);
      const response = await userApi.getApplicationByUserId(currentUser?.userId);
      const userApplications = response.applications;
      if(userApplications?.length > 0){
        console.log('current application: ', userApplications);
        setCurrentTutorApplications(userApplications);
        setCurrentUserApplication(userApplications);
      }
    }
    catch(error){
      console.error("Failed to fetch applications:", error);
    }
  }
    fetchData();
  }, []);

  // Prepares update state and redirects to the tutor application form
  const handleUpdate = (application_id:number, course_name: string, course_code: string, role: string) => {
    console.log(course_name);
    const applyingState = {
      applicationId: application_id,
      courseCode: course_code,
      courseName: course_name,
      role: role,
      isApplying: false,
      isUpdating: true,
    };
    localStorage.setItem("tutorApplicationState", JSON.stringify(applyingState));
    router.push("/tutorApplicationForm");
  };

  // Display message if user has not submitted any applications
  if (!currentTutorApplications || currentTutorApplications.length === 0) {
    return (
      <div className="mt-20 mb-20 text-center text-red-700 text-2xl bg-white rounded-lg p-6 shadow border border-gray-200">
      No applications submitted
      </div>
    );
  }

  return (
    <div className="max-h-[500px] overflow-y-auto mx-30 mb-10 px-4 border border-gray-200 rounded-none shadow-inner">
      {currentTutorApplications.map((application, index) => (
        <div
          key={index}
          className="flex flex-1 mb-4 mx-10 mt-10 p-6 text-1xl bg-blue-100 text-gray-900 rounded-none justify-between"
        >
          <div className="flex flex-row flex-wrap gap-4">
            <h1>COURSE CODE: {application.courseCode}</h1>
            <h2>COURSE NAME: {application.course}</h2>
            <h3>Role: {application.position}</h3>
          </div>

          <div className="flex flex-row-reverse px-4">
            <button
              onClick={() =>
                handleUpdate(
                  application.applicationID,
                  application.course,
                  application.courseCode,
                  application.position
                )
              }
              className="underline hover:text-gray-500"
            >
              Update Application
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubmittedApplications;
