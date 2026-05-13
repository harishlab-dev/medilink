"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Load auth from localStorage only on client side
    const stored = localStorage.getItem("medilink_user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem("medilink_user");
      }
    }
    setMounted(true);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would call /auth/login on the backend
    // For now, accept any non-empty credentials
    if (!email || !password) return false;
    const userData = { name: email.split("@")[0], email };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("medilink_user", JSON.stringify(userData));
    return true;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    if (!name || !email || !password) return false;
    const userData = { name, email };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("medilink_user", JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("medilink_user");
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
