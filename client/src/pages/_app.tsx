// Root component for the Teaching Team app.
// Wraps the entire app with Auth and Course context providers.

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import { CourseProvider } from "@/context/CourseContext";
import { ApplicationProvider } from "@/context/ApplicationContext";
import { LecturerProvider } from "@/context/LecturerContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // Provide authentication context to the entire app
    <AuthProvider>
      {/* Provide course data context to the entire app */}
      <CourseProvider>
        <LecturerProvider>
        <ApplicationProvider>
        <Component {...pageProps} />
        </ApplicationProvider>
        </LecturerProvider>
      </CourseProvider>
    </AuthProvider>
  );
}
