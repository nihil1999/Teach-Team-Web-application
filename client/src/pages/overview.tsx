/**
 * This page displays visual statistics related to tutor selection using a dedicated component called `DashboardView`.
 * The statistics are fetched from the backend via the custom hook `useSelectionStatsFromAPI`, which retrieves
 * aggregated selection data stored in the MySQL database. This data may include counts such as the number of applicants
 * selected, top-ranked candidates, or course-wise selection breakdowns. By abstracting this into `DashboardView`,
 * we isolate the visual representation layer, allowing for clean rendering of charts, tables, or summary boxes
 * depending on the data. This approach follows good software engineering practice by separating business logic
 * (data fetching and access control) from presentation logic (data display), and enables future scalability—
 * such as plugging in new chart libraries or updating visual layouts—without affecting the underlying logic.
 */

// pages/overview.tsx
import Head from "next/head";
import { useRouter } from "next/router";
import Navigation from "@/components/Navigation";
import DashboardView from "@/components/DashboardView";
import { useSelectionStatsFromAPI } from "@/hooks/useSelectionStats";
import { useProtectedRoute } from "@/hooks/useProtectedRoutes";

const OverviewPage = () => {
  useProtectedRoute("lecturer");
  const stats = useSelectionStatsFromAPI();
  const router = useRouter();

  const handleBack = () => {
    router.push("/lecturer"); // Always go to Lecturer dashboard
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-10 font-poppins">
      <Head>
        <title>Selection Overview - Teaching Team</title>
      </Head>
      <Navigation showSignOut={true} />

      <div className="max-w-5xl mx-auto px-4 space-y-6">
        <button
          onClick={handleBack}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          ← Back to Lecturer Dashboard
        </button>

        <section className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Selection Overview
          </h3>
          <DashboardView data={stats} />
        </section>
      </div>
    </div>
  );
};

export default OverviewPage;
