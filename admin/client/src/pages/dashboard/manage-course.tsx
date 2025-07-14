// src/components/ManageCourses.tsx

// ManageCourses component: allows admin to add, edit, delete and view courses with semester and position selections
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Stack,
  Paper,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { courseService } from "@/services/courseService";
import { Course } from "@/types/type";

const ManageCourses = () => {
  // State for list of courses fetched from the server
  const [courses, setCourses] = useState<Course[]>([]);
  // State for form inputs: course name and code
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  // ID of the course being edited; null means adding new
  const [editingId, setEditingId] = useState<number | null>(null);
  // Semester selection, default to "1"
  const [semester, setSemester] = useState<'1' | '2'>('1');
  // Available positions fetched from server for multi-select
  const [positions, setPositions] = useState<any[]>([]);
  // Selected position IDs for the course
  const [selectedPositions, setSelectedPositions] = useState<number[]>([]);

  // Fetch courses and log for debugging
  const fetchCourses = async () => {
    console.log("fetchCourses() start");
    try {
      const result = await courseService.getCourses();
      console.log("fetchCourses() success:", result);
      setCourses(result);
    } catch (err) {
      console.error("fetchCourses() error:", err);
      alert(`Failed to load courses. See console for details.`);
    }
  };

  // Handle form submission for adding or updating a course
  const handleSubmit = async () => {
    // Ensure all required fields are filled
    if (!courseName || !courseCode || !semester || selectedPositions.length === 0) {
      alert("All fields are required.");
      return;
    }

    try {
      if (editingId !== null) {
        // Update existing course with selected semester and positions
        await courseService.updateCourse(
          editingId,
          courseCode,
          courseName,
          Number(semester),
          selectedPositions
        );
        alert("Course updated.");
        setEditingId(null);
      } else {
        // Add a new course record
        await courseService.addCourse(
          courseCode,
          courseName,
          Number(semester),
          selectedPositions
        );
        alert("Course added.");
      }

      // Reset form fields and refresh course list
      setCourseName("");
      setCourseCode("");
      setSelectedPositions([]);
      await fetchCourses();
    } catch {
      alert("Operation failed.");
    }
  };

  // Delete a course by ID and refresh list
  const handleDelete = async (id: number) => {
    try {
      await courseService.deleteCourse(id);
      alert("Course deleted.");
      await fetchCourses();
    } catch {
      alert("Delete failed.");
    }
  };

  // Populate form for editing selected course
  const handleEdit = (course: Course) => {
    setEditingId(course.id);
    setCourseName(course.courseName);
    setCourseCode(course.courseCode);
    // Set semester and positions if present in course object
    setSemester(String(course.semester) as '1' | '2');
    setSelectedPositions(course.positions.map((pos) => pos.id));
  };

  // On initial mount: fetch courses and available positions
  useEffect(() => {
    fetchCourses();
    courseService.getPositions().then(setPositions);
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {/* Form container for adding or editing courses */}
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" gutterBottom>
          Manage Courses
        </Typography>

        <Stack spacing={3} mb={4}>
          {/* Semester radio buttons */}
          <FormControl>
            <RadioGroup
              row
              value={semester}
              onChange={(e) => setSemester(e.target.value as '1' | '2')}
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Semester 1"
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="Semester 2"
              />
            </RadioGroup>
          </FormControl>

          {/* Course name input */}
          <TextField
            label="Course Name"
            value={courseName}
            fullWidth
            onChange={(e) => setCourseName(e.target.value)}
          />

          {/* Course code input */}
          <TextField
            label="Course Code"
            value={courseCode}
            fullWidth
            onChange={(e) => setCourseCode(e.target.value)}
          />

          {/* Multi-select for positions */}
          <FormControl fullWidth>
            <InputLabel id="pos-label">Position(s)</InputLabel>
            <Select
              labelId="pos-label"
              multiple
              value={selectedPositions}
              label="Position(s)"
              onChange={(e) => setSelectedPositions(e.target.value as number[])}
            >
              {positions.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Submit button text changes based on add or edit mode */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            {editingId ? "Update Course" : "Add Course"}
          </Button>
        </Stack>
      </Paper>

      {/* List of existing courses with Edit and Delete actions */}
      <Box mt={5}>
        <Typography variant="h6" gutterBottom>
          Courses
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {courses.length > 0 ? (
          courses.map((course) => (
            <Paper
              key={course.id}
              elevation={1}
              sx={{
                p: 2,
                mb: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* Display course details */}
              <Box>
                <Typography fontWeight="bold">
                  {course.courseName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.courseCode}
                </Typography>
              </Box>

              {/* Buttons for editing or deleting this course */}
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleEdit(course)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(course.id)}
                >
                  Delete
                </Button>
              </Stack>
            </Paper>
          ))
        ) : (
          <Typography>No courses found.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default ManageCourses;
