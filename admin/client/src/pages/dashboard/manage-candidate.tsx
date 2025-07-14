// src/components/manage-candidates.tsx

// ManageCandidates component: lists candidate users and allows blocking/unblocking
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper
} from "@mui/material";
import { userService } from "@/services/userService";
import { User } from "@/types/type";

const ManageCandidates = () => {
  // State to hold the list of candidate users
  const [candidates, setCandidates] = useState<User[]>([]);

  // Fetch all users and filter to only those with role "candidate"
  const fetchCandidates = async () => {
    try {
      const users = await userService.getAllUsers();
      const filtered = users.filter((u) => u.role === "candidate");
      setCandidates(filtered);
    } catch {
      // Notify user if fetching fails
      alert("Failed to fetch users");
    }
  };

  // Toggle block status for a given candidate
  const toggleBlock = async (userId: number, isBlocked: boolean) => {
    try {
      if (isBlocked) {
        // Unblock candidate if currently blocked
        await userService.unblockUser(userId);
        alert("Candidate unblocked");
      } else {
        // Block candidate if currently active
        await userService.blockUser(userId);
        alert("Candidate blocked");
      }
      // Refresh the list to reflect updated status
      fetchCandidates();
    } catch {
      // Notify user of failure
      alert("Action failed");
    }
  };

  // Load candidates when component mounts
  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    // Main container with padding and max width
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Elevated paper container for the table */}
      <Paper elevation={3} sx={{ padding: 3 }}>
        {/* Page heading */}
        <Typography variant="h5" gutterBottom>
          Manage Candidates
        </Typography>

        {/* Table displaying candidate details and actions */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map((user) => (
              <TableRow key={user.id}>
                {/* Display candidate's full name */}
                <TableCell>{user.firstName} {user.lastName}</TableCell>
                {/* Display candidate's email address */}
                <TableCell>{user.email}</TableCell>
                {/* Show whether candidate is blocked or active */}
                <TableCell>{user.isBlocked ? "Blocked" : "Active"}</TableCell>
                {/* Button to block or unblock the candidate */}
                <TableCell>
                  <Button
                    variant="contained"
                    color={user.isBlocked ? "success" : "error"}
                    onClick={() => toggleBlock(user.id, user.isBlocked)}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default ManageCandidates;
