// Sign-in page for the Teaching Team app with email/password login and CAPTCHA verification.
// Redirects users based on role upon successful authentication.
//Used loading state for better user response 

import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import 'react-toastify/dist/ReactToastify.css';
import BackButton from "@/components/BackButton";
import { userApi, LoginRequest } from "@/services/api";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
 
export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuth();
  const router = useRouter();
 
  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
 
    // Ensure CAPTCHA is completed
    if (!captchaValue) {
      setError("Please complete the CAPTCHA verification.");
      return;
    }
    setLoading(true);
    setTimeout(async () => {
    const loginDetails:LoginRequest = {email: email, password: password};
    const response = await userApi.getUser(loginDetails);
    console.log("user: ", response);
    const foundUser = response.user;
    setLoading(false);
    if(foundUser?.isBlocked){
      toast.success("Hi," + foundUser.firstName + " " + foundUser.lastName + " . You access is restricted contact admin for getting access.");
      return;
    }
    if (foundUser) {
      // Successful login logic
      toast.success("Welcome," + foundUser.firstName + " " + foundUser.lastName);
      localStorage.setItem("CurrentUser", JSON.stringify(foundUser));
      setCurrentUser(foundUser);
      // Redirect based on user role.
      setTimeout(() => {
        if (foundUser.role === "lecturer") {
          router.push("/lecturer");
        } else if (foundUser.role === "candidate") {
          router.push("/tutor");
        } else {
          router.push("/");
        }
      }, 1000);
    } else {
      setError(response.message);
    }
  }, 800);
  };
 
  return (
    <>
      <Head>
        <title>Login - Teaching Team</title>
        <meta name="description" content="Login to the Teaching Team" />
      </Head>
      <Navigation showHome={true} />
      <div className="pt-24"> {/* Pushes content below fixed navbar */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-poppins px-4">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-15">Teaching Team</h1>
        {error && (
          <div className="bg-white border border-red-400 text-red-700 px-10 py-3 rounded-none mb-8">
            {error}
          </div>
        )}
        <div className="bg-white px-12 py-12 rounded-none shadow-lg w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">Sign In</h1>
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="relative w-full mb-4">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className="peer w-full border shadow-md border-gray-500 rounded-none pr-3 pl-3 pb-1 pt-4 placeholder-transparent text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800"
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-[0.1px] text-gray-500 text-xs transition-all
                  peer-placeholder-shown:top-3
                  peer-placeholder-shown:text-base
                  peer-placeholder-shown:text-gray-700
                  peer-focus:top-[0.1px]
                  peer-focus:text-xs
                  peer-focus:text-gray-500"
              >
                Email Address
              </label>
            </div>
 
            {/* Password Input */}
            <div className="relative w-full mb-6">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="peer w-full border shadow-md border-gray-500 rounded-none pl-3 pb-1 pt-4 pr-16 placeholder-transparent text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800"
              />
              <label
                htmlFor="password"
                className="absolute left-3 top-[0.1px] text-gray-500 text-xs transition-all
                  peer-placeholder-shown:top-3
                  peer-placeholder-shown:text-base
                  peer-placeholder-shown:text-gray-700
                  peer-focus:top-[0.1px]
                  peer-focus:text-xs
                  peer-focus:text-gray-500"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm px-1 text-white bg-gray-500 hover:bg-gray-800 transition"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
 
            {/* CAPTCHA */}
            <div className="mb-4">
              <ReCAPTCHA
                sitekey="6LeUnRYrAAAAAKlS1w5zmifC44piJp2V4lKafD36"
                onChange={handleCaptchaChange}
              />
            </div>
 
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full font-semibold py-2 rounded-md transition ${
              loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-700"}`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
 
          {/* Create Account Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-3">Don’t have an account?</p>
            <Link
              href="/signUp"
              className="inline-block border border-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-100 transition font-semibold"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
    <Footer />
      <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
}