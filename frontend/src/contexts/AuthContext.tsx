// src/auth/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { saveTokens, clearTokens, getAccessToken } from "../services/token";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  accessToken: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(
    getAccessToken()
  );
  const navigate = useNavigate();

  useEffect(() => {
    // if token exists, consider logged in (you might validate it)
    setAccessTokenState(getAccessToken());
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    const { access_token, refresh_token } = res.data;
    if (!access_token) throw new Error("No access token from login");
    saveTokens(access_token, refresh_token);
    setAccessTokenState(access_token);
    navigate("/dashboard");
  };

  const logout = () => {
    clearTokens();
    setAccessTokenState(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!accessToken,
        login,
        logout,
        accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
