// Landing page of the Teaching Team app.
// Displays the main sections with navigation, content, and footer.

import React from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import MainContent from "../components/MainContent";
import Head from "next/head";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Head>
        {/* Page metadata */}
        <title>Teaching Team</title>
        <meta name="description" content="Landing Page of the Teaching Team" />
      </Head>

      {/* Fixed top navigation bar */}
      <Navigation />

      {/* Main content section */}
      <div className="flex flex-1">
        <MainContent />
      </div>

      {/* Footer section */}
      <Footer />
    </div>
  );
}
