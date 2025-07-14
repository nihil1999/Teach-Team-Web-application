/*
  This Edit Profile page was implemented using React with TypeScript and integrates form handling, user state management,
  and backend API communication. Upon component load, it retrieves the current user's data from localStorage and fetches a
  list of available avatars from the backend. The form fields are prefilled with the user's existing data and are disabled
  by default until the "Edit Profile" button is clicked. Users can update their personal details, choose a new avatar, and 
  optionally change their password. The updated information is submitted to the backend via an API call using Axios. Upon a
  successful update, the new data is saved in localStorage and globally via context, and the user is redirected to a page 
  based on their role. The UI is styled with Tailwind CSS, ensuring a responsive and accessible design, while toast 
  notifications provide feedback on success or errors. This structure supports good separation of concerns, scalability, 
  and maintainability.
*/
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { User } from "@/types/User";
import { Avatar } from "@/types/Avatar";
import { userApi } from "@/services/api";
import Navigation from "@/components/Navigation";
import { UpdateUserRequest } from "@/types/User";
import { useAuth } from "@/context/AuthContext";


const EditProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const {setCurrentUser} = useAuth();

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("tutor");
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);

  useEffect(() => {
    const fetchUserAndAvatars = async () => {
      // simulate current user fetch from localStorage or API
      const storedUser = JSON.parse(localStorage.getItem("CurrentUser") || "null");
      if (!storedUser) return;

      const avatarList = await userApi.getAvatar();
      setAvatars(avatarList.avatars);

      setUser(storedUser);
      setFirstName(storedUser.firstName);
      setLastName(storedUser.lastName);
      setEmail(storedUser.email);
      setRole(storedUser.role);
      setSelectedAvatar(storedUser.avatar);
    };

    fetchUserAndAvatars();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
     console.log("Update form submitted"); // Add this

     // Place this right below it:
  console.log(" Payload to update:", {
    firstName,
    lastName,
    email,
    role,
    avatarId: selectedAvatar?.avatarId,
    password,
  });

    setLoading(true);

    try {
     if (!selectedAvatar) {
  toast.error("Please select an avatar.");
  setLoading(false);
  return;
} 
    const updatedUser: UpdateUserRequest = {
  firstName,
  lastName,
  email,
  role,
  avatar_id: selectedAvatar?.avatarId!,
};

if (password.trim() !== "") {
  updatedUser.password = password;
}

const response = await userApi.updateUser(user!.userId, updatedUser);

toast.success("Profile updated!");
localStorage.setItem("CurrentUser", JSON.stringify(response.user));
setCurrentUser(response.user);
setUser(response.user);
setIsEditing(false);

  if (response.user.role === "lecturer") {
  router.push("/lecturer");
} else if (response.user.role === "tutor" || response.user.role === "candidate") {
  router.push("/tutor");
} else {
  router.push("/"); // fallback
}
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>User Profile - Teaching Team</title>
      </Head>
      <Navigation showBackButton={true} />
      <div className="pt-24"> {/* Pushes content below fixed navbar */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">User Profile</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            {/* First Name */}
  <label className="block text-sm font-medium text-gray-700">
    First Name
    <input
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      disabled={!isEditing}
      required={isEditing}
      placeholder="First Name"
      className={`w-full mt-1 border px-4 py-2 rounded text-gray-800 ${
        !isEditing ? "bg-gray-100 cursor-not-allowed" : "focus:ring-2 focus:ring-indigo-500"
      }`}
    />
  </label>
            {/* Last Name */}
  <label className="block text-sm font-medium text-gray-700">
    Last Name
    <input
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      disabled={!isEditing}
      required={isEditing}
      placeholder="Last Name"
      className={`w-full mt-1 border px-4 py-2 rounded text-gray-800 ${
        !isEditing ? "bg-gray-100 cursor-not-allowed" : "focus:ring-2 focus:ring-indigo-500"
      }`}
    />
  </label>
           <label className="block text-sm font-medium text-gray-700">
  Email
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    disabled={!isEditing}
    required={isEditing}
    placeholder="Email"
    className={`w-full mt-1 border px-4 py-2 rounded text-gray-800 ${
      !isEditing ? "bg-gray-100 cursor-not-allowed" : "focus:ring-2 focus:ring-indigo-500"
    }`}
  />
</label>
           {/* Password */}
  <label className="block text-sm font-medium text-gray-700">
    New Password
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      disabled={!isEditing}
      placeholder="Leave blank to keep current"
      className={`w-full mt-1 border px-4 py-2 rounded text-gray-800 ${
        !isEditing ? "bg-gray-100 cursor-not-allowed" : "focus:ring-2 focus:ring-indigo-500"
      }`}
    />
  </label>
            {/* Role */}
  <label className="block text-sm font-medium text-gray-700">
    Role
    <select
      value={role}
      onChange={(e) => setRole(e.target.value)}
      disabled={!isEditing}
      className={`w-full mt-1 border px-4 py-2 rounded text-gray-800 ${
        !isEditing ? "bg-gray-100 cursor-not-allowed" : "focus:ring-2 focus:ring-indigo-500"
      }`}
    >
      <option value="tutor">Tutor</option>
      <option value="lecturer">Lecturer</option>
      <option value="admin">Admin</option>
    </select>
  </label>

            <div>
    <p className="text-sm font-medium text-gray-700 mb-1">Choose Avatar</p>
    <div className="grid grid-cols-4 gap-3 mb-4">
      {avatars.map((av) => (
        <img
          key={av.avatarId}
          src={av.avatarUrl}
          onClick={() => isEditing && setSelectedAvatar(av)}
          className={`cursor-pointer border-2 rounded-full w-20 h-20 object-cover transition-transform duration-150 ease-in-out ${
            selectedAvatar?.avatarId === av.avatarId
              ? "border-indigo-500 scale-105 shadow-md"
              : "border-gray-300 opacity-60"
          } ${!isEditing ? "cursor-not-allowed opacity-50" : ""}`}
          alt="Avatar"
        />
      ))}
    </div>
  </div>
   {isEditing && (
    <div className="w-full text-center pt-4">
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 font-semibold rounded text-white ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-700 hover:bg-indigo-600"
        }`}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  )}
</form>

{/* Edit button shown only when not editing */}
{!isEditing && (
  <div className="w-full text-center pt-4">
    <button
      type="button"
      onClick={() => setIsEditing(true)}
      className="text-indigo-700 font-semibold hover:underline"
    >
      Edit Profile
    </button>
  </div>
)}
        </div>
      </div>
    </div>
    </>
  );
};

export default EditProfilePage;
