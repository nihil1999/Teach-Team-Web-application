//Course card is a component which is used in tutor dashboard page.
//This test case is to check if the course card is rendered correctly and checks the tutorApplicantState when the Apply Now button is clicked.
//This test case uses mock context.
import { render, screen, fireEvent } from "@testing-library/react";
import CourseCard from "@/components/CourseCard";

jest.mock("next/router", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("react-toastify", () => ({
  toast: { info: jest.fn() },
  ToastContainer: () => null,
}));

jest.mock("@/context/CourseContext", () => ({
  useCourse: () => ({
    currentSemesterCourses: [
      { course_code: "COSC1234", course_name: "Full Stack", role: "Tutor" },
    ],
  }),
}));

jest.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    currentUser: { email: "user@example.com" },
  }),
}));

beforeEach(() => {
  localStorage.clear();
});

test("renders course and handles apply now", () => {
  render(<CourseCard />);

  expect(screen.getByText(/COURSE CODE: COSC1234/i)).toBeInTheDocument();
  fireEvent.click(screen.getByText(/Apply Now/i));

  const state = JSON.parse(localStorage.getItem("tutorApplicationState") || "{}");
  expect(state.courseCode).toBe("COSC1234");
  expect(state.isApplying).toBe(true);
});
