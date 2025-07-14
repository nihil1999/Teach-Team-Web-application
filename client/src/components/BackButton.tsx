/**
 * BackButton Component
 * Renders a button that navigates the user to a specified route.
 * When the button label is "Dashboard", it clears the 
 * "tutorApplicationState" from localStorage before navigating it to tutor page.
 * When the button label is "Home", it navigate to home page.
 *
 * Props:
 *  - to: The destination URL/path for navigation.
 *  - label (optional): Text to display on the button (default is "Back").
 */

import React from "react";
import { useRouter } from "next/router";

// Define the props interface for the BackButton component.
interface BackButtonProps {
  to: string;       // Destination URL to navigate on click.
  label?: string;   // Optional label for the button, defaults to "Back".
}

const BackButton: React.FC<BackButtonProps> = ({ to, label = "Back" }) => {
  const router = useRouter();

  // Function to handle the click event on the button.
  // If the label is "Dashboard", clear the tutor application state.
  // Then, navigate to the target path.
  const handleClick = () => {
    if (label === "Dashboard") {
      localStorage.removeItem("tutorApplicationState");
    }
    router.push(to);
  };

  // Render the button with styling and attach the click handler.
  return (
    <button
      onClick={handleClick}
      className="bg-gray-800 text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-600 transition-all shadow-md"
    >
      ← {label}
    </button>
  );
};

export default BackButton;
