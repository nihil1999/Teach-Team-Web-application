import { useCourse } from "@/context/CourseContext";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { useApplication } from "@/context/ApplicationContext";

const CourseCard = () => {
  const { currentSemesterCourses } = useCourse();
  const router = useRouter();
  const { currentUserApplication } = useApplication();

  // Track selected role for each course (keyed by course_code)
  const [selectedRoles, setSelectedRoles] = useState<Record<string, string>>({});

  const handleApplyNow = (course_name: string, course_code: string) => {
    const role = selectedRoles[course_code]; // get selected role
    if (!role) {
      toast.warn("Please select a role before applying.", { position: "top-center", autoClose: 2000 });
      return;
    }
    console.log('Current user application', currentUserApplication);
    const alreadyApplied = currentUserApplication?.some(
      (app) => app.courseCode === course_code && app.position === role
    );
    if (alreadyApplied) {
      toast.info("Application already submitted.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    const applyingState = {
      courseCode: course_code,
      courseName: course_name,
      role: role,
      isApplying: true,
      isUpdating: false,
    };

    localStorage.setItem("tutorApplicationState", JSON.stringify(applyingState));
    router.push("/tutorApplicationForm");
  };

  return (
    <>
      <div className="max-h-[500px] overflow-y-auto mx-30 mb-10 px-4 border border-gray-200 rounded-none shadow-inner bg-white">
        {currentSemesterCourses?.map((course, index) => (
          <div
            key={index}
            className="flex flex-1 mb-4 mx-4 mt-4 p-6 text-1xl bg-blue-100 text-gray-900 rounded-none justify-between"
            // className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 mb-4 mx-10 mt-10 p-6 bg-blue-100 shadow-md rounded-md text-gray-900"
          >
            {/* Course details */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-base font-medium">
              <span>COURSE CODE: {course.course_code}</span>
              <span>COURSE NAME: {course.course_name}</span>

              <label className="flex items-center text-gray-700">
                <span className="mr-2">Role:</span>
                <select
                  className="p-2 rounded-md border border-gray-400 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    setSelectedRoles((prev) => ({
                      ...prev,
                      [course.course_code]: e.target.value,
                    }))
                  }
                  value={selectedRoles[course.course_code] || ""}
                >
                  <option value="">Select role</option>
                  {course.positions.map((role) => (
                    <option key={role.position_id} value={role.position_name}>
                      {role.position_name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Apply Button */}
            <div>
              <button
                onClick={() => handleApplyNow(course.course_name, course.course_code)}
                className="text-blue-800 underline font-semibold hover:text-blue-600"
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </>
  );
};

export default CourseCard;
