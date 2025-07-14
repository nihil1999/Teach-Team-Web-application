// MainContent component for the landing page.
// Displays the Home and About sections with informative visuals and descriptions.

import React from "react";

const MainContent = () => {
  return (
    <main className="p-6 bg-white shadow rounded font-poppins mt-20">

      {/* Home Section */}
      <section id="home" className="mb-20 scroll-mt-30">
        <h2 className="text-3xl font-bold text-gray-600 mb-6">Welcome to Teaching Team</h2>
        
        <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-100 p-6 rounded-lg shadow">
          {/* Left: Introductory image */}
          <div className="w-full md:w-1/2">
            <img src="/images/momo1.jpg" alt="Home" className="rounded-lg shadow-lg w-full" />
          </div>

          {/* Right: Welcome text content */}
          <div className="w-full md:w-1/2 text-center">
            <h3 className="text-2xl font-semibold text-indigo-800 mb-4">Designed for RMIT Tutors and Lecturers</h3>
            <p className="text-lg text-gray-800 leading-relaxed">
              Teaching Team is a streamlined platform tailored for RMIT’s academic community. Aspiring tutors and lab assistants can
              easily submit their applications, showcasing their skills, availability, and academic background. All applications are structured
              to align with current semester courses, ensuring a smooth and relevant matching process.
              <br /><br />
              For lecturers, Teaching Team provides a centralized dashboard to review candidates, filter by course or availability,
              and select the most suitable applicants for your teaching team. From application to selection — the process is entirely online, efficient, and paperless.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="mb-12 scroll-mt-20">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">About Us</h2>

        <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-100 p-6 rounded-lg shadow">
          {/* Left: About section text content */}
          <div className="w-full md:w-1/2 text-center">
            <h3 className="text-2xl font-semibold text-indigo-800 mb-4">Our Vision for the Future</h3>
            <p className="text-lg text-gray-800 leading-relaxed">
              This system is developed as part of the Teaching Team (TT) initiative at RMIT, with a focus on client-side performance and
              accessibility. Using modern web technologies and a clean interface, the platform eliminates the need for manual processing or complex databases.
              <br /><br />
              Tutors can apply for roles in various courses, while lecturers have full visibility over candidate experience and qualifications.
              All data is handled securely through local browser storage, and the platform is fully responsive across devices — from desktop to mobile.
            </p>
          </div>

          {/* Right: About section image */}
          <div className="w-full md:w-1/2">
            <img src="/images/momo2.jpg" alt="About" className="rounded-lg shadow-lg w-full" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainContent;
