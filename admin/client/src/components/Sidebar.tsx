// components/Sidebar.tsx

// Sidebar component: provides navigation links and a logout button for admin users
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Toolbar,
  Divider,
  Button,
} from "@mui/material";

const Sidebar = () => {
  // Next.js router for redirecting after logout
  const router = useRouter();

  // Clears admin login state and sends user back to the login page
  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    router.push("/");
  };

  return (
    // Permanent Drawer anchored to the left side
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 250,
        flexShrink: 0,
        [
          `& .MuiDrawer-paper`
        ]: {
          width: 250,
          boxSizing: "border-box",
          bgcolor: "#374151", // dark background for admin menu
          color: "#fff",       // white text for contrast
        },
      }}
    >
      {/* Toolbar used to align the header correctly within the drawer */}
      <Toolbar>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          {/* Sidebar title */}
          <Typography variant="h5" noWrap>
            Admin Menu
          </Typography>
        </Box>
      </Toolbar>

      <Divider />

      {/* Navigation list for different admin actions */}
      <List>
        {/* Link to Manage Courses page */}
        <Link href="/dashboard/manage-course" passHref legacyBehavior>
          <ListItemButton
            component="a"
            sx={{
              "&:hover": { bgcolor: "#4b5563" } // hover effect
            }}
          >
            <ListItemText primary="Manage Courses" />
          </ListItemButton>
        </Link>

        {/* Link to Assign Lecturer page */}
        <Link href="/dashboard/assign-lecturer" passHref legacyBehavior>
          <ListItemButton
            component="a"
            sx={{
              "&:hover": { bgcolor: "#4b5563" }
            }}
          >
            <ListItemText primary="Assign Lecturer" />
          </ListItemButton>
        </Link>

        {/* Link to Block Candidate page */}
        <Link href="/dashboard/manage-candidate" passHref legacyBehavior>
          <ListItemButton
            component="a"
            sx={{
              "&:hover": { bgcolor: "#4b5563" }
            }}
          >
            <ListItemText primary="Block Candidate" />
          </ListItemButton>
        </Link>

        {/* Link to Reports page */}
        <Link href="/dashboard/report" passHref legacyBehavior>
          <ListItemButton
            component="a"
            sx={{
              "&:hover": { bgcolor: "#4b5563" }
            }}
          >
            <ListItemText primary="Reports" />
          </ListItemButton>
        </Link>
      </List>

      {/* Logout button at the bottom of the drawer */}
      <Button
        variant="outlined"
        color="error"
        size="small"
        onClick={handleLogout}
        sx={{ margin: 2 }}
      >
        Logout
      </Button>
    </Drawer>
  );
};

export default Sidebar;
