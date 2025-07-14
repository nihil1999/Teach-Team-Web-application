//This test case is for useSelectionStats a custom hook used to calculate most, least and unselected applicant.
//Scenario 1: Ensures the calculation of most, least and unselected applicant with count and names.
//Scenario 2: Ensuring stats for empty list of selection applicants.
//Scenario 3: Ensuring changes reflecting in the storage such as new applicant selected.

import { renderHook, act } from "@testing-library/react";
import { useSelectionStats } from "../src/hooks/useSelectionStats";

// Helper to populate localStorage
function setupLocalStorage() {
  const tutorApplications = {
    "COSC1234_alice@email.com": {
      FormDetails: { firstName: "Alice", lastName: "Smith" },
    },
    "COSC1234_bob@email.com": {
      FormDetails: { firstName: "Bob", lastName: "Jones" },
    },
    "COSC1234_carol@email.com": {
      FormDetails: { firstName: "Carol", lastName: "White" },
    },
  };

  const lecturerSelections1 = [
    { applicationId: "COSC1234_alice@email.com" },
    { applicationId: "COSC1234_bob@email.com" },
  ];

  const lecturerSelections2 = [
    { applicationId: "COSC1234_alice@email.com" },
  ];

  localStorage.setItem("tutorApplications", JSON.stringify(tutorApplications));
  localStorage.setItem("lecturer_john_selectedApplicants", JSON.stringify(lecturerSelections1));
  localStorage.setItem("lecturer_jane_selectedApplicants", JSON.stringify(lecturerSelections2));
}

describe("useSelectionStats", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("correctly calculates most, least, and unselected applicants", () => {
    setupLocalStorage();

    const { result } = renderHook(() => useSelectionStats());

    // Most selected = Alice (2)
    expect(result.current.mostSelectedNames).toContain("Alice Smith");
    expect(result.current.mostSelectedCount).toBe(2);

    // Least selected = Bob (1)
    expect(result.current.leastSelectedNames).toContain("Bob Jones");
    expect(result.current.leastSelectedCount).toBe(1);

    // Unselected = Carol
    expect(result.current.unselected).toContain("Carol White");
  });

  it("handles case when no selections exist", () => {
    // only tutorApplications, no lecturer selections
    const tutorsOnly = {
      "COSC1234_a@email.com": { FormDetails: { firstName: "A", lastName: "One" } },
      "COSC1234_b@email.com": { FormDetails: { firstName: "B", lastName: "Two" } },
    };
    localStorage.setItem("tutorApplications", JSON.stringify(tutorsOnly));

    const { result } = renderHook(() => useSelectionStats());

    expect(result.current.mostSelectedCount).toBe(0);
    expect(result.current.leastSelectedNames).toEqual([]);
    expect(result.current.mostSelectedCount).toBe(0);
    expect(result.current.leastSelectedCount).toBe(0);
    expect(result.current.unselected).toEqual(["A One", "B Two"]);
  });

  it("responds to 'storage' event", () => {
    setupLocalStorage();
    const { result } = renderHook(() => useSelectionStats());

    // simulate a new selection
    const lecturerNew = [
      { applicationId: "COSC1234_carol@email.com" },
    ];
    act(() => {
      localStorage.setItem("lecturer_kim_selectedApplicants", JSON.stringify(lecturerNew));
      window.dispatchEvent(new Event("storage"));
    });

    // Carol should no longer be unselected
    expect(result.current.unselected).not.toContain("Carol White");
  });
});
