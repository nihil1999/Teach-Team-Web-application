# s4001201-s4011610-a1
Teaching_Team - WebApplication

This project is a client-side prototype for the Teaching Team system a web application developed to streamline the tutor hiring process. The application prototype is built with Next.js, React,Tailwind CSS and TypeScript. It uses HTML5 localStorage to persist data and includes role-based functionality for both tutors and lecturers.

Installation & Setup

1.	Clone the Repository:
git clone https://github.com/rmit-fsd-2025-s1/s4001201-s4011610-a1

     cd s4001201-s4011610-a1

2.	Install Dependencies:

  	npm install

3.	Run the Development Server:

    npm run dev
  	
    Then open http://localhost:3000 in your browser.

4. Run the test files:

     npm test

5.	Clear LocalStorage (if needed):

    If you've updated dummy data or application structures, clear localStorage using DevTools or        localStorage.clear() in the console.

Pre-Populated data:

Users & Course list are pre-populated that is while starting the web app it will first load the users and courses in the local storage.

Tutor Applications are not pre-populated.

Features

•	User Authentication & Role-Based Access:

   Sign-in for both lecturers and tutors with role-based access.

   Google reCAPTCHA integrated on the Sign-In page for added security (test key used for   
   development).

•	Tutor Application:

   Tutors submit and update applications via a dedicated form.

   Each application is uniquely identified with a generated applicationId.

•	Lecturer Dashboard:

   View, search, and filter submitted tutor applications.

   Select candidates with a ranking system (Top Choice, Strong Candidate, Can Be Considered) plus an optional comment.

   Inline validation ensures that at least one field is provided before submission.

   Aggregated selection statistics are presented via a bar chart.

•	Course Overview:

   A CourseCard component lists available courses with an “Apply Now” option.

• Visual Overview:

   A bar chart displays statistics for most selected, least selected, and unselected applicants.

•	Reusable Components:

   Consistent UI elements such as Navigation, BackButton, and Footer, Course Card, Submitted Applications.

Project Structure:

├── components/ – UI components (BackButton, CourseCard, Navigation, etc.)

├── context/ – Context providers (AuthContext, CourseContext, etc.)

├── hooks/ – Custom hooks (useProtectedRoute, useSelectionStats, etc.)

├── pages/ – Routes (index.tsx, signIn.tsx, signUp.tsx, lecturer.tsx, tutor.tsx, tutorApplicationForm.tsx)

├── public/ – Static assets (images, icons)

├── tests/ – Unit tests for components and hooks

├── package.json – Project configuration and dependencies

└── README.md – Project documentation

Testing:

 The project uses Jest with React Testing Library (and React Hooks Testing Library) for unit 
 testing.  

References:

React Toastify – https://github.com/fkhadra/react-toastify | https://fkhadra.github.io/react-toastify/introduction/

React Google ReCAPTCHA – https://github.com/dozoisch/react-google-recaptcha

Test site key used: 6LeUnRYrAAAAAKlS1w5zmifC44piJp2V4lKafD36

Next.js – https://nextjs.org/docs

TypeScript – https://www.typescriptlang.org/docs/

LocalStorage API – https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

Tailwind CSS - https://tailwindcss.com/docs
