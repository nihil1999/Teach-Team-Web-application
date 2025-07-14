// Tutor application form logic for Teaching Team platform.
// Handles form state, validation, localStorage submission, and update modes.

import React from "react";
import { FormFields } from "@/types/FormFields";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useProtectedRoute } from "@/hooks/useProtectedRoutes";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { userApi } from "@/services/api";
import { useApplication } from "@/context/ApplicationContext";

export default function TutorApplication() {
  useProtectedRoute("candidate");
  const router = useRouter();
  const { currentUser } = useAuth();
  const { currentUserApplication } = useApplication();

  // Initial form data
  const [formData, setFormData] = useState<Record<keyof FormFields, string>>({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    course: "",
    position: "",
    availability: "",
    previousRole: "",
    skills: "",
    qualification: "",
    specialization: "",
  });

  // Interface for routing state
  interface parsedProps {
    applicationId?: number,
    courseCode: string,
    courseName: string,
    role: string,
    isApplying: boolean,
    isUpdating: boolean,
  }

  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});
  const [parsedState, setParsedState] = useState<parsedProps>({
    applicationId: 0,
    courseCode: "",
    courseName: "",
    role: "",
    isApplying: false,
    isUpdating: false,
  });

  const { courseCode, courseName, role, isApplying, isUpdating } = parsedState;
  const key = `${courseCode}_${currentUser?.email}`;

  useEffect(() => {
    if (currentUser === null) return;

    // Load application state from localStorage
    const storedApplicantState = localStorage.getItem("tutorApplicationState");
    if (!storedApplicantState) {
      router.push("/tutor");
      return;
    }

    const parsedState = JSON.parse(storedApplicantState);
    setParsedState(parsedState);

    // Prefill form if applying
    if (isApplying) {
      setFormData((prev) => ({
        ...prev,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        course: parsedState.courseName,
        position: parsedState.role,
      }));
    }

    // Load full form details if updating
    if (isUpdating) {
      const matchApplication = currentUserApplication?.find(
        (app) => app.applicationID === parsedState.applicationId
      );
      //const submittedApplication = allTutorApplications[key];
      console.log(matchApplication);
      if (matchApplication) {
        setFormData({
          firstName: matchApplication.firstName,
          lastName: matchApplication.lastName,
          email: matchApplication.email,
          mobile: matchApplication.mobile,
          course: matchApplication.course,
          position: matchApplication.position,
          availability: matchApplication.availability,
          previousRole: matchApplication.previousRole,
          skills: matchApplication.skills,
          qualification: matchApplication.qualification,
          specialization: matchApplication.specialization,
        });
      }
      //setFormData(submittedApplication.FormDetails);
    }
  }, [courseName, currentUser, isApplying, isUpdating, role, router]);

  // Handle form input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as keyof FormFields]: value }));
    setErrors((prev) => ({ ...prev, [name as keyof FormFields]: "" }));
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof FormFields, string>> = {};
    const requiredFields: (keyof FormFields)[] = [
      "firstName", "lastName", "email", "mobile", "course",
      "position", "availability", "previousRole", "skills",
      "qualification", "specialization",
    ];

    // Validate required fields and mobile number
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required.";
      }
      if (formData.mobile) {
        const mobileRegex = /^[0-9+\s()-]{10,15}$/;
        if (!mobileRegex.test(formData.mobile)) {
          newErrors.mobile = "Please enter a valid phone number.";
        }
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const application = {
        ...formData,
        userID: currentUser?.userId || 0,
        courseCode: parsedState.courseCode,
      };
      let response;
      if (parsedState.isApplying) {
        response = await userApi.saveApplication(application);
      }
      else if (parsedState.isUpdating && parsedState.applicationId) {
        response = await userApi.updateApplicationByID({
          ...application,
          applicationID: parsedState.applicationId,
        });
      }
      const applicationID = response.applicationID;
      console.log('Application ID', applicationID);
      if (applicationID) {
        // Show toast and redirect
        toast.success(
          isUpdating ? "Information updated successfully!" : "Application submitted successfully!",
          {
            position: "top-center",
            autoClose: 2000,
            onClose: () => {
              localStorage.removeItem("tutorApplicationState");
              router.push("/tutor");
            },
          }
        );
      }
    }
  };

  // Resets form values
  const handleReset = () => {
    setFormData((prev) => ({
      ...prev,
      email: "",
      mobile: "",
      availability: "",
      previousRole: "",
      skills: "",
      qualification: "",
      specialization: "",
    }));
    setErrors({});
  };

  return (
    <>
      <div className="absolute top-10 left-10 z-50">
        <BackButton to="/tutor" label="Dashboard" />
      </div>
      <div className="min-h-screen bg-gray-100 py-10 px-4 mt-4 font-poppins pt-20">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            {isUpdating ? "Update Your Application" : "Application Form"}
          </h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 placeholder:text-gray-400"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 placeholder:text-gray-400"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 placeholder:text-gray-400"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Mobile */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input
                name="mobile"
                type="tel"
                placeholder="+61 400 000 000"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 placeholder:text-gray-400"
              />
              {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
            </div>

            {/* Course */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
              <select
                name="course"
                value={formData.course}
                // onChange={handleChange}
                disabled //disables editing
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 bg-gray-100 cursor-not-allowed"
              >
                <option value={formData.course}>
                  {formData.course || "Pre-selected course"}
                </option>
              </select>
              {/* {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>} */}
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
              <select
                name="position"
                value={formData.position}
                // onChange={handleChange}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 bg-gray-100 cursor-not-allowed"
              >
                <option value={formData.position}>
                  {formData.position || "Pre-selected course"}
                </option>
              </select>
              {/* {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>} */}
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Availability *</label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800"
              >
                <option value="">Select availability</option>
                <option value="Part-time">Part-time</option>
                <option value="Full-time">Full-time</option>
                {/* <option value="Both">Both</option> */}
              </select>
              {errors.availability && <p className="text-red-500 text-sm mt-1">{errors.availability}</p>}
            </div>

            {/* Previous Role */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Previous Role *</label>
              <input
                name="previousRole"
                placeholder="e.g. Tutor, Peer Mentor"
                value={formData.previousRole}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 placeholder:text-gray-400"
              />
              {errors.previousRole && <p className="text-red-500 text-sm mt-1">{errors.previousRole}</p>}
            </div>

            {/* Skills */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Skill Sets</label>
              <textarea
                name="skills"
                placeholder="List your technical or soft skills..."
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 placeholder:text-gray-400"
                rows={3}
              />
              {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
            </div>

            {/* Qualification */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qualification Level</label>
              <select
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800"
              >
                <option value="">Select level</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
              </select>
              {errors.qualification && <p className="text-red-500 text-sm mt-1">{errors.qualification}</p>}
            </div>

            {/* Specialization */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
              <input
                name="specialization"
                placeholder="e.g. AI, Data Analytics, Education"
                value={formData.specialization}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 placeholder:text-gray-400"
              />
              {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>}
            </div>

            {/* Submit + Reset */}
            <div className="md:col-span-2 flex flex-col gap-2">
              <button
                type="submit"
                className="w-full bg-teal-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-700 transition"
              >
                {isUpdating ? "Update Information" : "Submit Application"}
              </button>
              {isUpdating && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition"
                >
                  Clear & Start Over
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  )
};