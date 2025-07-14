// Footer component for the Teaching Team website.
// Displays copyright info and links to policy pages.

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 w-full">
      <div className="container mx-auto px-4 text-center">
        {/* Site copyright */}
        <div>© Teaching Team. All rights reserved.</div>

        {/* Footer navigation links */}
        <div className="flex justify-center space-x-6 mt-2 text-sm">
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
          <span className="hover:underline cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
