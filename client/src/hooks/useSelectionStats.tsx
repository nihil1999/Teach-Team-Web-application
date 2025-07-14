import { useState, useEffect } from "react";
import { userApi } from "@/services/api"; // Update path as needed

type Stats = {
  mostSelectedNames: string[];
  mostSelectedCount: number;
  leastSelectedNames: string[];
  leastSelectedCount: number;
  unselected: string[];
};

export function useSelectionStatsFromAPI() {
  const [stats, setStats] = useState<Stats>({
    mostSelectedNames: [],
    mostSelectedCount: 0,
    leastSelectedNames: [],
    leastSelectedCount: 0,
    unselected: [],
  });

  useEffect(() => {
    async function calculateStats() {
      try {
        // Fetch both all and selected applications from API
        const { allApplications: allApps } = await userApi.getAllTutorApplications();
        const { applications: selectedApps } = await userApi.getSelectedTutorApplications();
        console.log('All apps', allApps);
        console.log('selected apps', selectedApps);
        const allEmails = new Set(allApps.map((app: any) => app.email));
        const emailToName = new Map(allApps.map((app: any) => [app.email, `${app.firstName} ${app.lastName}`]));

        // Count selections
        const selectionCounts: Record<string, number> = {};
        selectedApps.forEach((app: any) => {
          const email = app.email;
          selectionCounts[email] = (selectionCounts[email] || 0) + 1;
        });

        // Determine most and least selected
        let highestCount = 0;
        let lowestCount = Infinity;
        const mostSelected: string[] = [];
        const leastSelected: string[] = [];

        for (const email of allEmails) {
          const count = selectionCounts[email] || 0;
          const name = emailToName.get(email)!;

          if (count > highestCount) {
            highestCount = count;
            mostSelected.length = 0;
            mostSelected.push(name);
          } else if (count === highestCount && count > 0) {
            mostSelected.push(name);
          }

          if (count > 0 && count < lowestCount) {
            lowestCount = count;
            leastSelected.length = 0;
            leastSelected.push(name);
          } else if (count === lowestCount && count > 0) {
            leastSelected.push(name);
          }
        }

        // Unselected applicants
        const selectedEmails = new Set(selectedApps.map((a: any) => a.email));
        const unselected = Array.from(allEmails).filter(email => !selectedEmails.has(email)).map(email => emailToName.get(email)!);

        setStats({
          mostSelectedNames: mostSelected,
          mostSelectedCount: highestCount,
          leastSelectedNames: leastSelected,
          leastSelectedCount: lowestCount === Infinity ? 0 : lowestCount,
          unselected,
        });

      } catch (err) {
        console.error("Failed to calculate selection stats:", err);
      }
    }

    calculateStats();
  }, []);

  return stats;
}
