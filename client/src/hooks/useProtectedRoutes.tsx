// Custom hook to protect routes based on user role.
// Redirects users if not authenticated or if role doesn’t match expected.

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

export function useProtectedRoute(expectedRole: "candidate" | "lecturer") {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to home if not logged in
    if (currentUser === null) {
      router.push("/");
      return;
    }
    console.log('current user:', currentUser);
    // Redirect to appropriate page if role doesn't match
    if (currentUser.role !== expectedRole) {
      if (currentUser.role === "lecturer")
        router.push("/lecturer");
      else if (currentUser.role === "candidate")
        router.push("/tutor");
      else
        router.push("/");
    }
  }, [currentUser, expectedRole, router]);
}
