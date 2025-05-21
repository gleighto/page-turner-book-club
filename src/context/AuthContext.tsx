
import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types";
import { mockUsers } from "../data/mockData";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextProps {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const { toast } = useToast();

  const isAuthenticated = !!currentUser;

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, we would validate against a backend
    // For now, we'll just check if the email exists in our mock data
    const user = mockUsers.find((u) => u.email === email);
    
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}!`,
      });
      return true;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Check if email already exists
    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) {
      toast({
        title: "Signup failed",
        description: "Email already in use",
        variant: "destructive",
      });
      return false;
    }

    // Create new user
    const newUser: User = {
      id: `u${mockUsers.length + 1}`,
      name,
      email,
    };
    
    // In a real app, we would send this to a backend
    // For now, we'll just add it to our mock data (note: this won't persist on refresh)
    mockUsers.push(newUser);
    
    setCurrentUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    
    toast({
      title: "Signup successful",
      description: `Welcome, ${name}!`,
    });
    
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
