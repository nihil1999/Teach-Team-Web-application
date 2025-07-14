// pages/index.tsx

// Admin Login page: handles authentication and redirects to the course management dashboard
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper
} from "@mui/material";

export default function Login() {
  // Next.js router for programmatic navigation after login
  const router = useRouter();

  // Local state for the email and password input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Called when the user clicks the Login button
  const handleLogin = () => {
    // Persist login flag in localStorage (in a real app, use secure authentication)
    localStorage.setItem("isAdminLoggedIn", "true");

    // Simple client‑side check for demo purposes
    if (email === 'admin' && password === 'admin') {
      // Redirect authenticated admin to the manage-course dashboard
      router.push('/dashboard/manage-course');
    } else {
      // Alert user of invalid credentials
      alert('Invalid credentials');
    }
  };

  return (
    // Center the form on the page with a maximum width
    <Container maxWidth="sm" sx={{ mt: 12 }}>
      {/* Elevated paper container for the login form */}
      <Paper elevation={3} sx={{ padding: 4 }}>
        {/* Page heading */}
        <Typography variant="h5" align="center" gutterBottom>
          Admin Login
        </Typography>

        {/* Form wrapper: disables native validation and autoComplete */}
        <Box component="form" noValidate autoComplete="off">
          {/* Email input field: controlled component bound to `email` state */}
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password input field: hides characters and binds to `password` state */}
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Login button: triggers handleLogin when clicked */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
