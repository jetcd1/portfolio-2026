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
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const unlocked = localStorage.getItem("chan_portfolio_unlocked");
    if (unlocked === "true") {
      setIsUnlocked(true);
    }
  }, []);

  const handleLock = () => {
    localStorage.removeItem("chan_portfolio_unlocked");
    setIsUnlocked(false);
    window.location.reload();
  };

  // If not mounted yet, show a black screen to prevent flashing content
  if (!hasMounted) {
    return <div className="fixed inset-0 bg-black z-[10000]" />;
  }

  // If not unlocked, show the PasswordGate
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
