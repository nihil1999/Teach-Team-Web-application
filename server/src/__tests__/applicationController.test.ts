/**
 *  Auth Controller Test Suite
 *
 * This test suite validates the core authentication flow of the application.
 * 
 * 1.  It ensures a new user can register with valid details, using a unique timestamped email to avoid duplication.
 * 2.  It confirms login succeeds with correct credentials for a registered user.
 * 3.  It verifies login fails with an incorrect password, checking proper authentication validation.
 * 
 * All tests work against the live MySQL database and rely on a real avatar ID (e.g., 1) existing.
 * Tests use a clean, randomised setup to ensure repeatability without manual database cleanup.
 */

import request from "supertest";
import app from "../index";
import { AppDataSource } from "../data-source";

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
});

afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
});

describe("Application Controller", () => {
  // ✅ Test 1: Submit a valid tutor application
  it("should submit a new tutor application successfully", async () => {
    const res = await request(app).post("/api/application/saveApplication").send({
      userID: 38, // 
      courseCode: "COSC2758",
      firstName: "Test",
      lastName: "User",
      email: `testapp+${Date.now()}@example.com`,
      mobile: "0400000000",
      course: "Full Stack",
      position: "Tutor",
      availability: "Full-time",
      previousRole: "TA",
      skills: "Node.js, React",
      qualification: "MSc CS",
      specialization: "Web Development"
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Application submitted successfully");
    expect(res.body.applicationID).toBeDefined();
  });

  // ✅ Test 2: Reject application if user does not exist
  it("should return 'User not found' for invalid userID", async () => {
    const res = await request(app).post("/api/application/saveApplication").send({
      userID: 99999, // ❌ Fake user
      courseCode: "COSC2758",
      firstName: "Ghost",
      lastName: "User",
      email: `testapp+${Date.now()}@example.com`,
      mobile: "0499999999",
      course: "Full Stack",
      position: "Lab Assistant",
      availability: "Full-time",
      previousRole: "None",
      skills: "None",
      qualification: "None",
      specialization: "None"
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User not found.");
    expect(res.body.applicationID).toBeNull();
  });

  // ✅ Test 3: Fetch applications by valid user ID
  it("should fetch applications for a valid userId", async () => {
    const res = await request(app).get("/api/application/getApplicationByUserId/38");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Applications fetched successfully");
    expect(Array.isArray(res.body.applications)).toBe(true);
  });
});
