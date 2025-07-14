// src/components/RankedAppList.tsx

// RankedAppList component: generates admin reports based on tutor application rankings
import { useEffect, useState } from "react";
import { applicationService } from "@/services/rankService";
import { TutorApplication } from "@/types/type";

const RankedAppList = () => {
  // State to hold ranked applications fetched from the API
  const [applications, setApplications] = useState<TutorApplication[]>([]);
  // State to hold all applications for identifying unchosen candidates
  const [allApplicants, setAllApplicants] = useState<TutorApplication[]>([]);

  // Fetch ranked and all applications once when component mounts
  useEffect(() => {
    const fetchData = async () => {
      // Retrieve list of accepted (ranked) applications
      const ranked = await applicationService.getAllRankedApplications();
      setApplications(ranked);

      // Retrieve complete list of applications for comparison
      const all = await applicationService.getAllApplications();
      setAllApplicants(all);
    };

    fetchData();
  }, []);

  // 1. Group candidates by course code without duplicates
  const groupedByCourse: Record<string, TutorApplication[]> = {};
  applications.forEach(app => {
    const course = app.courseCode;
    if (!groupedByCourse[course]) groupedByCourse[course] = [];

    // Ensure each applicant appears only once per course
    const alreadyAdded = groupedByCourse[course].some(a => a.email === app.email);
    if (!alreadyAdded) {
      groupedByCourse[course].push(app);
    }
  });

  // 2. Identify candidates chosen for more than three courses
  const countByEmail: Record<string, number> = {};
  applications.forEach(app => {
    countByEmail[app.email] = (countByEmail[app.email] || 0) + 1;
  });
  const moreThanThree = [
    // Get unique emails for candidates with count > 3
    ...new Set(
      applications
        .filter(app => countByEmail[app.email] > 3)
        .map(a => a.email)
    )
  ];

  // 3. Determine candidates not chosen for any course
  // Create a list of unique all-applicants by email
  const uniqueAllApplicants = Array.from(
    new Map(allApplicants.map(app => [app.email, app])).values()
  );
  // Filter out any applicants who appear in the ranked list
  const unchosen = uniqueAllApplicants.filter(
    a => !applications.some(r => r.applicationID === a.applicationID)
  );

  return (
    <div>
      <h2>Admin Reports</h2>

      {/* Report 1: List of candidates per course */}
      <h3>1. Candidates Chosen for Each Course</h3>
      {Object.entries(groupedByCourse).map(([courseCode, apps]) => (
        <div key={courseCode}>
          <strong>
            {apps[0]?.course} ({courseCode})
          </strong>
          <ul>
            {apps.map(app => (
              <li key={app.applicationID}>
                {app.firstName} {app.lastName}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Report 2: Candidates chosen for more than three courses */}
      <h3>2. Candidates Chosen for More Than 3 Courses</h3>
      <ul>
        {moreThanThree.map(email => {
          // Use the first occurrence to display name
          const sample = applications.find(a => a.email === email)!;
          return (
            <li key={email}>
              {sample.firstName} {sample.lastName}
            </li>
          );
        })}
      </ul>

      {/* Report 3: Candidates not chosen for any course */}
      <h3>3. Candidates Not Chosen for Any Course</h3>
      <ul>
        {unchosen.map(app => (
          <li key={app.applicationID}>
            {app.firstName} {app.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankedAppList;
