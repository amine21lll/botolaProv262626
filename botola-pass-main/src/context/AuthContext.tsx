import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "USER" | "ADMIN";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: "USER" | "ADMIN") => Promise<void>;
  register: (data: Omit<User, "id" | "role"> & { password: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("botola_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string, role: "USER" | "ADMIN") => {
    setIsLoading(true);
    // Simulation: In a real app, this would be an API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email.includes("error")) {
          reject(new Error("Identifiants incorrects"));
          setIsLoading(false);
          return;
        }

        const mockUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          name: email.split("@")[0],
          email,
          role,
        };

        setUser(mockUser);
        localStorage.setItem("botola_user", JSON.stringify(mockUser));
        setIsLoading(false);
        resolve();
      }, 1000);
    });
  };

  const register = async (data: Omit<User, "id" | "role"> & { password: string }) => {
    setIsLoading(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: "USER",
        };

        setUser(newUser);
        localStorage.setItem("botola_user", JSON.stringify(newUser));
        setIsLoading(false);
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("botola_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
