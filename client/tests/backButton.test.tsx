//This test case is to check the functionality of back button. Back Button is a component which is used in tutor Application form page and sign in page.
//Scenario 1:  On the tutor application form page - ensures that clicking the Dashboard (Back Button) will redirect to tutor page (Tutor Dashboard).
//Scenario 2: On the sign Pgae -  ensures that clicking the Home (Back button) will redirect to Home/Landing page.

import { render, screen, fireEvent } from "@testing-library/react";
import BackButton from "@/components/BackButton";

const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => ({ push: mockPush }),
}));

beforeEach(() => {
  localStorage.clear();
});

test("navigates to tutor dashboard page and clears tutorApplicationState if label is Dashboard. This back button is for Tutor application form", () => {
  localStorage.setItem("tutorApplicationState", "dummy");
  render(<BackButton to="/tutor" label="Dashboard" />);
  
  fireEvent.click(screen.getByText(/Dashboard/i));
  
  expect(localStorage.getItem("tutorApplicationState")).toBeNull();
  expect(mockPush).toHaveBeenCalledWith("/tutor");
});

test("navigates to Home Page without clearing the state if label is Home. This back button is for sign in page", () => {
  localStorage.setItem("tutorApplicationState", "dummy");
  render(<BackButton to="/home" label="Home" />);
  
  fireEvent.click(screen.getByText(/Home/i));
  
  expect(localStorage.getItem("tutorApplicationState")).toBe("dummy");
  expect(mockPush).toHaveBeenCalledWith("/home");
});
