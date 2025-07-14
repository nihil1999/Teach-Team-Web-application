// services/api.ts

// Axios instance configured with base URL for backend API calls
import axios from "axios";
import { RegisterRequest, User } from "@/types/User";
import { CoursesResponse } from "@/types/Course";
import { Application } from "@/types/FormFields";

// Create a pre-configured axios client to simplify HTTP requests
export const api = axios.create({
  baseURL: "http://localhost:3002/api", // adjust this to match your backend URL
});

// Payload sent when logging in
export interface LoginRequest {
  email: string;    // user's email for authentication
  password: string; // user's password for authentication
}

// Response format expected from login endpoint
export interface LoginResponse {
  message: string;  // success or error message
  user?: User;      // optional user object on successful login
}

// Encapsulates user and application-related API calls
export const userApi = {
  // Authenticate a user and retrieve their details
  getUser: async (user: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", user);
    return response.data;
  },

  // Register a new user account
  createUser: async (user: RegisterRequest) => {
    console.log('API request is going...', user);
    const response = await api.post("/auth/register", user);
    console.log('API Response', response);
    return response.data;
  },

  // Retrieve all available avatars for user profiles
  getAvatar: async (): Promise<any> => {
    const response = await api.get("/request/getAllAvatars");
    return response.data;
  },

  // Update an existing user's information by their ID
  updateUser: async (userId: number, user: Partial<User>) => {
    console.log("Calling updateUser API", userId, user);
    const response = await api.put(`/auth/user/update/${userId}`, user);
    return response.data;
  },

  // Fetch the list of courses from the backend
  getCourses: async (): Promise<CoursesResponse> => {
    const response = await api.get("/request/getAllCourses");
    return response.data;
  },

  // Submit a tutor application record
  saveApplication: async (application: Application): Promise<any> => {
    const response = await api.post("/application/saveApplication", application);
    return response.data;
  },

  // Retrieve the current user's application by their user ID
  getApplicationByUserId: async (userID: any): Promise<any> => {
    const response = await api.get(`/application/getApplicationByUserId/${userID}`);
    return response.data;
  },

  // Update an existing application using its ID and payload
  updateApplicationByID: async (application: any): Promise<any> => {
    const response = await api.put("/application/updateApplication", application);
    return response.data;
  },

  // Get courses assigned to a specific lecturer by their user ID
  getCoursesByLecturerId: async (userID: number): Promise<any> => {
    const response = await api.get(`/request/getLecturerCourses/${userID}`);
    return response.data;
  },

  // Retrieve all applications assigned to a given lecturer for review
  getApplicationByLecturerID: async (userID: any): Promise<any> => {
    const response = await api.get(`/application/getApplicationsByLecturer/${userID}`);
    return response.data;
  },

  // Get existing ranking for a user to pre-fill ranking form
  getExistingRanking: async (userID: any): Promise<any> => {
    const response = await api.get(`/ranking/getExistingRanking/${userID}`);
    return response.data;
  },

  // Create or update a ranking record for a given application
  saveRanking: async (data: {
    userId: any;
    applicationId: string;
    rank: string;
    comment: string;
  }) => {
    const response = await api.post('/ranking/insertAndUpdate', data);
    return response.data;
  },

  // Delete a ranking record for a given user and application combination
  deleteRanking: async (data: { userId: any; applicationId: string }) => {
    return await api.delete("/ranking/delete", { data });
  },

  // Fetch all tutor applications for admin overview
  getAllTutorApplications: async () => {
    const response = await api.get("/application/allApplication");
    console.log('response', response);
    return response.data;
  },

  // Retrieve statistics or selected applications via ranking stats endpoint
  getSelectedTutorApplications: async () => {
    const response = await api.get("/ranking/stats");
    return response.data;
  },
};
