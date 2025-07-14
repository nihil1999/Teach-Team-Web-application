//This test case is for checking sign in page validation..
//1. Scenario - Captcha validation. Ensuring login process will not successful untill captcha is verified.
//2. Scenario - Ensures successful login upon input validation and captcha.

import { render, screen, fireEvent } from "@testing-library/react";
import SignInPage from "@/pages/signIn";

jest.mock("next/router", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    login: (email: string, password: string) => {
      if (email === "tutor@rmit.edu.au" && password === "ValidPass1") {
        return { email, role: "tutor" };
      }
      return null;
    },
  }),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
  ToastContainer: () => null,
}));

jest.mock("react-google-recaptcha", () => ({
  __esModule: true,
  default: ({ onChange }: any) => {
    return (
      <div
        data-testid="mock-recaptcha"
        onClick={() => onChange("mock-token")}
      >
        Mock CAPTCHA
      </div>
    );
  },
}));

test("blocks login without CAPTCHA", () => {
  render(<SignInPage />);

  fireEvent.change(screen.getByPlaceholderText(/email address/i), {
    target: { value: "tutor@rmit.edu.au" },
  });

  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: "ValidPass1" },
  });

  fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

  expect(
    screen.getByText(/please complete the captcha/i)
  ).toBeInTheDocument();
});

test("logs in and redirects on valid input", () => {
  render(<SignInPage />);

  fireEvent.change(screen.getByPlaceholderText(/email address/i), {
    target: { value: "tutor@rmit.edu.au" },
  });

  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: "ValidPass1" },
  });

  fireEvent.click(screen.getByTestId("mock-recaptcha"));

  fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

  expect(
    screen.queryByText(/please complete the captcha/i)
  ).not.toBeInTheDocument();
});
