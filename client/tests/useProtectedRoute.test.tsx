//This test case is to check the custom hook - useProtectedRoute. Describe is used for grouping the test cases.
//Scenario 1: Ensures that if no user is logged in and tried to access other pages such as tutor, tutorApplicationForm or lecturer it will redirect to home page.
//Scenario 2: Ensures the role based access. For e.g: tutor page accessible if the role is tutor or vice versa.
//Scenario 3: Ensures that only tutor can access the tutor page if lecturer tries to access the tutor page it will redirect to lecturer page.
//Scenario 4: Ensures that only lecturer can access the lecturer page if tutor tries to access the lecturer page it will redirect to tutor dashboard page.

import { renderHook } from '@testing-library/react';
import { useProtectedRoute } from '../src/hooks/useProtectedRoutes';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

// Mocks
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('useProtectedRoute', () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    push.mockClear();
  });

  it('redirects to "/" if no user is logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({ currentUser: null });

    renderHook(() => useProtectedRoute("tutor"));
    expect(push).toHaveBeenCalledWith("/");
  });

  it('does not redirect if user has the expected role', () => {
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: { email: "abc@rmit.edu.au", role: "tutor" },
    });

    renderHook(() => useProtectedRoute("tutor"));
    expect(push).not.toHaveBeenCalled();
  });

  it('redirects lecturer to /lecturer when expected is tutor', () => {
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: { email: "lec@rmit.edu.au", role: "lecturer" },
    });

    renderHook(() => useProtectedRoute("tutor"));
    expect(push).toHaveBeenCalledWith("/lecturer");
  });

  it('redirects tutor to /tutor when expected is lecturer', () => {
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: { email: "tut@rmit.edu.au", role: "tutor" },
    });

    renderHook(() => useProtectedRoute("lecturer"));
    expect(push).toHaveBeenCalledWith("/tutor");
  });
});
