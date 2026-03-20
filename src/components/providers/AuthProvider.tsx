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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unlocked = localStorage.getItem("chan_portfolio_unlocked");
    if (unlocked === "true") {
      setIsUnlocked(true);
    }
    setIsLoading(false);
  }, []);

  const handleLock = () => {
    localStorage.removeItem("chan_portfolio_unlocked");
    setIsUnlocked(false);
    window.location.reload(); // Force reload to show the gate
  };

  if (isLoading) {
    return <div className="fixed inset-0 bg-black z-[10000]" />;
  }

  if (!isUnlocked) {
    return <PasswordGate onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <AuthContext.Provider value={{ isUnlocked, lock: handleLock }}>
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
