import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { userApi } from "@/services/api";
import { RegisterRequest } from "@/types/User";
import { Avatar } from "@/types/Avatar";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";


export default function SignUpPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("candidate");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
const [avatars, setAvatars] = useState<Avatar[] | null>(null);
const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
//   const avatars = [
//   "https://mighty.tools/mockmind-api/content/cartoon/11.jpg",
//   "https://mighty.tools/mockmind-api/content/cartoon/32.jpg",
//   "https://mighty.tools/mockmind-api/content/cartoon/5.jpg",
//   "https://mighty.tools/mockmind-api/content/cartoon/7.jpg",
// ];
useEffect(() => {
  const fetchData = async () => {
  try{
  const response = await userApi.getAvatar();
  const avatars = response.avatars;
  if(avatars){
  console.log('Avatars', avatars);
  setAvatars(avatars);
  }
  else{
    toast.error(response.message);
  }
  }
  catch(error: any){
    toast.error(error || "Server error");
  }
  }
  fetchData();
}, [])

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setFormErrors({});
  const newErrors: Record<string, string> = {};

  // Client-side validations
  if (!firstName.trim()) newErrors.firstName = "First name is required.";
  if (!lastName.trim()) newErrors.lastName = "Last name is required.";
  if (!email.trim()) {
    newErrors.email = "Email is required.";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    newErrors.email = "Invalid email format.";
  }

  if (!password) {
    newErrors.password = "Password is required.";
  } else if (password.length < 6 || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
    newErrors.password = "Password must be 6+ chars, include number & symbol.";
  }

  if (!confirmPassword) {
    newErrors.confirmPassword = "Please confirm your password.";
  } else if (password !== confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match.";
  }
  
  if (!selectedAvatar) {
  newErrors.avatar = "Please choose an avatar.";
}


  if (Object.keys(newErrors).length > 0) {
    setFormErrors(newErrors);
    return;
  }

  setLoading(true);

  try {
    const user: RegisterRequest = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role: role,
      avatar_id: selectedAvatar ? selectedAvatar.avatarId : null,
    }
    const response = await userApi.createUser(user);
    console.log('Response of creating user:', response.user);
    if (response.user) {
      toast.success("Registration successful!");
      setTimeout(() => router.push("/signIn"), 1500);
    } else {
      setError(response.message || "Registration failed.");
    }
  } catch (err: any) {
    if (err.response?.message) {
      setError(err.response.message);
    } else {
      setError("Something went wrong. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <Head>
        <title>Sign Up - Teaching Team</title>
      </Head>
      <Navigation showHome={true} />
      <div className="pt-28 bg-gray-100 " > {/* Pushes content below fixed navbar */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-poppins px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h1>

          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">First Name {formErrors.firstName && (
    <span className="text-red-500 text-xs ml-2">({formErrors.firstName})</span>
  )} </label>
            <input
              type="text"
              placeholder="First Name"
              className="form-input w-full border px-4 py-2 rounded text-gray-800"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="block text-sm font-medium text-gray-700">Last Name {formErrors.lastName && (
    <span className="text-red-500 text-xs ml-2">({formErrors.lastName})</span>
  )} </label>
            <input
              type="text"
              placeholder="Last Name"
              className="form-input w-full border px-4 py-2 rounded text-gray-800"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label className="block text-sm font-medium text-gray-700">Email {formErrors.email && (
    <span className="text-red-500 text-xs ml-2">({formErrors.email})</span>
  )} </label>
            <input
              type="email"
              placeholder="Email Address"
              className="form-input w-full border px-4 py-2 rounded text-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <label className="block text-sm font-medium text-gray-700">Select Role</label>
            <select
              className="form-input w-full border px-4 py-2 rounded text-gray-800"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="candidate">Tutor Candidate</option>
              <option value="lecturer">Lecturer</option>
            </select>
            <label className="block text-sm font-medium text-gray-700">Password {formErrors.password && (
    <span className="text-red-500 text-xs ml-2">({formErrors.password})</span>
  )} </label>
            <input
              type="password"
              placeholder="Password"
              className="form-input w-full border px-4 py-2 rounded text-gray-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="block text-sm font-medium text-gray-700">Confirm Password {formErrors.confirmPassword && (
    <span className="text-red-500 text-xs ml-2">({formErrors.confirmPassword})</span>
  )} </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-input w-full border px-4 py-2 rounded text-gray-800"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Choose an Avatar{" "}
    {formErrors.avatar && (
      <span className="text-red-500 text-xs ml-2">({formErrors.avatar})</span>
    )}
  </label>

  <div className="grid grid-cols-4 gap-2">
    {avatars?.map((av) => (
      <img
        key={av.avatarId}
        src={av.avatarUrl}
        onClick={() => setSelectedAvatar(av)}
        className={`cursor-pointer border-2 rounded-full w-20 h-20 object-cover ${
          selectedAvatar?.avatarId === av.avatarId
            ? "border-4 border-indigo-500 scale-105"
            : "border-gray-300"
        }`}
        alt="Avatar option"
      />
    ))}
  </div>
</div>


            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 font-semibold rounded-lg shadow-md text-white transition-all duration-200 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-600"
              }`}

            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/signIn" className="text-blue-600 hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
    <div className="pt-14 bg-gray-100 " >
    </div>
       {/* Footer */}
  <Footer />
  <ToastContainer />
    </>
  );
}
