// Authentication context for managing user login state in Teaching Team app.
// Provides login, logout, and user state using React Context with localStorage support.

import React, { createContext, useContext, useState } from "react";
import { User } from "../types/User";
interface AuthContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  signout: () => void;
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Clears the current user session
  const signout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to access authentication context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
