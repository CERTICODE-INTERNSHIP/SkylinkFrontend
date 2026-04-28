import React, { useEffect, useState } from "react";
import { AuthContext, type AuthContextType, type User } from "./authContext";
import { isTokenExpired } from "@/utils/token";

export type { User, AuthContextType } from "./authContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() => {
    try {
      const stored = localStorage.getItem("token");
      if (!stored || isTokenExpired(stored)) {
        localStorage.removeItem("token");
        return null;
      }
      return stored;
    } catch {
      return null;
    }
  });

  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    try {
      if (token) localStorage.setItem("token", token);
      else localStorage.removeItem("token");
    } catch {
      // ignore localStorage errors
    }
  }, [token]);

  const login = (newToken: string, newUser: User | null = null) => {
    setToken(newToken);
    setUserState(newUser);
  };

  const logout = () => {
    setToken(null);
    setUserState(null);
    try {
      localStorage.removeItem("token");
    } catch {
      // ignore
    }
  };

  const setUser = (u: User | null) => {
    setUserState(u);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: Boolean(token),
    login,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;