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

describe("Auth Controller", () => {
  // ✅ Generate a unique email for every test run
  const timestamp = Date.now();
  const testEmail = `testuser+${timestamp}@example.com`;
  const testPassword = "TestPass123!";

  // ✅ 1. Register a new user
  it("should register a new user successfully", async () => {
    const res = await request(app).post("/api/auth/register").send({
      firstName: "Test",
      lastName: "User",
      email: testEmail,
      password: testPassword,
      role: "candidate",
      avatar_id: 1, // ensure this avatar ID exists
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
    expect(res.body.user).toBeDefined();
    expect(res.body.user.email).toBe(testEmail);
  });

  // ✅ 2. Login with correct credentials
  it("should login with valid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testEmail,
      password: testPassword,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Login successful");
    expect(res.body.user).toBeDefined();
  });

  // ✅ 3. Reject login with wrong password
  it("should reject login with incorrect password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testEmail,
      password: "WrongPass999!",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Invalid email or password.");
    expect(res.body.user).toBeNull();
  });
});
