"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface IntroContextType {
  isIntroDone: boolean;
  setIsIntroDone: (done: boolean) => void;
}

const IntroContext = createContext<IntroContextType | undefined>(undefined);

export function IntroProvider({ children }: { children: ReactNode }) {
  // Try to re-use session storage so it doesn't show up again on subsequent page loads
  const [isIntroDone, setIsIntroDone] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSetIsIntroDone = (done: boolean) => {
    setIsIntroDone(done);
  };

  return (
    <IntroContext.Provider value={{ isIntroDone, setIsIntroDone: handleSetIsIntroDone }}>
      {/* Hide content visually if not mounted yet to prevent jank */}
      <div className={mounted ? "opacity-100" : "opacity-0"}>
        {children}
      </div>
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const context = useContext(IntroContext);
  if (context === undefined) {
    throw new Error("useIntro must be used within an IntroProvider");
  }
  return context;
}
