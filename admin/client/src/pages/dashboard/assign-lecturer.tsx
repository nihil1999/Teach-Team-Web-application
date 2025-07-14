// src/components/assign-lecturer.tsx

// AssignLecturer component: allows admin to assign a lecturer to a specific course and semester
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Paper,
  Grid,
  Divider,
} from "@mui/material";
import { courseService } from "@/services/courseService";
import { userService } from "@/services/userService";
import { Course, LecturerCourseAssignment, User } from "@/types/type";

const AssignLecturer = () => {
  // --- state: lists of lecturers, courses, and existing assignments, plus selected values ---
  const [lecturers, setLecturers] = useState<User[]>([]);
  const [semester, setSemester] = useState<number | "">("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<LecturerCourseAssignment[]>([]);
  const [selectedLecturerId, setSelectedLecturerId] = useState<number | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  // --- load lecturers and current assignments once when component mounts ---
  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const users = await userService.getAllUsers();
        // filter only users with role "lecturer"
        setLecturers(users.filter((u) => u.role === "lecturer"));
      } catch {
        alert("Failed to load lecturers.");
      }
    };

    const fetchAssignments = async () => {
      try {
        const data = await courseService.getAllAssignedLecturers();
        setAssignments(data);
      } catch {
        alert("Failed to load assignments.");
      }
    };

    fetchLecturers();
    fetchAssignments();
  }, []);

  // --- reload course list whenever the selected semester changes ---
  useEffect(() => {
    if (semester) {
      const fetchCourses = async () => {
        try {
          const courseList = await courseService.getCourses();
          // optionally filter by semester if API supports it
          setCourses(courseList);
        } catch {
          alert("Failed to load courses for selected semester.");
        }
      };
      fetchCourses();
    } else {
      // clear courses if no semester selected
      setCourses([]);
    }
  }, [semester]);

  // --- handle the "Assign Lecturer" button click ---
  const handleAssign = async () => {
    // all fields must be selected before assigning
    if (!selectedLecturerId || !selectedCourseId || !semester) {
      alert("All fields are required.");
      return;
    }

    try {
      // call service to create assignment record
      await courseService.assignLecturerToCourse(
        selectedLecturerId,
        selectedCourseId,
        semester as number
      );
      alert("Lecturer assigned successfully!");

      // reset form inputs after successful assignment
      setSelectedLecturerId(null);
      setSelectedCourseId(null);
      setSemester("");

      // refresh assignment list to include the new entry
      const data = await courseService.getAllAssignedLecturers();
      setAssignments(data);
    } catch (error) {
      console.error("Assignment failed:", error);
      alert("Assignment failed.");
    }
  };

  return (
    // main container for the form and assignment list
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Form for assigning a lecturer to a course */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Assign Lecturer to Course
        </Typography>
        <Grid container spacing={3} direction="column">
          {/* Lecturer dropdown */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Lecturer</InputLabel>
              <Select
                value={selectedLecturerId ?? ""}
                label="Lecturer"
                onChange={(e) => setSelectedLecturerId(Number(e.target.value))}
              >
                {lecturers.map((lecturer) => (
                  <MenuItem key={lecturer.id} value={lecturer.id}>
                    {lecturer.firstName} {lecturer.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Semester selector */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Semester</InputLabel>
              <Select
                value={semester}
                label="Semester"
                onChange={(e) => setSemester(e.target.value as number)}
              >
                <MenuItem value="">Select semester</MenuItem>
                <MenuItem value={1}>Semester 1</MenuItem>
                <MenuItem value={2}>Semester 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Course dropdown */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Course</InputLabel>
              <Select
                value={selectedCourseId ?? ""}
                label="Course"
                onChange={(e) => setSelectedCourseId(Number(e.target.value))}
              >
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.courseName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Assign button */}
          <Grid item xs={12}>
            <Button variant="contained" fullWidth onClick={handleAssign}>
              Assign Lecturer
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Display list of current assignments below the form */}
      <Box mt={6}>
        <Typography variant="h6" gutterBottom>
          Current Assignments
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {assignments.map((a) => (
          <Paper
            key={a.id}
            elevation={1}
            sx={{ mb: 2, p: 2, borderLeft: "4px solid #3F4C5E" }}
          >
            <Typography>
              <strong>Lecturer:</strong> {a.lecturer.firstName} {a.lecturer.lastName}
            </Typography>
            <Typography>
              <strong>Course:</strong> {a.course.courseName}
            </Typography>
            <Typography>
              <strong>Semester:</strong> {a.semester}
            </Typography>
          </Paper>
        ))}

        {/* Show message when no assignments are available */}
        {assignments.length === 0 && (
          <Typography color="text.secondary">No assignments found.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default AssignLecturer;
