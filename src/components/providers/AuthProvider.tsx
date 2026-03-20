"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import PasswordGate from "@/components/layout/PasswordGate";

interface AuthContextType {
  isUnlocked: boolean;
  lock: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  // DEBUG: Always show PasswordGate to verify it's reachable on live
  return <PasswordGate onUnlock={() => setIsUnlocked(true)} />;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
