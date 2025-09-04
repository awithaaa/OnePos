// src/auth/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { saveTokens, clearTokens, getAccessToken } from "../services/token";
import { useNavigate } from "react-router-dom";
import { api, apiWithOutRT } from "../services/api";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

type AuthContextType = {
  user: User | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // if token exists, consider logged in (you might validate it)
    setAccessTokenState(getAccessToken());
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch (e) {
      console.log(e);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await apiWithOutRT.post("/auth/login", { email, password });
      const { access_token, refresh_token } = res.data;
      if (!access_token) throw new Error("No access token from login");
      saveTokens(access_token, refresh_token);
      setAccessTokenState(access_token);
      await fetchUser();
      navigate("/dashboard");
    } catch (error: any) {
      if (error.status === 401) {
        throw new Error("Invalid email or password");
      } else {
        throw new Error("Login failed, please try again");
      }
    }
  };

  const logout = async () => {
    const res = await api.post("/auth/logout");
    clearTokens();
    setAccessTokenState(null);
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
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
