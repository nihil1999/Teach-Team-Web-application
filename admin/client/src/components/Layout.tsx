// components/Layout.tsx

// Layout component: wraps all pages, displays a sidebar for logged-in admins, and renders page content
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // Controls whether the admin sidebar is visible
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();

  // Re-run on every navigation: check if admin is logged in and update sidebar visibility
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Read login flag from localStorage (string "true" means authenticated)
      const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
      setShowSidebar(isLoggedIn);
    }
  }, [router.pathname]);

  return (
    // Use flex layout to position sidebar alongside main content
    <Box display="flex" minHeight="100vh">
      {/* Sidebar rendered only when showSidebar is true */}
      {showSidebar && <Sidebar />}
      {/* Main content area that fills remaining space */}
      <Box flexGrow={1} p={3}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
