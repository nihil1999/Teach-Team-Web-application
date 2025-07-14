// components/ProfileMenu.tsx
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

const ProfileMenu: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { currentUser } = useAuth();
  const router = useRouter();

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleEditProfile = () => {
    router.push("/editProfile");
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="focus:outline-none">
        <img
          src={currentUser?.avatar?.avatarUrl || "/images/default_profile.svg"}
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-white"
        />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-50">
          <div className="px-4 py-2 text-gray-700 font-semibold border-b">
            {currentUser?.firstName} {currentUser?.lastName}
          </div>
          <button
            onClick={handleEditProfile}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            View Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
